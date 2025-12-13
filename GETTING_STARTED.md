# Getting Started with Sweet Shop Management System

This guide will help you set up and run the Sweet Shop Management System on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **PostgreSQL** (v14 or higher) - [Download here](https://www.postgresql.org/download/)
  - OR **Docker** and **Docker Compose** (easier option)

## Quick Start (Recommended)

### Option 1: Using Automated Setup Script (Windows)

```powershell
# Run the setup script
.\setup.ps1
```

This will:
- Install all backend and frontend dependencies
- Create `.env` files from examples
- Verify prerequisites

### Option 2: Manual Setup

#### Step 1: Install Backend Dependencies

```bash
cd backend
npm install
```

#### Step 2: Configure Backend Environment

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Update the `.env` file with your database credentials if needed.

#### Step 3: Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

#### Step 4: Configure Frontend Environment

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

## Running the Application

### Option A: Using Docker (Easiest)

```bash
# Start all services (database, backend, frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

After starting, access:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api

### Option B: Manual Start

#### 1. Start PostgreSQL Database

Ensure PostgreSQL is running and create a database:

```sql
CREATE DATABASE sweet_shop;
```

#### 2. Start Backend Server

```bash
cd backend
npm run start:dev
```

The backend will be available at http://localhost:3001/api

#### 3. Start Frontend Application

In a new terminal:

```bash
cd frontend
npm start
```

The frontend will open automatically at http://localhost:3000

## Testing the Application

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run tests with coverage
npm run test:cov
```

## Creating Your First Admin User

1. Navigate to http://localhost:3000
2. Click on "Sign up"
3. Fill in the registration form
4. To make a user admin, connect to your PostgreSQL database:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Project Structure

```
sweet-shop-system/
├── backend/                 # NestJS backend
│   ├── src/
│   │   ├── auth/           # Authentication module
│   │   ├── users/          # Users module
│   │   ├── sweets/         # Sweets module
│   │   └── config/         # Configuration
│   ├── test/               # E2E tests
│   └── package.json
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React context (Auth)
│   │   ├── services/       # API services
│   │   └── types/          # TypeScript types
│   └── package.json
├── docker-compose.yml       # Docker configuration
└── README.md
```

## Common Issues & Solutions

### Issue: Port Already in Use

**Solution:** Change the ports in docker-compose.yml or .env files

### Issue: Database Connection Failed

**Solution:** 
1. Ensure PostgreSQL is running
2. Check database credentials in backend/.env
3. Verify the database exists

### Issue: Frontend Can't Connect to Backend

**Solution:** 
1. Ensure backend is running on port 3001
2. Check REACT_APP_API_URL in frontend/.env

## Development Workflow

### Running in Development Mode

Backend with hot-reload:
```bash
cd backend
npm run start:dev
```

Frontend with hot-reload:
```bash
cd frontend
npm start
```

### Building for Production

Backend:
```bash
cd backend
npm run build
npm run start:prod
```

Frontend:
```bash
cd frontend
npm run build
# Serve the build folder
```

## API Documentation

Once the backend is running, you can test the API endpoints:

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login

### Sweets (Protected)
- GET /api/sweets - Get all sweets
- GET /api/sweets/search - Search sweets
- GET /api/sweets/:id - Get sweet by ID
- POST /api/sweets - Create sweet (Admin only)
- PUT /api/sweets/:id - Update sweet (Admin only)
- DELETE /api/sweets/:id - Delete sweet (Admin only)
- POST /api/sweets/:id/purchase - Purchase sweet
- POST /api/sweets/:id/restock - Restock sweet (Admin only)

## Next Steps

1. ✅ Complete the application setup
2. ✅ Create an admin user
3. ✅ Add some sweets to the inventory
4. ✅ Test the purchase functionality
5. ✅ Run all tests to ensure everything works
6. ✅ Review the codebase to understand the TDD approach

## Support

If you encounter any issues:

1. Check the logs:
   - Backend: Terminal running the backend server
   - Frontend: Browser console
   - Docker: `docker-compose logs`

2. Verify all prerequisites are installed correctly

3. Ensure all environment variables are set properly

## Contributing

This project follows Test-Driven Development (TDD) principles. When adding new features:

1. Write tests first (Red)
2. Implement the feature (Green)
3. Refactor as needed (Refactor)

Happy coding! 🍬
