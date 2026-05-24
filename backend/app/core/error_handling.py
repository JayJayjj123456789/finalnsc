"""Error handling, logging, and retry logic for Smart Travel Planner"""

import logging
import time
from functools import wraps
from typing import TypeVar, Callable, Any
from fastapi import HTTPException, status
import httpx

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S"
)
logger = logging.getLogger("smart-travel-planner")

T = TypeVar("T")


def retry_on_failure(max_attempts: int = 3, delay: float = 1.0, backoff: float = 2.0):
    """
    Decorator to retry a function on failure with exponential backoff.
    
    Usage:
        @retry_on_failure(max_attempts=3, delay=1.0)
        async def my_function():
            ...
    """
    def decorator(func: Callable[..., Any]) -> Callable[..., Any]:
        @wraps(func)
        async def async_wrapper(*args, **kwargs):
            last_exception = None
            current_delay = delay
            
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        logger.warning(
                            f"[Retry {attempt + 1}/{max_attempts}] {func.__name__} failed: {str(e)}"
                        )
                        time.sleep(current_delay)
                        current_delay *= backoff
                    else:
                        logger.error(f"[Final] {func.__name__} failed after {max_attempts} attempts")
            
            raise last_exception
        
        @wraps(func)
        def sync_wrapper(*args, **kwargs):
            last_exception = None
            current_delay = delay
            
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    last_exception = e
                    if attempt < max_attempts - 1:
                        logger.warning(
                            f"[Retry {attempt + 1}/{max_attempts}] {func.__name__} failed: {str(e)}"
                        )
                        time.sleep(current_delay)
                        current_delay *= backoff
                    else:
                        logger.error(f"[Final] {func.__name__} failed after {max_attempts} attempts")
            
            raise last_exception
        
        import asyncio
        if asyncio.iscoroutinefunction(func):
            return async_wrapper
        return sync_wrapper
    
    return decorator


async def safe_http_get(url: str, timeout: float = 10.0, max_retries: int = 3) -> dict | None:
    """
    Safely make an HTTP GET request with retry logic.
    Returns None if all retries fail.
    """
    for attempt in range(max_retries):
        try:
            async with httpx.AsyncClient(timeout=timeout) as client:
                response = await client.get(url)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPStatusError as e:
            logger.warning(f"[Attempt {attempt + 1}] HTTP {e.response.status_code} for {url}")
        except httpx.RequestError as e:
            logger.warning(f"[Attempt {attempt + 1}] Request error for {url}: {str(e)}")
        except Exception as e:
            logger.warning(f"[Attempt {attempt + 1}] Unexpected error for {url}: {str(e)}")
        
        if attempt < max_retries - 1:
            await asyncio.sleep(2 ** attempt)  # Exponential backoff
        
    logger.error(f"All {max_retries} attempts failed for {url}")
    return None


async def safe_http_post(url: str, data: dict, timeout: float = 10.0, max_retries: int = 3) -> dict | None:
    """
    Safely make an HTTP POST request with retry logic.
    Returns None if all retries fail.
    """
    for attempt in range(max_retries):
        try:
            async with httpx.AsyncClient(timeout=timeout) as client:
                response = await client.post(url, json=data)
                response.raise_for_status()
                return response.json()
        except httpx.HTTPStatusError as e:
            logger.warning(f"[Attempt {attempt + 1}] HTTP {e.response.status_code} for {url}")
        except httpx.RequestError as e:
            logger.warning(f"[Attempt {attempt + 1}] Request error for {url}: {str(e)}")
        except Exception as e:
            logger.warning(f"[Attempt {attempt + 1}] Unexpected error for {url}: {str(e)}")
        
        if attempt < max_retries - 1:
            await asyncio.sleep(2 ** attempt)
    
    logger.error(f"All {max_retries} attempts failed for {url}")
    return None


class TravelPlannerError(Exception):
    """Base exception for Travel Planner errors"""
    def __init__(self, message: str, error_code: str = "UNKNOWN"):
        self.message = message
        self.error_code = error_code
        super().__init__(self.message)


class IntentParsingError(TravelPlannerError):
    """Error when parsing user intent fails"""
    def __init__(self, message: str = "Failed to parse travel intent"):
        super().__init__(message, "INTENT_PARSE_ERROR")


class RouteOptimizationError(TravelPlannerError):
    """Error when optimizing routes fails"""
    def __init__(self, message: str = "Failed to optimize route"):
        super().__init__(message, "ROUTE_OPTIMIZE_ERROR")


class EcoAssessmentError(TravelPlannerError):
    """Error when calculating eco metrics fails"""
    def __init__(self, message: str = "Failed to assess eco impact"):
        super().__init__(message, "ECO_ASSESS_ERROR")


class ExternalServiceError(TravelPlannerError):
    """Error when external service (Tavily, OSRM, OpenRouter) fails"""
    def __init__(self, service: str, message: str = ""):
        msg = f"External service error ({service}): {message}" if message else f"External service error ({service})"
        super().__init__(msg, f"{service.upper()}_ERROR")


def handle_agent_error(error: Exception, agent_name: str) -> dict:
    """
    Handle agent errors and return a graceful fallback response.
    """
    logger.error(f"[{agent_name}] Error: {str(error)}")
    
    return {
        "error": agent_name,
        "message": str(error),
        "fallback": True
    }


def validate_travel_input(query: str) -> bool:
    """
    Validate travel input query.
    Returns True if valid, raises HTTPException if invalid.
    """
    if not query or not query.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query cannot be empty"
        )
    
    if len(query) > 1000:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Query is too long (max 1000 characters)"
        )
    
    return True


# Import asyncio for safe_http functions
import asyncio
