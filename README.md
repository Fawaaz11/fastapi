# Full-Stack Application

A production-ready web application built with React.js frontend and FastAPI backend, fully containerized and deployment-ready.

## Architecture

- **Frontend**: React.js with TypeScript, Vite, and Tailwind CSS
- **Backend**: FastAPI with async PostgreSQL
- **Database**: PostgreSQL with Alembic migrations
- **Reverse Proxy**: Traefik with automatic HTTPS
- **Containerization**: Docker and Docker Compose
- **CI/CD**: GitHub Actions

## Quick Start

### Development

1. Clone the repository
2. Run with Docker Compose:
   ```bash
   docker-compose up -d
   ```
3. Access the application at `https://localhost`

### Local Development

#### Frontend
```bash
cd frontend
npm install
npm run dev
```

#### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Services

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **Traefik Dashboard**: http://localhost:8080
- **PostgreSQL**: localhost:5432

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Database
POSTGRES_USER=appuser
POSTGRES_PASSWORD=apppassword
POSTGRES_DB=appdb

# JWT
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# Environment
ENVIRONMENT=development
```

## Deployment

The application is configured for deployment to:
- AWS ECS
- Google Cloud Run
- Azure Container Instances
- Any Docker-compatible platform

See `docs/deployment.md` for detailed instructions.