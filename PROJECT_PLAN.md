# Smart Travel Planner - Project Plan (NSC 2025)

## Overview
ระบบวางแผนท่องเที่ยวอัจฉริยะด้วยปัญญาประดิษฐ์หลายตัวแทน (Multi-Agent AI) สำหรับจังหวัดนครราชสีมา

## Project Structure
```
smart-travel-planner/
├── backend/                  # FastAPI backend
│   ├── app/
│   │   ├── agents/          # 3 agents
│   │   │   ├── intent/      # Intent Agent (NLP)
│   │   │   ├── route/       # Route Optimizer (Smart Scoring)
│   │   │   └── eco/         # Eco Assessment (Carbon Calc)
│   │   ├── models/          # Pydantic models
│   │   ├── services/        # Web Search, Neo4j, OSRM
│   │   └── main.py          # FastAPI app
│   ├── data/                # Fallback data
│   │   ├── korat/           # นครราชสีมา data
│   │   └── prices/          # Price tables
│   ├── tests/
│   └── requirements.txt
│
├── frontend/                # React + TypeScript
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── pages/           # Pages
│   │   ├── services/        # API calls
│   │   └── App.tsx
│   └── package.json
│
├── neo4j/                   # Neo4j schema & queries
│   ├── schema.cypher
│   └── queries/
│
└── docs/                    # Documentation
    ├── architecture/
    └── api/
```

## Tech Stack ($0 Total)
| Component | Technology | Cost |
|-----------|------------|------|
| Backend Framework | FastAPI (Python) | Free |
| AI Agent | Owl Alpha (OpenRouter) | Free |
| Web Search | Tavily API | Free (1,000 calls/month) |
| Routing | OSRM (self-host) | Free |
| Frontend | React + TypeScript | Free |
| Maps | Leaflet + OpenStreetMap | Free |
| Charts | Recharts | Free |
| Styling | Tailwind CSS | Free |
| Database | Neo4j AuraDB Free | Free (50K nodes) |
| Cache | SQLite | Free |
| Hosting | Railway + Vercel | Free |

## Agent Architecture

### 1. Intent Agent
- **Input**: Natural language Thai text (e.g., "ไปเที่ยวเหนือ 3 วัน 5000 บาท กับแฟน")
- **Output**: Structured JSON with parsed intent
- **Tech**: Owl Alpha (OpenRouter) + Regex fallback
- **Fallback**: Regex parser if AI fails

### 2. Route Optimizer Agent
- **Input**: Parsed intent from Intent Agent
- **Output**: Ranked route options with Smart Scores
- **Algorithm**: Smart Scoring weighted formula
- **Data Sources**: Neo4j (attractions), Tavily (real prices), OSRM (travel time)

### 3. Eco Assessment Agent
- **Input**: Selected route
- **Output**: Carbon footprint (kg CO₂), eco comparison
- **Tech**: IPCC coefficients + Thailand transport data

## Smart Scoring Formula

```
Total Score = (CostScore × 0.4) + (TimeScore × 0.3) + (EcoScore × 0.2) + (CommunityScore × 0.1)
```

| Factor | Weight | Description |
|--------|--------|-------------|
| 💰 Cost | 0.4 | Total trip cost (accommodation + transport + food + activities) |
| ⏱ Time | 0.3 | Total travel time |
| 🌿 Eco | 0.2 | CO₂ emissions |
| 🏘️ Community | 0.1 | % of revenue reaching local community |

---

## 8-Week Development Plan

### Week 1: Foundation 🔧
**Goal**: Set up project structure and infrastructure

#### Tasks:
- [ ] **Backend Setup**
  - [ ] Initialize FastAPI project
  - [ ] Set up virtual environment
  - [ ] Create project structure
  - [ ] Install dependencies (fastapi, uvicorn, pydantic, neo4j, httpx)
  
- [ ] **Frontend Setup**
  - [ ] Initialize React + Vite + TypeScript
  - [ ] Install dependencies (react-router, tailwindcss, leaflet, recharts)
  - [ ] Set up project structure
  - [ ] Create basic layout components

- [ ] **Database Setup**
  - [ ] Create Neo4j AuraDB account
  - [ ] Design graph schema for นครราชสีมา
  - [ ] Create sample data (attractions, restaurants, accommodations)

- [ ] **CI/CD Setup**
  - [ ] GitHub repository setup
  - [ ] GitHub Actions for CI
  - [ ] Deploy scripts for Railway + Vercel

