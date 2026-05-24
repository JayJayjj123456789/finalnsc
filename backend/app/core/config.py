from pydantic_settings import BaseSettings
from typing import Optional
import os


class Settings(BaseSettings):
    # App
    APP_NAME: str = "Smart Travel Planner"
    APP_VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # Neo4j
    NEO4J_URI: str = os.getenv("NEO4J_URI", "bolt://localhost:7687")
    NEO4J_USER: str = os.getenv("NEO4J_USER", "neo4j")
    NEO4J_PASSWORD: str = os.getenv("NEO4J_PASSWORD", "password")
    NEO4J_DATABASE: str = "neo4j"
    
    # OpenRouter (Owl Alpha)
    OPENROUTER_API_KEY: str = os.getenv("OPENROUTER_API_KEY", "")
    OPENROUTER_BASE_URL: str = "https://openrouter.ai/api/v1"
    OPENROUTER_MODEL: str = "nousresearch/phi-4-multimodal-thinking"
    
    # Tavily Search
    TAVILY_API_KEY: str = os.getenv("TAVILY_API_KEY", "")
    
    # OSRM (self-hosted or public)
    OSRM_URL: str = os.getenv("OSRM_URL", "http://router.project-osrm.org")
    
    # Fallback
    USE_FALLBACK: bool = True
    
    class Config:
        env_file = ".env"
        extra = "allow"


settings = Settings()
