# Quick Start Guide 🚀

## Complete Startup Instructions

Follow these commands in order to start the entire MindConnect project:

---

## Prerequisites Check ✅
Before starting, ensure you have:
- Node.js (v24+) installed: `node --version`
- Docker installed: `docker --version`
- Ollama installed and running: `ollama serve` (should be running)

---

## Method 1: Step-by-Step (Recommended for First Time)

### Terminal 1: Start Docker Services
```bash
cd Backend
docker compose up -d
```
**Wait 10-15 seconds for services to start**

Verify services are running:
```bash
docker ps
```

You should see:
- `mindconnect-valkey` (Redis)
- `mindconnect-qdrant` (Vector DB)

---

### Terminal 2: Start Backend Server
```bash
cd Backend
npm install  # Run only on first time
npm run dev
```

**Expected Output:**
```
Server is running on port 5000
```

✅ Backend ready at `http://localhost:5000`

---

### Terminal 3: Start Worker Process
```bash
cd Backend
npm run worker
```

**Expected Output:**
```
[nodemon] watching path(s): *.*
[nodemon] starting `node workers/myWorker.js`
```

✅ Worker ready to process PDF uploads

---

### Terminal 4: Start Frontend
```bash
cd Frontend
npm install  # Run only on first time
npm run dev
```

**Expected Output:**
```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
```

✅ Frontend ready at `http://localhost:5173`

---

### Terminal 5: Start Ollama (If Not Already Running)
```bash
ollama serve
```

**Expected Output:**
```
Listening on 127.0.0.1:11434
```

✅ Ollama ready at `http://localhost:11434`

---

## Method 2: One-Line Startup (After First Setup)

If you've already installed dependencies, create a script:

### For Windows PowerShell:
Create `start-project.ps1`:
```powershell
# Start Docker services
Write-Host "Starting Docker services..." -ForegroundColor Green
Set-Location Backend
docker compose up -d
Start-Sleep -Seconds 10

# Open new PowerShell windows for each service
Write-Host "Opening terminal windows..." -ForegroundColor Green

# Terminal 2 - Backend
Start-Process powershell -ArgumentList "cd Backend; npm run dev"

# Terminal 3 - Worker
Start-Process powershell -ArgumentList "cd Backend; npm run worker"

# Terminal 4 - Frontend
Start-Process powershell -ArgumentList "cd Frontend; npm run dev"

Write-Host "All services starting! Check windows opened." -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "Qdrant: http://localhost:6333/dashboard" -ForegroundColor Cyan
```

Run it:
```bash
powershell -ExecutionPolicy Bypass -File start-project.ps1
```

---

## Service URLs After Starting

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | `http://localhost:5173` | Main application |
| Backend API | `http://localhost:5000` | API endpoints |
| Qdrant Dashboard | `http://localhost:6333/dashboard` | Vector DB management |
| Ollama API | `http://localhost:11434/api/tags` | LLM service |
| Redis | `localhost:6379` | Cache/Queue |

---

## Verification Checklist ✓

After starting all services, verify each is running:

```bash
# Check Frontend (should show HTML)
curl http://localhost:5173

# Check Backend (should show "Hello World!")
curl http://localhost:5000

# Check Qdrant (should show health status)
curl http://localhost:6333/health

# Check Ollama (should list models)
curl http://localhost:11434/api/tags

# Check Redis
redis-cli ping  # Should return PONG
```

---

## First-Time Setup Checklist

- [ ] Clone repository: `git clone https://github.com/aditya-kurhade/MindConnect-2.O.git`
- [ ] Create `.env` files (Backend and Frontend)
- [ ] Run `npm install` in Backend folder
- [ ] Run `npm install` in Frontend folder
- [ ] Pull Ollama models:
  ```bash
  ollama pull llama3:8b
  ollama pull nomic-embed-text
  ```
- [ ] Start Docker: `docker compose up -d`
- [ ] Start all 5 terminals as shown above

---

## Common Commands Reference

### Backend
```bash
cd Backend

# Development mode (auto-reload)
npm run dev

# Start worker (separate terminal)
npm run worker

# Production mode
npm start

# Install dependencies
npm install
```