#### Deliverables:
- [ ] Running backend on localhost
- [ ] Running frontend on localhost
- [ ] Neo4j connection working
- [ ] GitHub repo initialized

---

### Week 2-3: Core Agents 🤖
**Goal**: Implement all 3 agents with fallbacks

#### Week 2: Intent Agent + Web Search

**Intent Agent:**
- [ ] Pydantic models for user intent
- [ ] OpenRouter client for Owl Alpha
- [ ] Prompt engineering for Thai NLP
- [ ] Regex parser fallback
- [ ] Unit tests

**Web Search:**
- [ ] Tavily API integration
- [ ] DuckDuckGo fallback
- [ ] Price extraction logic
- [ ] Caching layer (SQLite)

#### Week 3: Route Optimizer + Eco Assessment

**Route Optimizer:**
- [ ] Smart Scoring implementation
- [ ] Neo4j query for route candidates
- [ ] OSRM integration for travel time
- [ ] Top-K route selection
- [ ] Popular routes fallback

**Eco Assessment:**
- [ ] Carbon Calculator (IPCC coefficients)
- [ ] Transport mode CO₂ per km
- [ ] Eco comparison display
- [ ] Standard values fallback

#### Deliverables:
- [ ] Intent Agent working (Thai → JSON)
- [ ] Web Search returning real prices
- [ ] Route Optimizer ranking routes
- [ ] Eco Agent calculating CO₂

---

### Week 4: Integration 🔗
**Goal**: Connect all agents and add error handling

#### Tasks:
- [ ] **Orchestrator**
  - [ ] Main API endpoint (POST /plan)
  - [ ] Agent chaining logic
  - [ ] Parallel execution where possible
  - [ ] Timeout handling

- [ ] **Error Handling**
  - [ ] API error responses
  - [ ] Agent fallback triggers
  - [ ] Graceful degradation

- [ ] **Data Layer**
  - [ ] SQLite session management
  - [ ] Neo4j connection pooling
  - [ ] Cache invalidation

- [ ] **API Documentation**
  - [ ] OpenAPI/Swagger docs
  - [ ] Example requests/responses
  - [ ] Error code documentation

#### Deliverables:
- [ ] Single `/api/plan` endpoint working end-to-end
- [ ] All fallbacks tested
- [ ] API documentation complete

---

### Week 5: Frontend 🎨
**Goal**: Complete user interface

#### Tasks:
- [ ] **Travel Form**
  - [ ] Thai text input (large textarea)
  - [ ] Submit button with loading state
  - [ ] Example prompts display

- [ ] **Results Display**
  - [ ] Itinerary view (day-by-day)
  - [ ] Map with route visualization
  - [ ] Cost breakdown chart
  - [ ] Carbon footprint display
  - [ ] Community impact indicator

- [ ] **UX Improvements**
  - [ ] Responsive design
  - [ ] Loading skeletons
  - [ ] Error messages
  - [ ] RTL support for Thai

#### Deliverables:
- [ ] Full travel planning flow working
- [ ] Interactive map with route
- [ ] Charts showing scores

---

### Week 6: Data 📊
**Goal**: Populate นครราชสีมา data

#### Tasks:
- [ ] **Attractions Data**
  - [ ] 20+ tourist attractions
  - [ ] Categories (nature, culture, food, activity)
  - [ ] Opening hours, entry fees
  - [ ] Photos (Unsplash links)

- [ ] **Accommodation Data**
  - [ ] 10+ hotels/homestays
  - [ ] Price ranges
  - [ ] Contact info
  - [ ] Local community flag

- [ ] **Restaurant Data**
  - [ ] 15+ local restaurants
  - [ ] Cuisine types
  - [ ] Price ranges
  - [ ] Operating hours

- [ ] **Transport Data**
  - [ ] OSRM routing for key routes
  - [ ] Transport mode options
  - [ ] Distance matrix

- [ ] **Community Data**
  - [ ] Local business registry
  - [ ] Revenue distribution percentages
  - [ ] Community activities

- [ ] **Price Tables**
  - [ ] Seasonal price adjustments
  - [ ] Fallback prices for all items

#### Deliverables:
- [ ] Neo4j fully populated with นครราชสีมา data
- [ ] Fallback prices working

---

### Week 7: Testing 🧪
**Goal**: Ensure quality and reliability

