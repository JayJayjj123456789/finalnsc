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
            assert "agents_online" in data


class TestPlanEndpoint:
    """Test /api/plan endpoint"""

    @pytest.mark.anyio
    async def test_plan_with_fallback_data(self):
        """Test plan generation with fallback data (no Neo4j needed)"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            payload = {
                "input": "อยากไปเที่ยวเขาใหญ่ 3 วัน งบ 5000 บาท 2 คน",
                "preferences": {
                    "max_cost_per_day": 2000,
                    "preferred_travel_mode": "car"
                }
            }
            response = await client.post("/api/plan", json=payload)

            # Should return 200 with plan data
            assert response.status_code == 200
            data = response.json()

            # Verify response structure matches PlanResponse model
            assert "query" in data
            assert "routes" in data
            assert "generated_at" in data
            assert data["query"] == payload["input"]

            # Verify routes exist and have expected fields
            assert len(data["routes"]) > 0
            route = data["routes"][0]
            assert "name" in route
            assert "score" in route
            assert "total_cost" in route
            assert "co2_kg" in route
            assert "community_percentage" in route
            assert "carbon_saved_pct" in route
            assert "days_detail" in route
            assert "highlights" in route

    @pytest.mark.anyio
    async def test_plan_various_queries(self):
        """Test various Thai query formats return valid responses"""
        test_cases = [
            {"input": "ไปกินอาหารที่โคราช 2 วัน"},
            {"input": "ไปวัดที่นครราชสีมา 1 วัน"},
            {"input": "พักผ่อนธรรมชาติ 5 วัน งบ 10000"},
        ]

        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            for case in test_cases:
                response = await client.post("/api/plan", json=case)
                assert response.status_code == 200, f"Failed for query: {case['input']}"

                data = response.json()
                assert "query" in data
                assert "routes" in data
                assert len(data["routes"]) > 0

    @pytest.mark.anyio
    async def test_plan_empty_input(self):
        """Test that empty input returns 400"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.post("/api/plan", json={"input": ""})
            assert response.status_code == 400

    @pytest.mark.anyio
    async def test_plan_routes_scored_and_sorted(self):
        """Test that routes are scored and sorted by score descending"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.post("/api/plan", json={
                "input": "ไปเที่ยวเขาใหญ่ 3 วัน งบ 5000"
            })
            assert response.status_code == 200
            data = response.json()

            routes = data["routes"]
            # Routes should be sorted by score descending
            for i in range(len(routes) - 1):
                assert routes[i]["score"] >= routes[i + 1]["score"]


class TestEcoAssessment:
    """Test Eco Assessment — eco data is embedded in each route"""

    @pytest.mark.anyio
    async def test_eco_data_in_route(self):
        """Test that eco assessment fields are present in each route"""
        transport = ASGITransport(app=app)
        async with AsyncClient(transport=transport, base_url="http://test") as client:
            response = await client.post("/api/plan", json={
                "input": "ไปเขาใหญ่ 2 วัน"
            })

            assert response.status_code == 200
            data = response.json()

            for route in data["routes"]:
                # Eco fields are embedded in each route
                assert isinstance(route["co2_kg"], (int, float))
                assert route["co2_kg"] >= 0
                assert isinstance(route["carbon_saved_pct"], int)
                assert isinstance(route["community_percentage"], int)
                assert 0 <= route["community_percentage"] <= 100


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
