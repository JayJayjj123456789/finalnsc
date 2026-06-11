from typing import TypedDict, List, Optional, Any
from app.models import ParsedIntent, RouteResult


class TravelState(TypedDict):
    input: str
    preferences: Optional[Any]
    intent: Optional[ParsedIntent]
    routes: List[RouteResult]
    final_routes: List[RouteResult]
    errors: List[str]
