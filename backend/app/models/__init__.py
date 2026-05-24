from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
from datetime import datetime


# ============================================
# API Request Models
# ============================================
class PlanRequest(BaseModel):
    input: str = Field(..., description="Natural language travel request in Thai")
    preferences: Optional[Dict[str, Any]] = None


# ============================================
# Internal Models (used by agents)
# ============================================
class ParsedIntent(BaseModel):
    """Result from Intent Agent"""
    duration: int = Field(default=3, description="Number of days")
    budget: int = Field(default=5000, description="Budget in THB")
    travelers: int = Field(default=1, description="Number of travelers")
    interests: List[str] = Field(default_factory=list, description="Interest categories")
    origin: str = Field(default="กรุงเทพ", description="Starting location")
    destination: str = Field(default="นครราชสีมา", description="Destination province")
    dietary: List[str] = Field(default_factory=list, description="Dietary restrictions")
    raw_text: str = ""
    confidence: float = 0.85


class Attraction(BaseModel):
    id: str
    name: str
    name_th: str
    category: str
    description: str = ""
    opening_hours: Optional[str] = None
    entry_fee: int = 0
    duration_minutes: int = 120
    location: Dict[str, Any] = Field(default_factory=dict)
    image_url: Optional[str] = None
    community_owned: bool = False


class Accommodation(BaseModel):
    id: str
    name: str
    name_th: str
    type: str = "hotel"
    price_per_night: int = 1000
    rating: float = 4.0
    location: Dict[str, Any] = Field(default_factory=dict)
    amenities: List[str] = Field(default_factory=list)
    community_owned: bool = False


class Restaurant(BaseModel):
    id: str
    name: str
    name_th: str
    cuisine: str = "thai"
    price_range: str = "$$"
    average_cost: int = 100
    location: Dict[str, Any] = Field(default_factory=dict)
    hours: Optional[str] = None
    community_owned: bool = False


# ============================================
# API Response Models (match what frontend expects)
# ============================================
class RouteStop(BaseModel):
    """Single activity/stop within a day"""
    name: str
    lat: float
    lng: float
    type: str
    duration_min: int
    cost_baht: int


class RouteDay(BaseModel):
    """One day of activities"""
    day: int
    activities: List[RouteStop]
    day_cost: int


class RouteResult(BaseModel):
    """A complete route option shown to user"""
    name: str
    score: int  # 0-100
    days: int
    total_cost: int
    co2_kg: float
    community_percentage: int
    carbon_saved_pct: int
    days_detail: List[RouteDay]
    highlights: List[str]


class PlanResponse(BaseModel):
    """Complete response — matches frontend types/index.ts exactly"""
    query: str
    routes: List[RouteResult]
    generated_at: str


# ============================================
# Health & Misc Models
# ============================================
class HealthResponse(BaseModel):
    status: str
    version: str
    agents_online: Dict[str, bool]


class ErrorResponse(BaseModel):
    error: str
    detail: Optional[str] = None