"""Neo4j Service - Graph database connection and queries for นครราชสีมา"""

from app.models import Attraction, Accommodation, Restaurant
from typing import List, Optional
import logging
import os

logger = logging.getLogger(__name__)


class Neo4jService:
    """Handles Neo4j graph database operations"""
    
    def __init__(self):
        self.uri = os.getenv("NEO4J_URI", "bolt://localhost:7687")
        self.user = os.getenv("NEO4J_USER", "neo4j")
        self.password = os.getenv("NEO4J_PASSWORD", "password")
        self.driver = None
        self._connected = False
    
    async def connect(self) -> bool:
        """Connect to Neo4j"""
        try:
            from neo4j import AsyncGraphDatabase
            
            self.driver = AsyncGraphDatabase.driver(
                self.uri,
                auth=(self.user, self.password)
            )
            
            # Test connection
            async with self.driver.session() as session:
                await session.run("RETURN 1")
            
            self._connected = True
            logger.info(f"✅ Connected to Neo4j at {self.uri}")
            return True
        except Exception as e:
            logger.warning(f"⚠️ Neo4j connection failed: {e}")
            self._connected = False
            return False
    
    async def close(self):
        """Close Neo4j connection"""
        if self.driver:
            await self.driver.close()
            self._connected = False
    
    def is_connected(self) -> bool:
        """Check if connected to Neo4j"""
        return self._connected
    
    async def get_attractions(
        self,
        categories: Optional[List[str]] = None,
        limit: int = 20
    ) -> List[Attraction]:
        """Get attractions from Neo4j"""
        if not self._connected:
            return []
        
        try:
            async with self.driver.session() as session:
                if categories:
                    query = """
                    MATCH (p:Province {id: 'nakhon-ratchasima'})-[:HAS_ATTRACTION]->(a:Attraction)
                    WHERE a.category IN $categories
                    RETURN a ORDER BY a.rating DESC LIMIT $limit
                    """
                    result = await session.run(query, categories=categories, limit=limit)
                else:
                    query = """
                    MATCH (p:Province {id: 'nakhon-ratchasima'})-[:HAS_ATTRACTION]->(a:Attraction)
                    RETURN a ORDER BY a.rating DESC LIMIT $limit
                    """
                    result = await session.run(query, limit=limit)
                
                records = await result.data()
                
                attractions = []
                for record in records:
                    a = record['a']
                    attractions.append(Attraction(
                        id=a.get('id', ''),
                        name=a.get('name', ''),
                        name_th=a.get('name_th', ''),
                        category=a.get('category', ''),
                        description=a.get('description', ''),
                        opening_hours=a.get('opening_hours', ''),
                        entry_fee=a.get('entry_fee', 0),
                        duration_minutes=a.get('duration_minutes', 120),
                        location=a.get('location', {}),
                        image_url=a.get('image_url', ''),
                        community_owned=a.get('community_owned', False)
                    ))
                
                return attractions
        except Exception as e:
            logger.error(f"Error fetching attractions: {e}")
            return []
    
    async def get_accommodations(
        self,
        budget: Optional[int] = None,
        limit: int = 10
    ) -> List[Accommodation]:
        """Get accommodations from Neo4j"""
        if not self._connected:
            return []
        
        try:
            async with self.driver.session() as session:
                if budget:
                    query = """
                    MATCH (p:Province {id: 'nakhon-ratchasima'})-[:HAS_ACCOMMODATION]->(a:Accommodation)
                    WHERE a.price_per_night <= $budget
                    RETURN a ORDER BY a.rating DESC LIMIT $limit
                    """
                    result = await session.run(query, budget=budget, limit=limit)
                else:
                    query = """
                    MATCH (p:Province {id: 'nakhon-ratchasima'})-[:HAS_ACCOMMODATION]->(a:Accommodation)
                    RETURN a ORDER BY a.rating DESC LIMIT $limit
                    """
                    result = await session.run(query, limit=limit)
                
                records = await result.data()
                
                accommodations = []
                for record in records:
                    a = record['a']
                    accommodations.append(Accommodation(
                        id=a.get('id', ''),
                        name=a.get('name', ''),
                        name_th=a.get('name_th', ''),
                        type=a.get('type', 'hotel'),
                        price_per_night=a.get('price_per_night', 1000),
                        rating=a.get('rating', 4.0),
                        location=a.get('location', {}),
                        amenities=a.get('amenities', []),
                        community_owned=a.get('community_owned', False)
                    ))
                
                return accommodations
        except Exception as e:
            logger.error(f"Error fetching accommodations: {e}")
            return []
    
    async def get_restaurants(
        self,
        dietary: Optional[List[str]] = None,
        limit: int = 10
    ) -> List[Restaurant]:
        """Get restaurants from Neo4j"""
        if not self._connected:
            return []
        
        try:
            async with self.driver.session() as session:
                if dietary:
                    query = """
                    MATCH (p:Province {id: 'nakhon-ratchasima'})-[:HAS_RESTAURANT]->(r:Restaurant)
                    WHERE ANY(d IN $dietary WHERE d IN r.dietary_options)
                    RETURN r ORDER BY r.rating DESC LIMIT $limit
                    """
                    result = await session.run(query, dietary=dietary, limit=limit)
                else:
                    query = """
                    MATCH (p:Province {id: 'nakhon-ratchasima'})-[:HAS_RESTAURANT]->(r:Restaurant)
                    RETURN r ORDER BY r.rating DESC LIMIT $limit
                    """
                    result = await session.run(query, limit=limit)
                
                records = await result.data()
                
                restaurants = []
                for record in records:
                    r = record['r']
                    restaurants.append(Restaurant(
                        id=r.get('id', ''),
                        name=r.get('name', ''),
                        name_th=r.get('name_th', ''),
                        cuisine=r.get('cuisine', 'thai'),
                        average_cost=r.get('average_cost', 100),
                        rating=r.get('rating', 4.0),
                        location=r.get('location', {}),
                        dietary_options=r.get('dietary_options', []),
                        community_owned=r.get('community_owned', False)
                    ))
                
                return restaurants
        except Exception as e:
            logger.error(f"Error fetching restaurants: {e}")
            return []
    
    async def get_nearby_attractions(
        self,
        lat: float,
        lng: float,
        radius_km: float = 20
    ) -> List[Attraction]:
        """Get attractions near a location"""
        if not self._connected:
            return []
        
        try:
            # Simple distance calculation (not geodesic, good enough for demo)
            async with self.driver.session() as session:
                query = """
                MATCH (p:Province {id: 'nakhon-ratchasima'})-[:HAS_ATTRACTION]->(a:Attraction)
                WHERE a.lat IS NOT NULL AND a.lng IS NOT NULL
                WITH a, 
                     sqrt((a.lat - $lat)^2 + (a.lng - $lng)^2) * 111 AS distance_km
                WHERE distance_km <= $radius
                RETURN a, distance_km ORDER BY distance_km
                """
                result = await session.run(query, lat=lat, lng=lng, radius=radius_km)
                records = await result.data()
                
                attractions = []
                for record in records:
                    a = record['a']
                    attractions.append(Attraction(
                        id=a.get('id', ''),
                        name=a.get('name', ''),
                        name_th=a.get('name_th', ''),
                        category=a.get('category', ''),
                        description=a.get('description', ''),
                        opening_hours=a.get('opening_hours', ''),
                        entry_fee=a.get('entry_fee', 0),
                        duration_minutes=a.get('duration_minutes', 120),
                        location={"lat": a.get('lat'), "lng": a.get('lng')},
                        image_url=a.get('image_url', ''),
                        community_owned=a.get('community_owned', False)
                    ))
                
                return attractions
        except Exception as e:
            logger.error(f"Error fetching nearby attractions: {e}")
            return []