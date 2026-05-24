"""API Integration Tests for Smart Travel Planner"""

import pytest
from httpx import AsyncClient, ASGITransport
import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app


@pytest.fixture
def anyio_backend():
    return "asyncio"


class TestHealthEndpoint:
    """Test /api/health endpoint"""
    
    @pytest.mark.anyio
    async def test_health_check(self):
        """Test that health endpoint returns 200"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.get("/api/health")
            assert response.status_code == 200
            data = response.json()
            assert data["status"] == "healthy"
            assert "agents" in data


class TestPlanEndpoint:
    """Test /api/plan endpoint"""
    
    @pytest.mark.anyio
    async def test_plan_with_fallback_data(self):
        """Test plan generation with fallback data (no Neo4j needed)"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            payload = {
                "query": "อยากไปเที่ยวเขาใหญ่ 3 วัน งบ 5000 บาท 2 คน",
                "preferences": {
                    "max_cost_per_day": 2000,
                    "preferred_travel_mode": "car"
                }
            }
            response = await client.post("/api/plan", json=payload)
            
            # Should return 200 with plan data
            assert response.status_code == 200
            data = response.json()
            
            assert "intent" in data
            assert "routes" in data
            assert "travel_plan" in data
            
            # Verify intent parsing
            intent = data["intent"]
            assert intent["duration"] == 3
            assert intent["budget"] == 5000
            assert intent["travelers"] == 2
            
            # Verify routes exist
            assert len(data["routes"]) > 0
    
    @pytest.mark.anyio
    async def test_plan_various_queries(self):
        """Test various Thai query formats"""
        test_cases = [
            {
                "query": "ไปกินอาหารที่โคราช 2 วัน",
                "expected_duration": 2,
                "expected_interests": ["food"]
            },
            {
                "query": "ไปวัดที่นครราชสีมา 1 วัน",
                "expected_duration": 1,
                "expected_interests": ["culture"]
            },
            {
                "query": "พักผ่อนธรรมชาติ 5 วัน งบ 10000",
                "expected_duration": 5,
                "expected_budget": 10000
            }
        ]
        
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            for case in test_cases:
                response = await client.post("/api/plan", json={"query": case["query"]})
                assert response.status_code == 200, f"Failed for query: {case['query']}"
                
                data = response.json()
                intent = data["intent"]
                
                assert intent["duration"] == case.get("expected_duration", 3), \
                    f"Duration mismatch for: {case['query']}"


class TestAgents:
    """Test individual agents"""
    
    @pytest.mark.anyio
    async def test_intent_agent(self):
        """Test Intent Agent parsing"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.post("/api/agents/intent", json={
                "query": "ไปเที่ยวธรรมชาติ 4 วัน 3 คน งบ 8000"
            })
            
            assert response.status_code == 200
            data = response.json()
            
            assert data["duration"] == 4
            assert data["travelers"] == 3
            assert data["budget"] == 8000
            assert "nature" in data["interests"]


class TestEcoAssessment:
    """Test Eco Assessment"""
    
    @pytest.mark.anyio
    async def test_eco_assessment_in_plan(self):
        """Test that eco assessment is included in plan"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.post("/api/plan", json={
                "query": "ไปเขาใหญ่ 2 วัน"
            })
            
            assert response.status_code == 200
            data = response.json()
            
            # Check eco assessment exists
            assert "eco_assessment" in data
            
            eco = data["eco_assessment"]
            assert "carbon_breakdown" in eco
            assert "recommendations" in eco
            
            # Check carbon breakdown structure
            breakdown = eco["carbon_breakdown"]
            assert "total_co2_kg" in breakdown
            assert breakdown["total_co2_kg"] >= 0


class TestFallbackData:
    """Test fallback data service"""
    
    def test_fallback_attractions_exist(self):
        """Test that fallback data has attractions"""
        from app.services.fallback_data import FallbackDataService
        
        fallback = FallbackDataService()
        attractions = fallback.get_all_attractions()
        
        assert len(attractions) > 0
        assert any(a["category"] == "nature" for a in attractions)
        assert any(a["category"] == "culture" for a in attractions)
    
    def test_fallback_accommodations_exist(self):
        """Test that fallback data has accommodations"""
        from app.services.fallback_data import FallbackDataService
        
        fallback = FallbackDataService()
        accommodations = fallback.get_all_accommodations()
        
        assert len(accommodations) > 0
        assert any(a["type"] == "homestay" for a in accommodations)
    
    def test_fallback_restaurants_exist(self):
        """Test that fallback data has restaurants"""
        from app.services.fallback_data import FallbackDataService
        
        fallback = FallbackDataService()
        restaurants = fallback.get_all_restaurants()
        
        assert len(restaurants) > 0
        assert any(r["cuisine"] == "thai" for r in restaurants)


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
