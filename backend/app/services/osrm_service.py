"""
OSRM Service - Open Source Routing Machine
Self-hosted routing engine for travel time calculations
"""

import httpx
import logging
from typing import Tuple, List, Dict
from app.core.config import settings

logger = logging.getLogger(__name__)


class OSRMService:
    """Handles routing calculations using OSRM"""
    
    def __init__(self):
        self.base_url = settings.OSRM_URL
    
    async def get_route(
        self, 
        start: Tuple[float, float], 
        end: Tuple[float, float]
    ) -> Dict:
        """
        Get route between two points
        
        Args:
            start: (lat, lng) tuple
            end: (lat, lng) tuple
        
        Returns:
            dict with distance_km, duration_minutes, geometry
        """
        try:
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/route/v1/driving/{start[1]},{start[0]};{end[1]},{end[0]}"
                params = {
                    "overview": "simplified",
                    "geometries": "geojson"
                }
                
                response = await client.get(url, params=params, timeout=10.0)
                response.raise_for_status()
                
                data = response.json()
                
                if data.get("code") != "Ok" or not data.get("routes"):
                    logger.warning(f"OSRM returned no route: {data.get('message', 'Unknown error')}")
                    return self._fallback_route(start, end)
                
                route = data["routes"][0]
                
                return {
                    "distance_km": route["distance"] / 1000,  # Convert m to km
                    "duration_minutes": int(route["duration"] / 60),  # Convert s to min
                    "geometry": route["geometry"]
                }
                
        except httpx.TimeoutException:
            logger.warning("OSRM timeout, using fallback")
            return self._fallback_route(start, end)
        except Exception as e:
            logger.error(f"OSRM error: {e}")
            return self._fallback_route(start, end)
    
    async def get_distance_matrix(
        self, 
        locations: List[Tuple[float, float]]
    ) -> List[List[Dict]]:
        """
        Get distance/time matrix for multiple locations
        
        Returns:
            Matrix where matrix[i][j] = {distance_km, duration_minutes}
        """
        try:
            # OSRM table service for multiple points
            coords = ";".join([f"{lng},{lat}" for lat, lng in locations])
            
            async with httpx.AsyncClient() as client:
                url = f"{self.base_url}/table/v1/driving/{coords}"
                params = {
                    "sources": "all",
                    "destinations": "all"
                }
                
                response = await client.get(url, params=params, timeout=15.0)
                response.raise_for_status()
                
                data = response.json()
                
                if data.get("code") != "Ok":
                    return self._fallback_matrix(len(locations))
                
                durations = data["durations"]
                distances = data["distances"]
                
                matrix = []
                for i in range(len(locations)):
                    row = []
                    for j in range(len(locations)):
                        row.append({
                            "distance_km": distances[i][j] / 1000,
                            "duration_minutes": int(durations[i][j] / 60)
                        })
                    matrix.append(row)
                
                return matrix
                
        except Exception as e:
            logger.error(f"OSRM matrix error: {e}")
            return self._fallback_matrix(len(locations))
    
    def _fallback_route(
        self, 
        start: Tuple[float, float], 
        end: Tuple[float, float]
    ) -> Dict:
        """Fallback when OSRM is unavailable"""
        from math import sqrt, pow
        
        # Haversine distance approximation
        lat_diff = abs(start[0] - end[0])
        lng_diff = abs(start[1] - end[1])
        
        # Rough conversion: 1 degree ≈ 111 km
        direct_km = sqrt(pow(lat_diff * 111, 2) + pow(lng_diff * 111, 2))
        
        # Add 30% for road distance
        road_km = direct_km * 1.3
        
        # Assume 50 km/h average speed
        duration_minutes = int(road_km / 50 * 60)
        
        return {
            "distance_km": round(road_km, 1),
            "duration_minutes": duration_minutes,
            "geometry": None,
            "is_fallback": True
        }
    
    def _fallback_matrix(self, size: int) -> List[List[Dict]]:
        """Fallback matrix when OSRM fails"""
        matrix = []
        for _ in range(size):
            row = []
            for _ in range(size):
                row.append({
                    "distance_km": 10.0,
                    "duration_minutes": 15,
                    "is_fallback": True
                })
            matrix.append(row)
        return matrix