# Deployment Guide

> How to deploy Smart Travel Planner to production

---

## Quick Deploy (Docker)

### 1. Clone & Setup

```bash
git clone https://github.com/your-repo/smart-travel-planner.git
cd smart-travel-planner
```

### 2. Configure Environment

```bash
cp .env.example backend/.env
# Edit backend/.env with your API keys (optional)
```

### 3. Deploy with Docker

```bash
docker-compose up -d
```

**Services:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Neo4j Browser: http://localhost:7474

---

## Cloud Deploy (Railway + Vercel)

### Prerequisites
- [Railway](https://railway.app) account (free tier: $5/month)
- [Vercel](https://vercel.com) account (free tier available)
- GitHub repository

### Step 1: Deploy Backend to Railway

1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway auto-detects Python/Dockerfile
5. Add Environment Variables:
   ```
   OPENROUTER_API_KEY=sk-or-v1-xxx
   TAVILY_API_KEY=tvly-xxx
   NEO4J_URI=bolt+s://xxx.databases.neo4j.io
   NEO4J_USER=neo4j
   NEO4J_PASSWORD=xxx
   ```
6. Click "Deploy"

**Your backend URL:** `https://your-project.railway.app`

### Step 2: Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project" → "Import Git Repository"
3. Select your repository
4. Configure:
   - Framework: Vite
   - Root Directory: frontend
   - Build Command: `npm run build`
   - Output Directory: dist
5. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.railway.app
   ```
6. Click "Deploy"

**Your frontend URL:** `https://your-project.vercel.app`

### Step 3: Update Vercel Rewrite

Update `vercel.json` with your Railway backend URL:

```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "https://your-backend.railway.app/api/$1"
    }
  ]
}
```

---

## Neo4j Aura Setup (Optional)

1. Create account at [Neo4j Aura](https://neo4j.com/cloud/aura/)
2. Create new database (free tier: 50k nodes)
3. Copy connection details:
   - URI: `bolt+s://xxxxx.databases.neo4j.io`
   - Username: `neo4j`
   - Password: `your_password`
4. Run schema: Open `backend/neo4j/schema.cypher` in Neo4j Browser

---

## Verify Deployment

### Health Check

```bash
curl https://your-backend.railway.app/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "version": "1.0.0",
  "agents_online": {
    "intent": true,
    "route": true,
    "eco": true
  }
}
```

### Test Plan Endpoint

```bash
curl -X POST https://your-backend.railway.app/api/plan \
  -H "Content-Type: application/json" \
  -d '{"query": "ไปเที่ยวเขาใหญ่ 2 วัน"}'
```

---

## Troubleshooting

### Backend won't start?
- Check logs: `railway logs`
- Verify environment variables are set
- Check if port 8000 is available

### Frontend shows "Failed to fetch"?
- Verify Vite proxy is configured in `vercel.json`
- Check browser console for CORS errors
- Verify backend URL is correct

### Neo4j connection fails?
- System works without Neo4j (uses fallback data)
- Check connection string format
- Verify username/password

---

## Cost Summary

| Service | Free Tier | Paid |
|---------|-----------|------|
| Railway | $5/month credit | $0.02/hour |
| Vercel | Unlimited projects | ~$20/month |
| Neo4j Aura | 50k nodes | $65/month |
| OpenRouter | $1 credits | Pay-as-you-go |
| Tavily | 1000 searches | $5/month |

**Total (free tier):** ~$0/month

---

*Last updated: Mar 25, 2026*
