import logging
import math
from app.models import RouteResult, ParsedIntent

logger = logging.getLogger(__name__)

# CO2 per km by transport mode (kg)
CO2_PER_KM = {
    "car": 0.21,
    "taxi": 0.27,
    "bus": 0.089,
    "minibus": 0.12,
    "train": 0.041,
    "motorbike": 0.103,
    "bicycle": 0.0,
    "walk": 0.0,
}

# Accommodation CO2 per night (kg)
ACCOMMODATION_CO2 = {
    "hotel": 20.0,
    "resort": 25.0,
    "homestay": 8.0,
    "hostel": 10.0,
}

# Thailand average trip CO2 baseline (kg) for comparison
THAI_AVG_CO2 = {
    1: 50.0,
    2: 80.0,
    3: 120.0,
    4: 160.0,
    5: 200.0,
}


class EcoAssessmentAgent:
    def __init__(self):
        pass

    async def assess_route(self, route: RouteResult, intent: ParsedIntent) -> dict:
        """
        Calculate carbon footprint for a route.
        Returns dict with co2_kg, carbon_saved_pct, community_percentage
        """
        logger.info(f"Calculating eco metrics for route: {route.name}")

        # Estimate total transport distance
        total_transport_km = 0
        for day in route.days_detail:
            for act in day.activities:
                if act.type == "transport":
                    # Return trip ~250km from Bangkok
                    total_transport_km += 250
                elif act.type == "accommodation" or act.type == "restaurant":
                    continue
                else:
                    # Local travel between attractions ~15km each
                    total_transport_km += 15

        # If no transport detected, estimate based on days
        if total_transport_km == 0:
            total_transport_km = 250 + (intent.duration * 50)  # return + local

        # Transport CO2 (assume car for now)
        transport_co2 = total_transport_km * CO2_PER_KM["car"]

        # Accommodation CO2
        nights = max(intent.duration - 1, 1)
        # Check if route uses community-owned (eco) accommodation
        has_eco_acc = False
        for day in route.days_detail:
            for act in day.activities:
                if act.type == "accommodation":
                    # Budget/eco routes tend to use homestay
                    if "homestay" in act.name.lower() or "community" in act.name.lower():
                        has_eco_acc = True
        acc_type = "homestay" if has_eco_acc else "hotel"
        acc_co2 = ACCOMMODATION_CO2.get(acc_type, 15.0) * nights

        # Activity CO2 (minimal)
        activity_co2 = len(route.days_detail) * 5.0  # ~5kg per day for activities

        total_co2 = round(transport_co2 + acc_co2 + activity_co2, 1)

        # Compare with Thailand average for same duration
        baseline = THAI_AVG_CO2.get(intent.duration, intent.duration * 40.0)
        carbon_saved_pct = max(0, round((1 - total_co2 / baseline) * 100))

        # Community percentage based on route type
        community_pct = route.community_percentage
        if community_pct == 0:
            community_pct = 50  # default

        return {
            "co2_kg": total_co2,
            "carbon_saved_pct": carbon_saved_pct,
            "community_percentage": community_pct,
        }
