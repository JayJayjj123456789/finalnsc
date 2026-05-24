
# Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           SMART TRAVEL PLANNER                               │
│                         Multi-Agent AI System                                │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (React)                                 │
│  ┌────────────────┐    ┌─────────────────┐    ┌──────────────────────────┐   │
│  │   HomePage     │───▶│   ResultPage    │───▶│      Map (Leaflet)       │   │
│  │  Hero + Form   │    │ Routes/Eco/Map  │    │   OpenStreetMap tiles    │   │
│  └───────┬────────┘    └────────┬────────┘    └──────────────────────────┘   │
│          │                      │                                                │
│          ▼                      ▼                                                │
│  ┌───────────────────────────────────────────────────────────────────────┐   │
│  │                        API Service (axios)                             │   │
│  │                    POST /api/plan, GET /api/health                     │   │
│  └────────────────────────────┬──────────────────────────────────────────┘   │
└───────────────────────────────┼──────────────────────────────────────────────┘
                                │ Vite Proxy
                                ▼ (or CORS in production)
┌───────────────────────────────┼──────────────────────────────────────────────┐
│                              BACKEND (FastAPI)                                │
│                                                                                │
│  ┌────────────────────────────▼──────────────────────────────────────────┐   │
│  │                         /api/plan POST                                  │   │
│  │                    Travel Plan Generation                               │   │
│  └────────────────────────────┬──────────────────────────────────────────┘   │
│                               │                                              │
│          ┌────────────────────┼────────────────────┐                         │
│          ▼                    ▼                    ▼                         │
│  ┌───────────────┐   ┌───────────────┐   ┌───────────────┐                  │
│  │  INTENT AGENT │   │ ROUTE AGENT   │   │   ECO AGENT   │                  │
│  │  (OpenRouter) │   │(Scoring Algo) │   │(Carbon Calc)  │                  │
│  │               │   │               │   │               │                  │
│  │ • Thai NLP    │   │ • Smart Score │   │ • CO2 calc    │                  │
│  │ • Regex + AI  │   │ • Day plans   │   │ • Recommend   │                  │
│  │ • Fallback    │   │ • OSRM routes │   │ • Compare     │                  │
│  └───────┬───────┘   └───────┬───────┘   └───────┬───────┘                  │
│          │                   │                    │                          │
└──────────┼───────────────────┼────────────────────┼──────────────────────────┘
           │                   │                    │
           ▼                   ▼                    ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│                              DATA LAYER                                       │
│                                                                                │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────────────────┐   │
│  │     Neo4j       │  │   Web Search    │  │     Fallback Data           │   │
│  │  (Graph DB)     │  │   (Tavily/DDG)  │  │  (นครราชสีมา offline data)  │   │
│  │                 │  │                 │  │                             │   │
│  │ • Attractions   │  │ • POI details   │  │ • 12 Attractions            │   │
│  │ • Accommodations│  │ • Reviews       │  │ • 8 Hotels                  │   │
│  │ • Restaurants   │  │ • Prices        │  │ • 9 Restaurants             │   │
│  │ • Relationships │  │                 │  │ • Route templates           │   │
│  └─────────────────┘  └─────────────────┘  └─────────────────────────────┘   │
│                                                                                │
│  ┌─────────────────┐  ┌─────────────────┐                                    │
│  │      OSRM       │  │   OpenRouter    │                                    │
│  │ (Routing Engine)│  │   (AI Model)    │                                    │
│  │                 │  │                 │                                    │
│  │ • Distance mat  │  │ • Intent parse  │                                    │
│  │ • ETA calc      │  │ • NLP fallback  │                                    │
│  └─────────────────┘  └─────────────────┘                                    │
└──────────────────────────────────────────────────────────────────────────────┘

                         SMARTSCoring FORMULA
                         ┌────────────────────────────────┐
                         │  Total = Cost×0.4 + Time×0.3  │
                         │        + Eco×0.2 + Comm×0.1   │
                         └────────────────────────────────┘
```

---

## Agent Workflow

```
User Input (Thai)
     │
     ▼
┌─────────────┐
│   Intent    │ ◀─── OpenRouter AI / Regex fallback
│   Agent     │
│             │ Extract: duration, budget, travelers,
└──────┬──────┘        interests, dietary, destination
       │
       ▼
┌─────────────┐
│    Route    │ ◀─── Neo4j / Fallback data
│  Optimizer  │       OSRM (routing)
│             │
└──────┬──────┘
       │     Generate 3-5 route options
       │     with Smart Scoring
       ▼
┌─────────────┐
│     Eco     │ ◀─── IPCC emission factors
│ Assessment  │
│             │ Calculate: transport CO2,
└──────┬──────┘        accommodation CO2,
       │               activity CO2
       ▼
   Travel Plan
   (JSON Response)
```

---

## Data Flow

```
Frontend                      Backend                       External Services
   │                            │                                  │
   │  POST /api/plan            │                                  │
   │───────────────────────────▶│                                  │
   │                            │                                  │
   │                            │ Intent Agent                     │
   │                            │──────────────────────────────▶ OpenRouter
   │                            │◀────────────────────────────── API
   │                            │                                  │
   │                            │ Route Optimizer                  │
   │                            │────────┬────────────────────┐    │
   │                            │        │                    │    │
   │                            │   ┌────▼────┐          ┌────▼────┐
   │                            │   │  Neo4j  │          │  OSRM   │
   │                            │   └─────────┘          └─────────┘
   │                            │        │                    │
   │                            │◀───────┼────────────────────┘
   │                            │                                  │
   │                            │ Eco Assessment                   │
   │                            │──────────────────────────────▶ IPCC
   │                            │                                  │
   │  Response                  │                                  │
   │◀───────────────────────────│                                  │
   │  (Plan + Routes + Eco)     │                                  │
```

---

## Technology Stack

| Layer          | Technology                          | Purpose                    |
|----------------|-------------------------------------|----------------------------|
| Frontend       | React + Vite + TypeScript + Tailwind| UI                         |
| Backend        | FastAPI + Python 3.11               | API + Agents               |
| AI             | OpenRouter (phi-4-multimodal)       | Intent parsing             |
| Database       | Neo4j Aura (Graph DB)               | Attractions, routes        |
| Search         | Tavily + DuckDuckGo                 | POI details                |
| Routing        | OSRM                                | Distance, ETA              |
| Maps           | Leaflet + OpenStreetMap             | Visualization              |
| Deploy         | Railway + Vercel + Docker           | Hosting                    |
| CI/CD          | GitHub Actions                      | Testing + Deployment       |