### Frontend
```bash
cd Frontend

# Development mode
npm run dev

# Build for production
npm build

# Preview production build
npm preview

# Lint code
npm run lint
```

### Docker
```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f

# View running containers
docker ps

# Remove all containers and volumes
docker compose down -v
```

### Redis/Valkey
```bash
# Connect to Redis CLI
redis-cli

# Inside Redis CLI
ping           # Test connection
KEYS *         # List all keys
GET key_name   # Get value
DEL key_name   # Delete key
```

### Ollama
```bash
# List available models
ollama list

# Pull a model
ollama pull model_name

# Run a model interactively
ollama run llama3:8b

# Check API endpoint
curl http://localhost:11434/api/tags
```

---

## File Modifications Needed

### Backend/.env
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mindconnect_db
DB_USER=root
DB_PASSWORD=root
FRONTEND_URL=http://localhost:5173
JWT_SECRET=your_secret_key_here
OLLAMA_URL=http://localhost:11434/api/generate
REDIS_HOST=localhost
REDIS_PORT=6379
QDRANT_URL=http://localhost:6333
```

### Frontend/.env
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_AI_KEY=your_google_api_key_here
```

---

## Troubleshooting Quick Fixes

### Port Already in Use
```bash
# Find and kill process using port 5000 (Backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Find and kill process using port 5173 (Frontend)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Find and kill process using port 11434 (Ollama)
netstat -ano | findstr :11434
taskkill /PID <PID> /F
```

### Docker Services Not Starting
```bash
# Remove and restart
docker compose down
docker compose up -d

# Check logs
docker compose logs valkey
docker compose logs qdrant
```

### Ollama Models Missing
```bash
# Pull required models
ollama pull llama3:8b
ollama pull nomic-embed-text

# Verify
ollama list
```

### Database Connection Error
```bash
# Check MySQL/MariaDB is in Docker
docker ps | grep mysql

# Or if using local MySQL
mysql -u root -p -h localhost
```

---

## What Happens When You Start Each Service

### 1. Docker Services (Valkey + Qdrant)
- Creates Redis cache for sessions and job queue
- Creates vector database for PDF embeddings
- Initializes storage volumes

### 2. Backend Server
- Loads environment variables
- Connects to MySQL database
- Auto-creates tables if they don't exist
- Starts listening on port 5000

### 3. Worker Process
- Connects to Redis queue
- Listens for PDF upload jobs
- When PDF uploaded: Loads → Chunks → Embeds → Stores in Qdrant

### 4. Frontend
- Bundles React components
- Starts Vite dev server
- Available at localhost:5173

### 5. Ollama
- Loads LLM models into memory
- Provides API endpoints for chat and embeddings
- Runs locally (no cloud API calls)

---

## Default Credentials

### Database
- **Host**: localhost
- **Port**: 3306
- **Username**: root
- **Password**: root
- **Database**: mindconnect_db

### JWT
- **Secret**: Use value from .env
- **Expiry**: 7 days

---

## Next Steps After Starting

1. **Create an account**
   - Go to `http://localhost:5173`
   - Sign up as Client or Counselor

2. **Test features**
   - Try AI Chatbot
   - Upload PDF to RAG Chatbot
   - Browse Dashboard

3. **Monitor services**
   - Check backend logs for requests
   - Check Qdrant dashboard for collections
   - Check worker logs for PDF processing

---

## Performance Tips

- **First load might be slow** - Ollama is loading models into memory
- **PDF processing takes time** - Depends on file size and chunk count
- **Keep Redis running** - Needed for queue and caching
- **Monitor Docker memory** - Ollama + Qdrant need RAM

---

## Still Having Issues?

1. Check [Troubleshooting](#troubleshooting) in main README
2. Verify all 5 terminals are running
3. Check all `.env` files exist
4. Verify Docker services: `docker ps`
5. Check logs: `docker compose logs`

---

**Happy Coding! 🚀**

For detailed setup instructions, see [README.md](README.md)
