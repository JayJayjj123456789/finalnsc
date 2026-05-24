"""Pytest configuration and shared fixtures"""

import pytest
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


@pytest.fixture(scope="session")
def anyio_backend():
    return "asyncio"


@pytest.fixture
def sample_intent():
    """Sample parsed intent for testing"""
    return {
        "duration": 3,
        "budget": 5000,
        "travelers": 2,
        "interests": ["nature", "culture"],
        "dietary": [],
        "destination": "นครราชสีมา",
        "origin": "กรุงเทพ",
        "travel_mode": "car",
        "raw_text": "ไปเที่ยวเขาใหญ่ 3 วัน งบ 5000 2 คน",
        "confidence": 0.85
    }


@pytest.fixture
def sample_route():
    """Sample route option for testing"""
    return {
        "id": "test-route-1",
        "name": "เส้นทางธรรมชาติ",
        "description": "สัมผัสธรรมชาติที่เขาใหญ่",
        "days": [],
        "total_cost": 0,
        "total_time_hours": 0,
        "total_co2_kg": 0,
        "community_percentage": 60,
        "cost_score": 0,
        "time_score": 0,
        "eco_score": 0,
        "community_score": 0,
        "total_score": 0
    }
