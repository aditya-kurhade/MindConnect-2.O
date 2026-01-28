# MindConnect 2.0 🧠

A comprehensive mental health and counseling platform that connects clients with counselors and provides AI-powered support through intelligent chatbots and document-based knowledge retrieval.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies & Architecture](#technologies--architecture)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Usage Instructions](#usage-instructions)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment Guide](#deployment-guide)
- [Contributing Guidelines](#contributing-guidelines)
- [Troubleshooting](#troubleshooting)

---

## Project Overview

**MindConnect 2.0** is a full-stack web application designed to provide accessible mental health support and counseling services. The platform bridges the gap between clients seeking mental health assistance and professional counselors, while also leveraging AI to provide immediate support through intelligent chatbots.

### Problem Statement
Mental health support is often inaccessible due to cost, availability, and stigma. MindConnect addresses this by:
- Connecting clients directly with licensed counselors
- Providing 24/7 AI-powered emotional support
- Offering knowledge resources and community forums
- Using advanced RAG (Retrieval Augmented Generation) for context-aware responses

### Key Objectives
- Enable seamless client-counselor matching and communication
- Provide intelligent AI responses powered by local LLMs (Ollama)
- Create a supportive community through forums and resource sharing
- Maintain data privacy using local AI models instead of cloud APIs

---

## Technologies & Architecture

### Frontend Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19.1.1 | UI framework and component library |
| **Vite** | 5.x | Fast build tool and dev server |
| **React Router** | 7.8.2 | Client-side routing |
| **Tailwind CSS** | 4.1.13 | Utility-first CSS framework |
| **Framer Motion** | 12.23.12 | Animations and transitions |
| **Axios** | 1.13.2 | HTTP client for API calls |
| **React Toastify** | 11.0.5 | Toast notifications |
| **Lucide React** | 0.542.0 | Icon library |

### Backend Stack
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Node.js** | 24.11.1 | Runtime environment |
| **Express** | 5.2.1 | Web framework |
| **MySQL** | via mysql2 | Primary relational database |
| **Redis (Valkey)** | Latest | Caching and message queue |
| **Qdrant** | Latest | Vector database for embeddings |
| **Bull MQ** | 5.67.1 | Job queue for async processing |
| **Ollama** | Local | Local LLM and embedding model |

### AI & NLP Technologies
| Library | Purpose |
|---------|---------|
| **@langchain/ollama** | Local embedding generation |
| **@langchain/qdrant** | Vector store integration |
| **@langchain/community** | Document loaders and utilities |
| **@langchain/textsplitters** | Document chunking for RAG |
| **@google/generative-ai** | Gemini AI integration (backup) |

### DevOps & Infrastructure
| Tool | Purpose |
|------|---------|
| **Docker & Docker Compose** | Containerization |
| **Nodemon** | Development server auto-reload |
| **ESLint** | Code quality and linting |

---

## Installation & Setup

### Prerequisites
- **Node.js** (v24.11.1 or higher)
- **npm** (v10+)
- **Docker** and **Docker Compose**
- **Ollama** (for local LLM and embeddings)
- **MySQL** (or MySQL-compatible database)

### Step 1: Clone Repository
```bash
git clone https://github.com/aditya-kurhade/MindConnect-2.O.git
cd MindConnect-2.O
```

### Step 2: Backend Setup

#### 2.1 Install Dependencies
```bash
cd Backend
npm install
```

#### 2.2 Environment Configuration
Create a `.env` file in the Backend directory:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=mindconnect_db
DB_USER=root
DB_PASSWORD=your_password

# Frontend URL
FRONTEND_URL=http://localhost:5173

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRY=7d

# Ollama Configuration
OLLAMA_URL=http://localhost:11434/api/generate

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379

# Qdrant Configuration
QDRANT_URL=http://localhost:6333
```

#### 2.3 Start Docker Services
```bash
docker compose up -d
```

This starts:
- **Valkey** (Redis) on port 6379
- **Qdrant** (Vector DB) on port 6333

#### 2.4 Database Setup
```bash
# The database tables will be auto-created on server startup
# Or manually run SQL migrations if needed
```

#### 2.5 Start Backend Server
```bash
npm run dev
```
Server runs at `http://localhost:5000`

#### 2.6 Start Worker Process
In a separate terminal:
```bash
npm run worker
```
This processes PDF uploads and creates embeddings.

### Step 3: Frontend Setup

#### 3.1 Install Dependencies
```bash
cd Frontend
npm install
```

#### 3.2 Environment Configuration
Create a `.env` file in the Frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_AI_KEY=your_google_ai_key
```

#### 3.3 Start Development Server
```bash
npm run dev
```
Frontend runs at `http://localhost:5173`

### Step 4: Setup Ollama
```bash
# Download and install Ollama from https://ollama.ai

# Pull required models
ollama pull llama3:8b          # For chat responses
ollama pull nomic-embed-text   # For embeddings

# Start Ollama server (runs on localhost:11434 by default)
ollama serve
```

### Step 5: Verify All Services
```bash
# Check backend
curl http://localhost:5000

# Check Qdrant
curl http://localhost:6333/health

# Check Ollama
curl http://localhost:11434/api/tags

# Check Redis
redis-cli ping
```

---

## Project Structure

```
MindConnect-2.O/
├── Frontend/                          # React Vite application
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   │   ├── Navbar.jsx           # Navigation bar
│   │   │   ├── Signin.jsx           # Authentication
│   │   │   ├── Signup.jsx           # Registration
│   │   │   ├── AICard.jsx           # AI feature showcase
│   │   │   ├── ChatbotCard.jsx      # Chatbot interface
│   │   │   ├── HeroSection.jsx      # Landing page hero
│   │   │   ├── clientComponents/    # Client-specific components
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Appointments.jsx
│   │   │   │   ├── Counsellors.jsx
│   │   │   │   └── RecentActivity.jsx
│   │   │   └── counsellorComponents/ # Counselor-specific components
│   │   │       ├── Dashboard.jsx
│   │   │       ├── ClientManagement.jsx
│   │   │       └── Analytics.jsx
│   │   ├── pages/                   # Page components
│   │   │   ├── Home.jsx             # Landing page
│   │   │   ├── AiChatbot.jsx        # AI chatbot interface
│   │   │   ├── RAGChatbot.jsx       # Document-based chatbot
│   │   │   ├── Forum.jsx            # Community forum
│   │   │   ├── Resources.jsx        # Learning resources
│   │   │   ├── Clientdashboard.jsx  # Client dashboard
│   │   │   └── CounsellorDashboard.jsx # Counselor dashboard
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # Entry point
│   │   ├── App.css                  # Global styles
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── Backend/                           # Node.js Express application
│   ├── app.js                        # Main server file
│   ├── package.json
│   ├── docker-compose.yml            # Docker services definition
│   ├── config/
│   │   └── dbConfig.js               # MySQL connection setup
│   ├── routes/                       # API route handlers
│   │   ├── authClientRoute.js        # Client authentication
│   │   ├── authCounsellorRoute.js    # Counselor authentication
│   │   ├── dashboardRoute.js         # Dashboard data
│   │   ├── aiChatbotRoute.js         # AI chatbot endpoint
│   │   └── pdfUploadRoute.js         # PDF upload handling
│   ├── controllers/                  # Business logic
│   │   ├── authClientController.js   # Client auth logic
│   │   ├── authCounsellorController.js # Counselor auth logic
│   │   ├── dashboardController.js    # Dashboard queries
│   │   ├── aiChatbotController.js    # Chatbot responses
│   │   └── uploadPdfController.js    # PDF processing
│   ├── middleware/
│   │   ├── authMiddleware.js         # JWT verification
│   │   └── uploadMiddleware.js       # Multer configuration
│   ├── services/
│   │   └── ollama.service.js         # Ollama API calls
│   ├── workers/
│   │   └── myWorker.js               # Bull worker for PDF embedding
│   ├── queues/
│   │   └── myQueue.js                # Bull queue definition
│   ├── utils/
│   │   └── dbUtils.js                # Database utilities
│   └── uploads/                      # Uploaded PDF storage

└── CODE_REVIEW.md                     # Code review guidelines
```

---

## Features

### 1. **Authentication & Authorization**
- **Client Registration & Login**: Secure authentication for patients
- **Counselor Registration & Login**: Professional counselor onboarding
- **JWT-based Token System**: Secure API endpoints
- **Role-based Access Control**: Different permissions for clients and counselors
- **Password Hashing**: bcrypt encryption for security

**Location**: `Backend/routes/auth*Route.js`, `Backend/controllers/auth*Controller.js`

### 2. **Client Dashboard**
- **Profile Management**: Update personal information and preferences
- **Appointment Booking**: Schedule sessions with counselors
- **Counselor Directory**: Browse and filter available counselors
- **Recent Activity**: View past sessions and interactions
- **Session History**: Access previous conversations

**Location**: `Frontend/pages/Clientdashboard.jsx`, `Frontend/components/clientComponents/`

### 3. **Counselor Dashboard**
- **Client Management**: View and manage assigned clients
- **Appointment Scheduling**: Manage appointment calendar
- **Analytics**: Track client progress and session metrics
- **Client History**: Access detailed client profiles and notes
- **Today's Schedule**: Quick view of scheduled appointments

**Location**: `Frontend/pages/CounsellorDashboard.jsx`, `Frontend/components/counsellorComponents/`

### 4. **AI Chatbot (Direct LLM)**
- **Real-time Conversations**: Chat with local Ollama LLM (llama3:8b)
- **Emotional Support**: Trained prompts for mental health support
- **Response Generation**: Fast local responses without cloud API calls
- **Session History**: Maintain conversation context across sessions

**Location**: `Frontend/pages/AiChatbot.jsx`, `Backend/routes/aiChatbotRoute.js`, `Backend/services/ollama.service.js`

### 5. **RAG Chatbot (Retrieval Augmented Generation)**
- **PDF Knowledge Base**: Upload and process mental health resources/PDFs
- **Semantic Search**: Find relevant information using embeddings
- **Context-aware Responses**: Generate answers from uploaded documents
- **Vector Database**: Qdrant stores document embeddings (768-dimensional vectors from nomic-embed-text)
- **Chunked Processing**: Documents split into 500-character chunks for better retrieval

**Location**: `Frontend/pages/RAGChatbot.jsx`, `Backend/workers/myWorker.js`, `Backend/routes/pdfUploadRoute.js`

**Flow**:
1. User uploads PDF → Multer handles file storage
2. Bull Queue triggers worker process
3. Worker: Loads PDF → Chunks text → Generates embeddings → Stores in Qdrant
4. When chatting: Query → Search Qdrant vectors → Retrieve context → Generate response

### 6. **Community Forum**
- **Ask Questions**: Clients can post questions to the community
- **Answer & Discuss**: Others can provide answers and insights
- **Vote & Rank**: Upvote helpful responses
- **Categories**: Organize discussions by topic

**Location**: `Frontend/pages/Forum.jsx`, `Frontend/pages/AskQuestion.jsx`, `Frontend/pages/QuestionDetail.jsx`

### 7. **Resources & Educational Content**
- **Resource Library**: Access curated mental health resources
- **Categories**: Organized by topic and difficulty
- **Detailed Pages**: In-depth information on each resource
- **PDF Support**: Share documents and materials

**Location**: `Frontend/pages/Resources.jsx`, `Frontend/pages/ResourceDetail.jsx`

### 8. **PDF Upload & Processing**
- **Async Processing**: Bull MQ handles background jobs
- **Progress Tracking**: Monitor upload and embedding progress
- **Error Handling**: Graceful handling of corrupted files
- **Storage**: PDFs stored locally in `/Backend/uploads/`

**Technical Details**:
- **Splitter Config**: 500 char chunks, 50 char overlap
- **Embedding Model**: nomic-embed-text (384 dimensions)
- **Collection**: "pdf-docs" in Qdrant

### 9. **Report & Analytics**
- **AI-Generated Reports**: Insights from AI interactions
- **Session Analytics**: Track progress and patterns
- **Counselor Reports**: Professional assessment summaries

**Location**: `Frontend/pages/ReportAI.jsx`

---

## System Architecture

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (React + Vite)                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Pages: Home, Dashboard, Forum, Chatbots, Resources      │   │
│  │  Components: Auth, Cards, Navigation                      │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                                  │
                        (HTTP/REST via Axios)
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BACKEND (Node.js + Express)                     │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────────┐   │
│  │   Routes    │  │ Controllers  │  │  Middleware          │   │
│  │ (Auth, API) │  │ (Business    │  │ (JWT, Upload)        │   │
│  │             │  │   Logic)     │  │                      │   │
│  └─────────────┘  └──────────────┘  └──────────────────────┘   │
│         │                │                    │                  │
│         └────────────────┼────────────────────┘                  │
│                          │                                       │
│              ┌───────────▼───────────┐                          │
│              │   Services Layer      │                          │
│              │ (Ollama, Utilities)   │                          │
│              └───────────┬───────────┘                          │
└──────────────────────────┼──────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┬─────────────┐
        │                  │                  │             │
        ▼                  ▼                  ▼             ▼
    ┌────────┐         ┌────────┐        ┌────────┐   ┌─────────┐
    │ MySQL  │         │ Valkey │        │ Qdrant │   │ Ollama  │
    │(Primary│         │ (Redis)│        │(Vector │   │ (Local  │
    │Database│         │ Cache/ │        │ DB)    │   │  LLM)   │
    │)       │         │ Queue) │        │        │   │         │
    └────────┘         └────────┘        └────────┘   └─────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │   Bull Worker    │
                    │  (PDF Processing)│
                    └──────────────────┘
```

### Data Flow Examples

#### Example 1: PDF Upload & RAG Processing
```
1. User uploads PDF via Frontend
   └─> pdfUploadRoute receives file
       └─> uploadMiddleware (Multer) saves to disk
           └─> Creates Bull job with file info
               └─> Returns job ID to frontend

2. Bull Worker picks up job
   └─> PDFLoader loads file
       └─> RecursiveCharacterTextSplitter chunks text (500 chars, 50 overlap)
           └─> OllamaEmbeddings generates vectors (nomic-embed-text)
               └─> QdrantVectorStore.fromDocuments creates collection & inserts
                   └─> Worker logs "Documents added"

3. User asks question in RAG Chatbot
   └─> Question sent to aiChatbotRoute
       └─> Query embedded using Ollama
           └─> Qdrant search retrieves similar chunks (semantic search)
               └─> Context + Query sent to Ollama LLM
                   └─> Response streamed back to user
```

#### Example 2: Client Authentication Flow
```
1. User signs up
   └─> authClientRoute /register receives credentials
       └─> authClientController validates input
           └─> Password hashed with bcrypt
               └─> User inserted into MySQL
                   └─> JWT token generated & returned

2. User logs in
   └─> authClientRoute /login receives credentials
       └─> Password verified against bcrypt hash
           └─> JWT token generated
               └─> Stored in browser (cookie/localStorage)

3. Subsequent API calls
   └─> authMiddleware extracts JWT from headers
       └─> Verifies signature & expiry
           └─> Attaches user info to request
               └─> Route handler processes authenticated request
```

### Technology Interaction Map

| Feature | Frontend | Backend | Database | AI Service |
|---------|----------|---------|----------|-----------|
| Client Auth | React Forms | Express Routes + JWT | MySQL Users | N/A |
| AI Chat | TextArea Input | Ollama Service | Redis (history) | Ollama LLM |
| RAG Chat | Upload + Chat | PDFLoader + Queue | Qdrant (vectors) | Ollama Embeddings + LLM |
| Forum | React Components | Express CRUD | MySQL Posts | N/A |
| Dashboard | Client Pages | Dashboard Controller | MySQL Data | N/A |

---

## Usage Instructions

### For End Users

#### 1. Getting Started
- Visit `http://localhost:5173`
- Sign up as Client or Counselor
- Complete profile setup

#### 2. As a Client
1. **Find a Counselor**
   - Navigate to "Counsellors" tab in dashboard
   - Browse available counselors
   - Click "Book Appointment"

2. **Chat with AI**
   - Click "AI Chatbot" in navigation
   - Type your question or concern
   - Get immediate AI support

3. **Use RAG Chatbot**
   - Click "RAG Chatbot"
   - Upload a PDF or use existing knowledge base
   - Ask questions about uploaded documents

4. **Join Forum**
   - Click "Forum" in navigation
   - Ask questions or answer others
   - Build community support

#### 3. As a Counselor
1. **View Dashboard**
   - See scheduled appointments
   - View assigned clients
   - Track analytics and progress

2. **Manage Clients**
   - Access client profiles
   - Update session notes
   - Track treatment plans

---

## API Endpoints

### Authentication Routes

#### Client Authentication
```
POST /api/register-client
Request: { email, password, name, phone }
Response: { token, userId, role }

POST /api/login-client
Request: { email, password }
Response: { token, userId, role }
```

#### Counselor Authentication
```
POST /api/register-counselor
Request: { email, password, name, license_number, specialization }
Response: { token, userId, role }

POST /api/login-counselor
Request: { email, password }
Response: { token, userId, role }
```

### Dashboard Routes
```
GET /api/client-dashboard
Headers: { Authorization: Bearer <token> }
Response: { appointments, recentActivity, stats }

GET /api/counselor-dashboard
Headers: { Authorization: Bearer <token> }
Response: { clients, appointments, analytics }
```

### AI Chatbot Routes
```
POST /api/chat
Request: { message, sessionId }
Headers: { Authorization: Bearer <token> }
Response: { reply, sessionId, timestamp }
```

### PDF Upload Routes
```
POST /api/upload-pdf
Content-Type: multipart/form-data
Files: { pdf_file }
Headers: { Authorization: Bearer <token> }
Response: { jobId, status, message }
```

---

## Database Schema

### Core Tables

#### users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('client', 'counselor') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### clients
```sql
CREATE TABLE clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  medical_history TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### counselors
```sql
CREATE TABLE counselors (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT UNIQUE NOT NULL,
  license_number VARCHAR(100) UNIQUE,
  specialization VARCHAR(255),
  bio TEXT,
  hourly_rate DECIMAL(10, 2),
  is_available BOOLEAN DEFAULT true,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### appointments
```sql
CREATE TABLE appointments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  client_id INT NOT NULL,
  counselor_id INT NOT NULL,
  scheduled_at DATETIME NOT NULL,
  duration_minutes INT,
  notes TEXT,
  status ENUM('scheduled', 'completed', 'cancelled'),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (client_id) REFERENCES clients(id),
  FOREIGN KEY (counselor_id) REFERENCES counselors(id)
);
```

#### forum_posts
```sql
CREATE TABLE forum_posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

#### forum_answers
```sql
CREATE TABLE forum_answers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_id INT NOT NULL,
  content TEXT NOT NULL,
  upvotes INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES forum_posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

### Vector Database (Qdrant)

**Collection Name**: `pdf-docs`

**Schema**:
```json
{
  "vectors": {
    "size": 384,
    "distance": "Cosine"
  },
  "payload": {
    "text": "string",
    "source": "string",
    "page": "integer",
    "chunk_index": "integer"
  }
}
```

---

## Deployment Guide

### Docker Deployment

#### Build Images
```bash
# Backend
cd Backend
docker build -t mindconnect-backend .

# Frontend
cd Frontend
docker build -t mindconnect-frontend .
```

#### Docker Compose for Production
```yaml
version: "3.9"
services:
  backend:
    image: mindconnect-backend
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      DB_HOST: mysql
    depends_on:
      - mysql
      - redis
      - qdrant
  
  frontend:
    image: mindconnect-frontend
    ports:
      - "3000:3000"
  
  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: mindconnect_db
    volumes:
      - mysql-data:/var/lib/mysql
  
  redis:
    image: valkey/valkey:latest
    ports:
      - "6379:6379"
  
  qdrant:
    image: qdrant/qdrant:latest
    ports:
      - "6333:6333"
    volumes:
      - qdrant-data:/qdrant/storage

volumes:
  mysql-data:
  qdrant-data:
```

#### Deploy
```bash
docker compose -f docker-compose.prod.yml up -d
```

---

## Contributing Guidelines

### Code Standards
- Follow ES6+ JavaScript conventions
- Use meaningful variable and function names
- Comment complex logic
- Maximum line length: 100 characters

### Git Workflow
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "feat: add your feature description"

# Push to remote
git push origin feature/your-feature-name

# Create pull request
```

### Before Submitting PR
- [ ] Code is linted (`npm run lint`)
- [ ] Tests pass (if applicable)
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Commits are descriptive

### File Naming Conventions
- **Components**: PascalCase (`UserProfile.jsx`)
- **Utilities**: camelCase (`userUtils.js`)
- **Routes**: camelCase (`userRoute.js`)
- **Databases**: snake_case (tables and columns)

---

## Troubleshooting

### Common Issues

#### 1. Qdrant Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:6333
```
**Solution**:
```bash
# Check if Qdrant is running
docker ps | grep qdrant

# If not, start it
docker compose up -d qdrant
```

#### 2. Ollama Model Not Found
```
Error: model llama3:8b not found
```
**Solution**:
```bash
# Pull the required models
ollama pull llama3:8b
ollama pull nomic-embed-text
```

#### 3. Database Connection Failed
```
Error: connect ECONNREFUSED 127.0.0.1:3306
```
**Solution**:
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists: `CREATE DATABASE mindconnect_db;`

#### 4. Worker Job Stuck
```
[nodemon] app crashed - waiting for file changes
```
**Solution**:
```bash
# Check Ollama is running and responsive
curl http://localhost:11434/api/tags

# Check Qdrant connection
curl http://localhost:6333/health

# Restart worker with debug logging
npm run worker
```

#### 5. JWT Authentication Error
```
Error: Invalid token
```
**Solution**:
- Clear localStorage and re-login
- Check token expiry in `.env` (JWT_EXPIRY)
- Verify JWT_SECRET matches frontend and backend

#### 6. CORS Errors
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution**:
```javascript
// In Backend/app.js, update CORS origin
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

### Performance Optimization

#### For RAG Chatbot
- Reduce chunk size to 300 for more granular retrieval
- Increase chunk overlap to 100 for better context
- Use batch processing for large documents

#### For Database
- Add indexes on frequently queried columns
- Implement caching for user sessions with Redis
- Use connection pooling

#### For Frontend
- Enable code splitting in Vite
- Lazy load components with React.lazy()
- Optimize images

---

## Future Features & Roadmap

### Planned Features (Q1-Q2 2026)
- [ ] **Video Consultation**: WebRTC integration for video calls
- [ ] **Mobile App**: React Native mobile application
- [ ] **Advanced Analytics**: ML-based progress tracking
- [ ] **Appointment Reminders**: Email/SMS notifications
- [ ] **Prescription Management**: Digital prescription handling
- [ ] **Insurance Integration**: Direct insurance billing
- [ ] **Multi-language Support**: i18n integration
- [ ] **Advanced Search**: Full-text search for forum
- [ ] **Real-time Notifications**: WebSocket integration
- [ ] **Export Reports**: PDF/Excel report generation

### Technical Improvements
- [ ] Implement comprehensive testing (Jest + React Testing Library)
- [ ] Add GraphQL API layer
- [ ] Implement service worker for offline support
- [ ] Add API rate limiting and request throttling
- [ ] Implement advanced logging and monitoring
- [ ] Add database migrations framework
- [ ] Implement API versioning

---

## Contact & Credits

### Project Lead
**Aditya Kurhade**
- GitHub: [@aditya-kurhade](https://github.com/aditya-kurhade)
- Email: contact@aditya-kurhade.com

### Repository
[MindConnect-2.O on GitHub](https://github.com/aditya-kurhade/MindConnect-2.O)

### License
This project is licensed under the ISC License.

### Acknowledgments
- Thanks to the open-source community
- Ollama for providing local LLM capabilities
- Qdrant for vector database excellence
- LangChain for RAG framework

---

## Support

For issues, questions, or suggestions:
1. Check [Troubleshooting](#troubleshooting) section
2. Search existing GitHub issues
3. Create a new issue with detailed description
4. Join our community forum for discussions

---

**Last Updated**: January 28, 2026  
**Version**: 2.0.0  
**Status**: Active Development
