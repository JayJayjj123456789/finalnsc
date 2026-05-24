# Smart Travel Planner - Backend Build Plan

## Status: COMPLETE (as of 2026-05-25)

---

## What Was Built

A fully functional FastAPI backend at localhost:8000 that replaced mock data with real route generation using fallback data, Thai NLP parsing, smart scoring, and carbon footprint calculation.

### Architecture

```
Frontend (React/Vite)  --->  FastAPI Backend  --->  Agents + Fallback Data
localhost:5174                localhost:8000
                              |
                              +-- Intent Agent (Thai NLP parsing)
                              +-- Route Optimizer (3 routes: budget/eco/balanced)
                              +-- Eco Assessment Agent (CO2 calculator)
                              +-- Fallback Data Service (15 attractions)
```

---

## Files Modified/Created

| File | Purpose |
|------|---------|
| backend/app/models/__init__.py | Rewritten - PlanResponse matches frontend types |
| backend/app/main.py | Rewritten - /api/plan returns { query, routes, generated_at } |
| backend/app/agents/intent/agent.py | Thai NLP parser (duration, budget, travelers, interests) |
| backend/app/agents/route/agent.py | Generates 3 routes from fallback data with smart scoring |
| backend/app/agents/eco/agent.py | CO2 calculator using IPCC transport coefficients |
| backend/app/services/fallback_data.py | 15 attractions, 7 accommodations, 8 restaurants |
| frontend/src/services/api.ts | Changed USE_MOCK = false |

---

## API Endpoints

### POST /api/plan
Request: { "input": "..." }

Response: {
  "query": "...",
  "routes": [{
    "name": "Budget Route",
    "score": 77,
    "days": 3,
    "total_cost": 4460,
    "co2_kg": 135.8,
    "community_percentage": 75,
    "carbon_saved_pct": 0,
    "days_detail": [{
      "day": 1,
      "activities": [{
        "name": "...", "lat": 14.45, "lng": 101.36,
        "type": "nature", "duration_min": 90, "cost_baht": 0
      }],
      "day_cost": 2695
    }],
    "highlights": ["Low cost", "Community", "Authentic", "Eco-friendly"]
  }],
  "generated_at": "2026-05-25T00:00:21"
}

### GET /api/health
Returns { "status": "healthy", "version": "1.0.0", "agents_online": {...} }

---

## Smart Scoring Formula

```
score = cost_score * 0.4 + time_score * 0.3 + eco_score * 0.2 + community_score * 0.1

cost_score:     1 - (total_cost / budget)
time_score:     total_activities / expected_activities
eco_score:      carbon_saved_pct * 2
community_score: community_percentage
```

---

## Intent Parsing (Thai NLP)

| Field | Patterns | Example |
|-------|----------|---------|
| Duration | 3, 2 | -> 3 days |
| Budget | 5000, 3000 | -> 5000 THB |
| Travelers | 2, 3 | -> 2, 3 people |
| Interests | nature, food, culture | -> categories |

---

## Fallback Data

- 15 attractions (9 nature, 4 culture, 2 food)
- 7 accommodations (3 homestay, 1 hostel, 2 hotel, 1 resort)
- 8 restaurants (4 Thai, 1 halal, 2 western, 1 cafe)

---

## How to Run

```bash
# Backend
cd E:/finalnsc/smart-travel-planner/backend
venv/Scripts/activate
uvicorn app.main:app --reload --port 8000

# Frontend
cd E:/finalnsc/smart-travel-planner/frontend
npm run dev
```

---

## Future Enhancements

1. Neo4j graph database for relationship-based routing
2. OSRM for real driving distances
3. Tavily web search for real-time prices
4. OpenRouter LLM for better Thai NLP
5. More provinces beyond Nakhon Ratchasima
