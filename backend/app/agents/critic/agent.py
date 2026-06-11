import logging
from typing import List
from app.models import RouteResult, ParsedIntent

logger = logging.getLogger(__name__)


class CriticAgent:
    """A4: Validates and quality-checks route results."""

    def assess(self, routes: List[RouteResult], intent: ParsedIntent) -> List[RouteResult]:
        validated = []
        for route in routes:
            issues = []

            if route.total_cost > intent.budget * 1.2:
                issues.append(f"Cost {route.total_cost} exceeds budget {intent.budget}")

            if len(route.days_detail) != intent.duration:
                issues.append(f"Days mismatch: got {len(route.days_detail)}, expected {intent.duration}")

            if route.score < 0 or route.score > 100:
                route.score = max(0, min(100, route.score))

            if issues:
                logger.warning(f"Route '{route.name}' issues: {issues}")

            validated.append(route)

        validated.sort(key=lambda r: r.score, reverse=True)
        return validated
