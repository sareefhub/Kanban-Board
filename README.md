# Kanban Board - Simplified

A clean and simple Kanban board application with React frontend and FastAPI backend.

## Features

- 🔐 User authentication (Login/Register)
- 📋 Drag & drop task management
- 🏷️ Task priorities (High, Medium, Low)
- 📝 Task creation and deletion
- 🎨 Clean, responsive UI

## Quick Start

1. **Start the application:**
\`\`\`bash
make build
make up
\`\`\`

2. **Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:8000

3. **Stop:**
\`\`\`bash
make down
\`\`\`

## Tech Stack

- **Frontend:** React, TypeScript, CSS
- **Backend:** FastAPI, SQLAlchemy, PostgreSQL
- **Infrastructure:** Docker, Docker Compose

## Development

\`\`\`bash
# Backend only
cd server && uvicorn main:app --reload

# Frontend only  
cd client && npm start
\`\`\`

Simple, clean, and functional! 🚀
