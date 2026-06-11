from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from datetime import datetime
import logging
import uuid
import time

from app.core.config import settings
from app.core.error_handling import (
    TravelPlannerError,
    validate_travel_input,
    logger as app_logger
)
from app.models import (
    PlanRequest,
    PlanResponse,
    HealthResponse,
)

from app.agents.intent.agent import IntentAgent
from app.agents.route.agent import RouteOptimizer
from app.agents.eco.agent import EcoAssessmentAgent
from app.agents.critic.agent import CriticAgent
from app.graph.graph import build_graph
from app.services.cache import get_cached, set_cached

from app.services.neo4j_service import Neo4jService
from app.services.web_search import WebSearchService
from app.services.osrm_service import OSRMService

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

neo4j_service = None
travel_graph = None
langfuse_client = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global neo4j_service, travel_graph, langfuse_client
    logger.info("Starting Smart Travel Planner...")

    # Init Langfuse (Step 3)
    if settings.LANGFUSE_PUBLIC_KEY and settings.LANGFUSE_SECRET_KEY:
        try:
            from langfuse import Langfuse
            langfuse_client = Langfuse(
                public_key=settings.LANGFUSE_PUBLIC_KEY,
                secret_key=settings.LANGFUSE_SECRET_KEY,
                host=settings.LANGFUSE_HOST,
            )
            logger.info("Langfuse observability initialized")
        except Exception as e:
            logger.warning(f"Langfuse init failed: {e}")

    neo4j_service = Neo4jService()
    web_search = WebSearchService()
    osrm_service = OSRMService()
    intent_agent = IntentAgent(web_search=web_search)
    route_optimizer = RouteOptimizer(neo4j=neo4j_service, osrm=osrm_service, web_search=web_search)
    eco_agent = EcoAssessmentAgent()
    critic_agent = CriticAgent()
    travel_graph = build_graph(intent_agent, route_optimizer, eco_agent, critic_agent)
    logger.info("LangGraph initialized with 4 agents (Intent→Route→Eco→Critic)")
    yield
    logger.info("Shutting down...")
    if neo4j_service:
        await neo4j_service.close()
    if langfuse_client:
        langfuse_client.flush()


app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Smart Travel Planner for Thailand",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def add_request_id(request: Request, call_next):
    request_id = str(uuid.uuid4())[:8]
    request.state.request_id = request_id
    start_time = time.time()
    logger.info(f"[{request_id}] {request.method} {request.url.path}")
    try:
        response = await call_next(request)
        duration = time.time() - start_time
        logger.info(f"[{request_id}] Completed in {duration:.2f}s - {response.status_code}")
        response.headers["X-Request-ID"] = request_id
        return response
    except Exception as e:
        duration = time.time() - start_time
        logger.error(f"[{request_id}] Error after {duration:.2f}s: {str(e)}")
        raise


@app.exception_handler(TravelPlannerError)
async def travel_planner_error_handler(request: Request, exc: TravelPlannerError):
    return JSONResponse(
        status_code=500,
        content={
            "error": exc.error_code,
            "message": exc.message,
            "request_id": getattr(request.state, "request_id", "unknown")
        }
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    request_id = getattr(request.state, "request_id", "unknown")
    logger.error(f"[{request_id}] Unexpected error: {str(e)}")
    return JSONResponse(
        status_code=500,
        content={
            "error": "INTERNAL_ERROR",
            "message": "Internal server error",
            "request_id": request_id
        }
    )


@app.get("/", tags=["Root"])
async def root():
    return {"name": settings.APP_NAME, "version": settings.APP_VERSION, "docs": "/docs"}


@app.get("/api/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    return HealthResponse(
        status="healthy",
        version=settings.APP_VERSION,
        agents_online={"graph": travel_graph is not None}
    )


@app.post("/api/plan", response_model=PlanResponse, tags=["Planning"])
async def create_travel_plan(request: Request, plan_request: PlanRequest):
    request_id = getattr(request.state, "request_id", "unknown")
    try:
        validate_travel_input(plan_request.input)
        app_logger.info(f"[{request_id}] Processing via LangGraph: {plan_request.input[:60]}...")

        # Check cache first
        cached = get_cached(plan_request.input)
        if cached:
            return PlanResponse(**cached)

        # Langfuse trace
        trace = None
        if langfuse_client:
            trace = langfuse_client.trace(
                name="travel_plan",
                input={"query": plan_request.input},
                metadata={"request_id": request_id},
            )

        start = time.time()
        result = await travel_graph.ainvoke(
            {
                "input": plan_request.input,
                "preferences": plan_request.preferences,
                "intent": None,
                "routes": [],
                "final_routes": [],
                "errors": [],
            },
            config={"configurable": {"thread_id": request_id}},
        )
        latency = time.time() - start

        if trace:
            trace.update(
                output={"routes": len(result.get("final_routes", []))},
                metadata={"latency_s": round(latency, 2)},
            )

        if not result.get("final_routes"):
            raise HTTPException(status_code=500, detail="No routes generated")

        response = PlanResponse(
            query=plan_request.input,
            routes=result["final_routes"],
            generated_at=datetime.now().isoformat()
        )
        set_cached(plan_request.input, response.model_dump())
        return response

    except HTTPException:
        raise
    except TravelPlannerError as e:
        app_logger.error(f"[{request_id}] Travel Planner error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        app_logger.error(f"[{request_id}] Error generating plan: {str(e)}")
        raise HTTPException(status_code=500, detail="Server error, please try again")


@app.get("/api/attractions", tags=["Data"])
async def get_attractions(category: str = None):
    from app.services.fallback_data import FallbackDataService
    fallback = FallbackDataService()
    attractions = fallback.get_all_attractions()
    if category:
        attractions = [a for a in attractions if a.get("category") == category]
    return {"attractions": attractions, "count": len(attractions)}


@app.get("/api/fallback/prices", tags=["Data"])
async def get_fallback_prices():
    from app.services.fallback_data import FallbackDataService
    fallback = FallbackDataService()
    return fallback.get_all_prices()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