#### Tasks:
- [ ] **Unit Tests**
  - [ ] Intent parsing tests
  - [ ] Smart Scoring tests
  - [ ] Carbon calculator tests
  - [ ] Model validation tests

- [ ] **Integration Tests**
  - [ ] Full plan flow test
  - [ ] Fallback chain test
  - [ ] API endpoint tests

- [ ] **Edge Cases**
  - [ ] Empty input
  - [ ] Very long text
  - [ ] No results found
  - [ ] API timeout
  - [ ] Invalid budget format

- [ ] **Performance**
  - [ ] Response time < 10s
  - [ ] Concurrent requests
  - [ ] Memory usage

#### Deliverables:
- [ ] 80%+ test coverage
- [ ] All edge cases handled
- [ ] Performance targets met

---

### Week 8: Demo 🚀
**Goal**: Polish and present

#### Tasks:
- [ ] **Polishing**
  - [ ] UI/UX final review
  - [ ] Error messages improvement
  - [ ] Loading states
  - [ ] Mobile responsive

- [ ] **Demo Preparation**
  - [ ] 3-4 use case scenarios
  - [ ] Before/After comparison
  - [ ] Presentation slides
  - [ ] Video recording

- [ ] **Deployment**
  - [ ] Deploy backend to Railway
  - [ ] Deploy frontend to Vercel
  - [ ] Custom domain (optional)
  - [ ] SSL certificate

- [ ] **Documentation**
  - [ ] README.md
  - [ ] Architecture diagram
  - [ ] API documentation
  - [ ] User guide

#### Deliverables:
- [ ] Live demo at railway/vercel
  - [ ] Complete documentation
- [ ] Presentation ready

---

## API Endpoints

### POST /api/plan
**Description**: Generate travel plan from natural language input

**Request:**
```json
{
  "input": "ไปเที่ยวนครราชสีมา 3 วัน 5000 บาท กับแฟน ชอบธรรมชาติ",
  "preferences": {
    "travel_mode": "car",
    "eco_friendly": true
  }
}
```

**Response:**
```json
{
  "intent": {
    "duration": 3,
    "budget": 5000,
    "travelers": 2,
    "interests": ["nature"]
  },
  "routes": [
    {
      "name": "เส้นทางธรรมชาติ 3 วัน",
      "score": 0.85,
      "days": [...],
      "total_cost": 4500,
      "total_time": "6 ชั่วโมง",
      "co2_kg": 45.2,
      "community_percentage": 65
    }
  ],
  "selected_route": {...}
}
```

### GET /api/health
**Description**: Health check endpoint

### GET /api/attractions
**Description**: List all attractions in นครราชสีมา

### GET /api/fallback/prices
**Description**: Get fallback price table

---

## Comparison with Agoda

| Feature | Agoda | Smart Travel Planner |
|---------|-------|---------------------|
| จุดประสงค์ | จองที่พัก | วางแผนท่องเที่ยวครบวงจร |
| วิธีใช้ | กรอกฟอร์ม | พิมพ์ภาษาไทย |
| เส้นทาง | ❌ ไม่มี | ✅ Day-by-day itinerary |
| งบประมาณ | ❌ แค่ค่าห้อง | ✅ รวมทุกอย่าง |
| สิ่งแวดล้อม | ❌ ไม่มี | ✅ คำนวณ CO₂ |
| ชุมชน | ❌ โรงแรมใหญ่ | ✅ แนะนำชุมชน |
| ค่าใช้จ่าย | Commission | $0 ฟรี |

---

## Success Metrics

- [ ] Plan generation < 10 seconds
- [ ] 80%+ fallback coverage
- [ ] 3-4 demo scenarios working
- [ ] $0 infrastructure cost
- [ ] NSC 2025 competition ready

---

## Team (Optional)

| Role | Name | Responsibilities |
|------|------|------------------|
| Project Manager | - | Timeline, coordination |
| Backend Dev | - | FastAPI, agents, Neo4j |
| Frontend Dev | - | React, UI/UX |
| Data Engineer | - | Data collection, Neo4j |
| Tester | - | Testing, QA |

---

## Next Steps

1. **Week 1 - Start Now:**
   - [ ] Create backend folder structure
   - [ ] Initialize FastAPI project
   - [ ] Create frontend folder structure
   - [ ] Initialize React + Vite project

2. **Before Next Session:**
   - [ ] Complete Week 1 tasks
   - [ ] Ensure backend running on port 8000
   - [ ] Ensure frontend running on port 5173