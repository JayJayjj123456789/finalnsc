# Smart Travel Planner

ระบบวางแผนท่องเที่ยวอัจฉริยะด้วย Multi-Agent AI สำหรับจังหวัดนครราชสีมา 🌿

## 🎯 Features

- **🤖 3 AI Agents**
  - Intent Agent: แปลงข้อความภาษาไทยเป็นตัวกรองการค้นหา
  - Route Optimizer: หาเส้นทางที่ดีที่สุดด้วย Smart Scoring
  - Eco Assessment: คำนวณคาร์บอนฟุตพริ้นท์และแนะนำการท่องเที่ยวเชิงอนุรักษ์

- **📊 Smart Scoring Formula**
  - Cost: 40%
  - Time: 30%
  - Eco: 20%
  - Community: 10%

- **🗄️ Database**
  - Neo4j Aura (Free Tier) สำหรับกราฟข้อมูลสถานที่ท่องเที่ยว
  - Fallback data สำหรับใช้งานเมื่อไม่มี internet

- **💰 Total Cost: $0**
  - OpenRouter (Owl Alpha / NousResearch): ฟรี tier
  - Neo4j Aura Free: ฟรี
  - Tavily Search: ฟรี tier
  - Railway/Render: Free tier

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 20+
- (Optional) Neo4j Aura account
- (Optional) OpenRouter API key

### 1. Clone & Setup

```bash
git clone https://github.com/yourusername/smart-travel-planner.git
cd smart-travel-planner
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy and edit .env
cp .env.example .env
# Edit .env with your API keys

# Run server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

### 4. Open Browser

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 📁 Project Structure

```
smart-travel-planner/
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   │   ├── intent/       # Intent Agent (NLP)
│   │   │   ├── route/        # Route Optimizer Agent
│   │   │   └── eco/          # Eco Assessment Agent
│   │   ├── models/           # Pydantic models
│   │   ├── services/         # Neo4j, Web Search, OSRM
│   │   └── main.py           # FastAPI app
│   ├── tests/
│   ├── data/                 # Fallback data
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API services
│   │   └── types/            # TypeScript types
│   └── package.json
├── .github/
│   └── workflows/            # CI/CD
└── README.md
```

## 🔧 Environment Variables

### Backend (.env)

```env
# Neo4j (free at https://neo4j.com/cloud/aura/)
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=your_password

# OpenRouter (free at https://openrouter.ai/)
OPENROUTER_API_KEY=sk-or-v1-xxxxx

# Tavily Search (free at https://tavily.com/)
TAVILY_API_KEY=tvly-xxxxx

# OSRM (public server)
OSRM_URL=http://router.project-osrm.org
```

## 🧪 Testing

```bash
# Backend tests
cd backend
pytest tests/ -v

# Frontend type check
cd frontend
npm run build
```

## 📝 Usage Example

```
Input: "ไปเที่ยวนครราชสีมา 3 วัน 5000 บาท กับแฟน ชอบธรรมชาติ"

Output:
- Parsed Intent: 3 days, 5000 THB, 2 travelers, nature interests
- 3 Route Options ranked by Smart Score
- Carbon Footprint breakdown
- Eco-friendly recommendations
```

## 🎨 Tech Stack

| Component | Technology |
|-----------|------------|
| Backend | FastAPI + Uvicorn |
| Frontend | React 18 + TypeScript + Tailwind |
| Database | Neo4j Aura (Graph DB) |
| AI | OpenRouter (Owl Alpha / NousResearch) |
| Search | Tavily API |
| Maps | OpenStreetMap + Leaflet |
| Charts | Recharts |
| CI/CD | GitHub Actions |

## 📄 License

MIT License - NSC 2025 Project

## 👨‍💻 Author

Built for NSC 2025 Competition