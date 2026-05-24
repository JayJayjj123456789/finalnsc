"""Web Search Service - Tavily + DuckDuckGo fallback"""

import httpx
import logging
from typing import Optional, List, Dict
from app.core.config import settings

logger = logging.getLogger(__name__)


class WebSearchService:
    """Handles web searches with fallback chain: Tavily → DuckDuckGo → Cached prices"""
    
    def __init__(self):
        self.tavily_api_key = settings.TAVILY_API_KEY
        self.cache = {}  # Simple in-memory cache
    
    async def search(self, query: str, num_results: int = 5) -> List[Dict]:
        """
        Search for information with fallback
        
        Args:
            query: Search query (Thai or English)
            num_results: Number of results to return
        
        Returns:
            List of search results with title, url, snippet
        """
        # Try Tavily first
        if self.tavily_api_key:
            try:
                results = await self._search_tavily(query, num_results)
                if results:
                    return results
            except Exception as e:
                logger.warning(f"Tavily search failed: {e}")
        
        # Try DuckDuckGo
        try:
            results = await self._search_duckduckgo(query, num_results)
            if results:
                return results
        except Exception as e:
            logger.warning(f"DuckDuckGo search failed: {e}")
        
        # Return cached/fallback data
        logger.info("Using cached/fallback search results")
        return self._get_fallback_results(query)
    
    async def _search_tavily(self, query: str, num_results: int) -> List[Dict]:
        """Search using Tavily API"""
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.tavily.com/search",
                json={
                    "api_key": self.tavily_api_key,
                    "query": query,
                    "search_depth": "basic",
                    "max_results": num_results
                },
                timeout=10.0
            )
            
            if response.status_code == 200:
                data = response.json()
                return [
                    {
                        "title": r.get("title", ""),
                        "url": r.get("url", ""),
                        "snippet": r.get("content", "")[:200]
                    }
                    for r in data.get("results", [])
                ]
        
        return []
    
    async def _search_duckduckgo(self, query: str, num_results: int) -> List[Dict]:
        """Search using DuckDuckGo Instant Answer API"""
        async with httpx.AsyncClient() as client:
            # Use DuckDuckGo Lite for simple search
            url = f"https://lite.duckduckgo.com/lite/"
            params = {"q": query}
            
            response = await client.get(url, params=params, timeout=10.0)
            
            if response.status_code == 200:
                # Parse HTML results (simplified)
                results = []
                text = response.text
                
                # Look for URLs and snippets
                import re
                urls = re.findall(r"href=\"(https?://[^\"]+)\"", text)
                titles = re.findall(r"<a class=\"result__a\"[^>]*>([^<]+)</a>", text)
                
                for i, url in enumerate(urls[:num_results]):
                    title = titles[i] if i < len(titles) else "Result"
                    results.append({
                        "title": title,
                        "url": url,
                        "snippet": f"Search result for: {query}"
                    })
                
                return results
        
        return []
    
    def _get_fallback_results(self, query: str) -> List[Dict]:
        """Return fallback cached results"""
        # Check cache first
        if query in self.cache:
            return self.cache[query]
        
        # Return general fallback
        return [
            {
                "title": f"ข้อมูล{query} - นครราชสีมา",
                "url": "https://th.wikipedia.org/wiki/นครราชสีมา",
                "snippet": "ข้อมูลท่องเที่ยวจังหวัดนครราชสีมา"
            }
        ]
    
    async def get_prices(self, item: str, location: str = "นครราชสีมา") -> Dict:
        """
        Get real prices for accommodation, food, activities
        
        Args:
            item: Item to search (hotel, restaurant, attraction)
            location: Location name
        
        Returns:
            Dict with min, max, average prices in THB
        """
        query = f"{item} {location} ราคา"
        
        # Search for prices
        results = await self.search(query, num_results=10)
        
        # Extract price info (simplified)
        prices = {
            "min": 0,
            "max": 0,
            "average": 0,
            "source": "web_search"
        }
        
        # Parse prices from results (rough extraction)
        import re
        price_pattern = r"[0-9,]+\s*(?:บาท|THB|฿)"
        
        all_prices = []
        for r in results:
            matches = re.findall(price_pattern, r.get("snippet", ""))
            for match in matches:
                num = int(match.replace(",", "").replace(" บาท", "").replace("THB", "").replace("฿", "").strip())
                all_prices.append(num)
        
        if all_prices:
            prices["min"] = min(all_prices)
            prices["max"] = max(all_prices)
            prices["average"] = int(sum(all_prices) / len(all_prices))
        
        # Cache results
        self.cache[query] = results
        
        return prices
