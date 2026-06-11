import logging
from langgraph.graph import StateGraph, END
from app.graph.state import TravelState
from app.core.config import settings

logger = logging.getLogger(__name__)


def _make_checkpointer():
    """MemorySaver for checkpointing. Upstash Redis used for caching instead."""
    from langgraph.checkpoint.memory import MemorySaver
    return MemorySaver()


def build_graph(intent_agent, route_optimizer, eco_agent, critic_agent):

    async def intent_node(state: TravelState) -> dict:
        try:
            intent = await intent_agent.analyze(state["input"])
            return {"intent": intent, "errors": state.get("errors", [])}
        except Exception as e:
            logger.error(f"IntentNode error: {e}")
            return {"errors": state.get("errors", []) + [str(e)]}

    async def route_node(state: TravelState) -> dict:
        try:
            routes = await route_optimizer.generate_routes(
                intent=state["intent"],
                preferences=state.get("preferences")
            )
            return {"routes": routes}
        except Exception as e:
            logger.error(f"RouteNode error: {e}")
            return {"errors": state.get("errors", []) + [str(e)], "routes": []}

    async def eco_node(state: TravelState) -> dict:
        try:
            routes = state["routes"]
            for route in routes:
                eco = await eco_agent.assess_route(route, state["intent"])
                route.co2_kg = eco["co2_kg"]
                route.carbon_saved_pct = eco["carbon_saved_pct"]
                route.community_percentage = eco["community_percentage"]
            return {"routes": routes}
        except Exception as e:
            logger.error(f"EcoNode error: {e}")
            return {"errors": state.get("errors", []) + [str(e)]}

    def critic_node(state: TravelState) -> dict:
        final = critic_agent.assess(state["routes"], state["intent"])
        return {"final_routes": final}

    graph = StateGraph(TravelState)
    graph.add_node("intent_agent", intent_node)
    graph.add_node("route_agent", route_node)
    graph.add_node("eco_agent", eco_node)
    graph.add_node("critic_agent", critic_node)

    graph.set_entry_point("intent_agent")
    graph.add_edge("intent_agent", "route_agent")
    graph.add_edge("route_agent", "eco_agent")
    graph.add_edge("eco_agent", "critic_agent")
    graph.add_edge("critic_agent", END)

    checkpointer = _make_checkpointer()
    return graph.compile(checkpointer=checkpointer)
