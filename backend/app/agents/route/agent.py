import logging
from typing import List, Optional, Dict, Any
from app.models import ParsedIntent, RouteResult, RouteDay, RouteStop
from app.services.neo4j_service import Neo4jService
from app.services.web_search import WebSearchService
from app.services.osrm_service import OSRMService
from app.services.fallback_data import FallbackDataService

logger = logging.getLogger(__name__)


class RouteOptimizer:
    def __init__(self, neo4j, osrm, web_search):
        self.neo4j = neo4j
        self.osrm = osrm
        self.web_search = web_search
        self.fallback = FallbackDataService()

    async def generate_routes(self, intent: ParsedIntent, preferences=None) -> List[RouteResult]:
        logger.info(f"Generating routes: {intent.duration} days, budget={intent.budget}")
        all_attractions = self.fallback.get_all_attractions()
        all_accommodations = self.fallback.get_all_accommodations()
        all_restaurants = self.fallback.get_all_restaurants()
        routes = []
        r1 = self._build_route(intent, all_attractions, all_accommodations, all_restaurants, "budget")
        if r1: routes.append(r1)
        r2 = self._build_route(intent, all_attractions, all_accommodations, all_restaurants, "eco")
        if r2: routes.append(r2)
        r3 = self._build_route(intent, all_attractions, all_accommodations, all_restaurants, "balanced")
        if r3: routes.append(r3)
        idx = 0
        while len(routes) < 3:
            rg = self._build_route(intent, all_attractions, all_accommodations, all_restaurants, "generic", idx=idx)
            if rg: routes.append(rg)
            else: break
            idx += 1
        for route in routes:
            self._score_route(route, intent)
        routes.sort(key=lambda r: r.score, reverse=True)
        return routes[:3]

    def _build_route(self, intent, attractions, accommodations, restaurants, route_type, idx=0):
        if route_type == "budget":
            selected = [a for a in attractions if a.get("entry_fee", 0) <= 100]
            if len(selected) < 4: selected = sorted(attractions, key=lambda a: a.get("entry_fee", 0))[:8]
            acc = [a for a in accommodations if a.get("type") in ("homestay", "hostel")]
            if not acc: acc = sorted(accommodations, key=lambda a: a.get("price_per_night", 99999))[:2]
            rests = sorted(restaurants, key=lambda r: r.get("average_cost", 999))[:4]
            name = "Budget Route Korat"
            highlights = ["Low cost", "Community", "Authentic", "Eco-friendly"]
            community_pct = 75
            carbon_saved = 40
        elif route_type == "eco":
            selected = [a for a in attractions if a.get("category") == "nature"]
            if len(selected) < 4: selected = attractions[:8]
            acc = [a for a in accommodations if a.get("community_owned", False)]
            if not acc: acc = sorted(accommodations, key=lambda a: a.get("price_per_night", 99999))[:2]
            rests = [r for r in restaurants if r.get("community_owned", False)]
            if len(rests) < 2: rests = restaurants[:4]
            name = "Eco Route Khao Yai"
            highlights = ["Nature", "Mountain view", "Waterfall", "Fresh air"]
            community_pct = 80
            carbon_saved = 50
        elif route_type == "balanced":
            selected = attractions[:10]
            acc = sorted(accommodations, key=lambda a: a.get("price_per_night", 99999))[:3]
            rests = restaurants[:5]
            name = "Balanced Route All-in-One"
            highlights = ["Nature", "Culture", "Food", "Complete"]
            community_pct = 60
            carbon_saved = 30
        else:
            selected = attractions
            acc = accommodations[:2] if accommodations else []
            rests = restaurants[:3] if restaurants else []
            names = ["Recommended", "Special", "Alternative"]
            name = names[idx] if idx < 3 else "Route " + str(idx+1)
            highlights = ["Recommended", "Complete", "Convenient"]
            community_pct = 50
            carbon_saved = 20
        days_detail = self._distribute_to_days(intent, selected, acc, rests)
        total_cost = sum(d.day_cost for d in days_detail)
        return RouteResult(
            name=name, score=0, days=intent.duration, total_cost=total_cost,
            co2_kg=0, community_percentage=community_pct, carbon_saved_pct=carbon_saved,
            days_detail=days_detail, highlights=highlights,
        )

    def _distribute_to_days(self, intent, attractions, accommodations, restaurants):
        days = []
        duration = intent.duration
        attrs_per_day = max(2, min(4, len(attractions) // max(duration, 1)))
        for day_num in range(duration):
            activities = []
            day_cost = 0
            start_idx = day_num * attrs_per_day
            end_idx = min(start_idx + attrs_per_day, len(attractions))
            if start_idx < len(attractions):
                day_attrs = attractions[start_idx:end_idx]
            else:
                day_attrs = attractions[day_num % max(len(attractions), 1):] or attractions[:1]
            for attr in day_attrs:
                loc = attr.get("location", {})
                if not isinstance(loc, dict): loc = {}
                stop = RouteStop(
                    name=attr.get("name_th", attr.get("name", "")),
                    lat=loc.get("lat", 14.97), lng=loc.get("lng", 102.10),
                    type=attr.get("category", "general"),
                    duration_min=attr.get("duration_minutes", 120),
                    cost_baht=attr.get("entry_fee", 0),
                )
                activities.append(stop)
                day_cost += attr.get("entry_fee", 0)
            if restaurants:
                rest = restaurants[day_num % len(restaurants)]
                rloc = rest.get("location", {})
                if not isinstance(rloc, dict): rloc = {}
                rcost = rest.get("average_cost", 100) * intent.travelers
                activities.append(RouteStop(
                    name=rest.get("name_th", rest.get("name", "")),
                    lat=rloc.get("lat", 14.97), lng=rloc.get("lng", 102.10),
                    type="restaurant",
                    duration_min=60, cost_baht=rcost,
                ))
                day_cost += rcost
            if day_num == 0 and accommodations:
                acc = accommodations[0]
                aloc = acc.get("location", {})
                if not isinstance(aloc, dict): aloc = {}
                acc_cost = acc.get("price_per_night", 800) * max(duration - 1, 1)
                activities.append(RouteStop(
                    name=acc.get("name_th", acc.get("name", "")),
                    lat=aloc.get("lat", 14.97), lng=aloc.get("lng", 102.10),
                    type="accommodation",
                    duration_min=0, cost_baht=acc_cost,
                ))
                day_cost += acc_cost
            day_cost += int(50 * 3.5)
            if day_num == duration - 1:
                return_cost = int(250 * 3.5)
                day_cost += return_cost
                activities.append(RouteStop(
                    name="Return to " + intent.origin,
                    lat=13.75, lng=100.50, type="transport",
                    duration_min=180, cost_baht=return_cost,
                ))
            days.append(RouteDay(day=day_num + 1, activities=activities, day_cost=day_cost))
        return days

    def _score_route(self, route: RouteResult, intent: ParsedIntent):
        if intent.budget > 0:
            cost_ratio = route.total_cost / intent.budget
            cost_score = max(0, min(100, (1 - cost_ratio) * 100 + 50))
        else:
            cost_score = 50
        total_act = sum(len(d.activities) for d in route.days_detail)
        expected = intent.duration * 4
        time_score = min(100, (total_act / max(expected, 1)) * 100)
        eco_score = route.carbon_saved_pct * 2
        community_score = route.community_percentage
        route.score = int(cost_score * 0.4 + time_score * 0.3 + eco_score * 0.2 + community_score * 0.1)
        route.score = max(0, min(100, route.score))
