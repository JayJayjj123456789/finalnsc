import json
import hashlib
import logging
from app.core.config import settings

logger = logging.getLogger(__name__)
_redis = None


def _get_client():
    global _redis
    if _redis is None and settings.UPSTASH_REDIS_REST_URL:
        try:
            from upstash_redis import Redis
            _redis = Redis(
                url=settings.UPSTASH_REDIS_REST_URL,
                token=settings.UPSTASH_REDIS_REST_TOKEN,
            )
        except Exception as e:
            logger.warning(f"Redis cache unavailable: {e}")
    return _redis


def cache_key(text: str) -> str:
    return "plan:" + hashlib.md5(text.encode()).hexdigest()


def get_cached(text: str):
    r = _get_client()
    if not r:
        return None
    try:
        val = r.get(cache_key(text))
        if val:
            logger.info("Cache HIT")
            return json.loads(val)
    except Exception as e:
        logger.warning(f"Cache get error: {e}")
    return None


def set_cached(text: str, data: dict, ttl: int = 3600):
    r = _get_client()
    if not r:
        return
    try:
        r.setex(cache_key(text), ttl, json.dumps(data))
        logger.info("Cache SET")
    except Exception as e:
        logger.warning(f"Cache set error: {e}")
