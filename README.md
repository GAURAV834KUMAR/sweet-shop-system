# Sweet Shop Management System 🍬

A modern, full-stack e-commerce application for managing a sweet shop, built with **Test-Driven Development (TDD)** principles and cutting-edge technologies. Features a beautiful, responsive UI with real-time inventory management and role-based access control.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?logo=postgresql&logoColor=white)

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://sweet-shop-system.netlify.app)
[![Backend API](https://img.shields.io/badge/api-deployed-blue)](https://sweet-shop-system.onrender.com/api)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Testing](#-testing)
- [API Documentation](#-api-documentation)
- [My AI Usage](#-my-ai-usage)
- [Project Structure](#-project-structure)
- [Development Workflow](#-development-workflow)
- [Deployment](#-deployment)
- [Security Features](#-security-features)
- [Author](#-author)

---

## ✨ Features

### 👥 User Management
- ✅ Secure user registration with email validation
- ✅ JWT-based authentication with password hashing (bcrypt)
- ✅ Role-based access control (User/Admin)
- ✅ Persistent login sessions with token refresh

### 🍭 Sweet Shop Features (User)
- ✅ Browse beautiful product catalog with gradient card design
- ✅ Advanced search and filtering (by name, category, price range)
- ✅ Real-time stock availability indicators
- ✅ One-click purchase with instant inventory updates
- ✅ Purchase notifications with toast messages
- ✅ Sweet detail modal with animations
- ✅ Responsive design for mobile, tablet, and desktop
- ✅ Smooth animations and transitions

### 🛠️ Admin Features
- ✅ Complete CRUD operations for sweet inventory
- ✅ Add new sweets with detailed information
- ✅ Update product details (name, price, category, quantity)
- ✅ Delete products from inventory
- ✅ Bulk restocking functionality
- ✅ Admin-only route protection
- ✅ Dedicated admin panel interface

### 🎨 UI/UX Highlights
- ✅ Modern gradient design (purple/pink themes)
- ✅ Glassmorphism effects and shadows
- ✅ Interactive hover effects and transforms
- ✅ Loading states with spinners
- ✅ Toast notifications for user feedback
- ✅ Smooth page transitions
- ✅ Responsive navigation
- ✅ Statistics cards on dashboard
- ✅ Beautiful modal dialogs

---

## 🚀 Tech Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **NestJS** | Progressive Node.js framework | ^10.0.0 |
| **TypeScript** | Type-safe development | ^5.1.3 |
| **PostgreSQL** | Relational database | 14+ |
| **TypeORM** | Object-Relational Mapping | ^10.0.1 |
| **JWT** | JSON Web Token authentication | ^10.2.0 |
| **Passport** | Authentication middleware | ^0.7.0 |
| **Jest** | Testing framework | ^29.5.0 |
| **bcryptjs** | Password hashing | ^3.0.3 |
| **class-validator** | DTO validation | ^0.14.0 |
| **class-transformer** | Object transformation | ^0.5.1 |

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | ^18.2.0 |
| **TypeScript** | Type safety | ^4.9.5 |
| **Tailwind CSS** | Utility-first styling | ^3.3.6 |
| **React Router** | Client-side routing | ^6.20.0 |
| **Axios** | HTTP client | ^1.6.2 |
| **React Toastify** | Toast notifications | ^11.0.5 |
| **React Testing Library** | Component testing | ^13.4.0 |

### DevOps & Tools
- **Docker** & **Docker Compose** - Containerization
- **GitHub Actions** - CI/CD pipeline
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Render.com** - Backend hosting
- **Netlify** - Frontend hosting

---

## 📸 Screenshots

### 🏠 User Dashboard

#### Sweet Catalog - View 1
![Dashboard 1](./screenshots/dashboard1.png)
*Beautiful product grid with gradient cards and search functionality*

#### Sweet Catalog - View 2
![Dashboard 2](./screenshots/dashboard2.png)
*Product catalog with statistics cards and real-time stock indicators*

#### Sweet Detail Modal
![Sweet Details](./screenshots/sweetDetails.png)
*Detailed sweet information modal with purchase functionality and animations*

### 🛠️ Admin Panel

#### Admin Dashboard - View 1
![Admin Panel 1](./screenshots/admin-panel.png)
*Comprehensive admin dashboard with inventory overview*

#### Admin Dashboard - View 2
![Admin Panel 2](./screenshots/admin-panel2.png)
*Admin inventory management with CRUD operations*

#### Add New Sweet
![Add Sweet](./screenshots/add-sweet.png)
*Product creation modal with form validation*

---


## 🛠️ Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v8 or higher)
- **PostgreSQL** (v14 or higher) - [Download](https://www.postgresql.org/download/)
- **Git** - [Download](https://git-scm.com/downloads)
- **Docker** & **Docker Compose** (optional) - [Download](https://www.docker.com/products/docker-desktop/)

---

## 📦 Installation & Setup

### Option 1: Using Docker (Recommended) 🐳

This is the fastest way to get the application running.

1. **Clone the repository**
   ```bash
   git clone https://github.com/GAURAV834KUMAR/sweet-shop-system.git
   cd sweet-shop-system
   ```

2. **Start all services**
   ```bash
   docker-compose up -d
   ```

3. **Wait for services to initialize** (approximately 30 seconds)
   ```bash
   docker-compose logs -f
   ```

4. **Access the application**
   - 🌐 **Frontend**: http://localhost:3000
   - 🔧 **Backend API**: http://localhost:3001/api
   - 🗄️ **PostgreSQL**: localhost:5432

5. **Stop containers**
   ```bash
   docker-compose down
   ```

### Option 2: Manual Setup 🔧

#### Step 1: Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the backend directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=sweet_shop
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Application
   PORT=3001
   NODE_ENV=development
   
   # CORS (for frontend)
   CORS_ORIGIN=http://localhost:3000
   ```

4. **Create PostgreSQL database**
   ```bash
   # Using psql
   psql -U postgres
   CREATE DATABASE sweet_shop;
   \q
   
   # Or using createdb command
   createdb -U postgres sweet_shop
   ```

5. **Start the backend server**
   ```bash
   # Development mode with hot-reload
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

   ✅ Backend should now be running on http://localhost:3001

#### Step 2: Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_API_URL=http://localhost:3001/api
   ```

4. **Start the frontend development server**
   ```bash
   npm start
   ```

   ✅ Frontend should now be running on http://localhost:3000

5. **Access the application**
   
   Open http://localhost:3000 in your browser

### 🎯 Quick Start Guide

1. **Register a new account** at http://localhost:3000/register
2. **Login** with your credentials
3. **Browse sweets** on the dashboard
4. **Test purchase** functionality (stock updates in real-time)
5. **Make user admin** (see [Creating Admin Users](#-creating-admin-users) below)
6. **Access admin panel** at http://localhost:3000/admin

### 🔑 Demo Admin Account

For testing purposes, you can use the following admin credentials:

```
Email: test@gmail.com
Password: 12345678
```

**Note**: This demo account has full admin privileges and can manage inventory.

---

## 🧪 Testing

This project follows **Test-Driven Development (TDD)** with comprehensive test coverage.

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage report
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run tests in watch mode (for development)
npm run test:watch

# Run specific test file
npm test -- auth.service.spec.ts
```

**Test Coverage:**
- ✅ Auth Service (registration, login, JWT)
- ✅ Users Service (CRUD operations)
- ✅ Sweets Service (inventory management)
- ✅ All DTOs and validation
- ✅ Guards and strategies

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in interactive watch mode
npm test

# Run specific test
npm test -- SweetCard.test.tsx
```

**Test Coverage:**
- ✅ Component rendering tests
- ✅ User interaction tests
- ✅ API integration tests
- ✅ Route protection tests

### Test Reports

After running tests with coverage, reports are generated in `coverage/` directory.

---


## 📚 API Documentation

### Base URL
```
Development: http://localhost:3001/api
Production: https://sweet-shop-system.onrender.com/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}

Response (201 Created):
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

Request Body:
{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}

Response (200 OK):
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "user"
  }
}
```

### Sweets Endpoints

**Note:** All endpoints require JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

#### 3. Get All Sweets
```http
GET /api/sweets
Authorization: Bearer <token>

Response (200 OK):
[
  {
    "id": "uuid",
    "name": "Chocolate Bar",
    "category": "Chocolate",
    "price": "2.99",
    "quantity": 100,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

#### 4. Search Sweets
```http
GET /api/sweets/search?name=chocolate&category=candy&minPrice=1&maxPrice=10
Authorization: Bearer <token>

Query Parameters:
- name (optional): Search by sweet name
- category (optional): Filter by category
- minPrice (optional): Minimum price filter
- maxPrice (optional): Maximum price filter

Response (200 OK):
[
  {
    "id": "uuid",
    "name": "Chocolate Candy",
    "category": "Candy",
    "price": "1.99",
    "quantity": 50
  }
]
```

#### 5. Get Sweet by ID
```http
GET /api/sweets/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "id": "uuid",
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": "2.99",
  "quantity": 100
}
```

#### 6. Add Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": 2.99,
  "quantity": 100
}

Response (201 Created):
{
  "id": "uuid",
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": "2.99",
  "quantity": 100,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

#### 7. Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <token>
Content-Type: application/json

Request Body (all fields optional):
{
  "name": "Dark Chocolate Bar",
  "price": 3.49,
  "quantity": 150
}

Response (200 OK):
{
  "id": "uuid",
  "name": "Dark Chocolate Bar",
  "category": "Chocolate",
  "price": "3.49",
  "quantity": 150,
  "updatedAt": "2024-01-15T11:00:00Z"
}
```

#### 8. Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <token>

Response (200 OK):
{
  "message": "Sweet deleted successfully"
}
```

### Inventory Endpoints

#### 9. Purchase Sweet
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "quantity": 2
}

Response (200 OK):
{
  "id": "uuid",
  "sweet": {...},
  "quantity": 2,
  "totalPrice": "5.98",
  "user": {...},
  "createdAt": "2024-01-15T12:00:00Z"
}
```

#### 10. Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <token>
Content-Type: application/json

Request Body:
{
  "quantity": 50
}

Response (200 OK):
{
  "id": "uuid",
  "name": "Chocolate Bar",
  "quantity": 150,
  "message": "Restock successful"
}
```

### Error Responses

```json
// 400 Bad Request
{
  "statusCode": 400,
  "message": ["price must be a positive number"],
  "error": "Bad Request"
}

// 401 Unauthorized
{
  "statusCode": 401,
  "message": "Unauthorized"
}

// 403 Forbidden (Admin required)
{
  "statusCode": 403,
  "message": "Forbidden resource"
}

// 404 Not Found
{
  "statusCode": 404,
  "message": "Sweet not found"
}

// 500 Internal Server Error
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

---


## 🤖 My AI Usage

### AI Tools Used

Throughout the development of this project, I leveraged **GitHub Copilot** as my primary AI assistant for code completion and suggestions.

### How I Used AI

#### 1. **Code Generation & Boilerplate**
- **Tool Used**: GitHub Copilot
- **Usage**: Generated initial module structures, DTOs, and controller templates in NestJS
- **Example**: When creating entities and services, Copilot suggested standard CRUD patterns which I customized
- **Impact**: Reduced boilerplate code writing time by approximately 30-40%

#### 2. **Test-Driven Development (TDD)**
- **Tool Used**: GitHub Copilot
- **Usage**: 
  - Generated test skeletons for services and controllers
  - Suggested edge cases for testing
  - Helped structure Jest test suites
- **Manual Work**: Wrote actual test assertions and business logic validation myself
- **Result**: Achieved comprehensive test coverage while maintaining quality

#### 3. **TypeScript Type Definitions**
- **Tool Used**: GitHub Copilot
- **Usage**: Created complex TypeScript interfaces and DTOs
- **Example**: DTO validation schemas with class-validator decorators
- **Review**: Manually reviewed all type definitions for correctness

#### 4. **Frontend Component Structure**
- **Tool Used**: GitHub Copilot
- **Usage**:
  - Generated React component boilerplate
  - Suggested TypeScript props and state management patterns
  - Helped with Tailwind CSS class combinations
- **Customization**: Heavily customized the UI/UX, animations, and gradient designs myself

#### 5. **Error Handling Patterns**
- **Tool Used**: GitHub Copilot
- **Usage**: Suggested NestJS exception handling and try-catch patterns
- **Implementation**: Implemented comprehensive error handling with proper HTTP status codes

#### 6. **API Documentation**
- **Tool Used**: GitHub Copilot
- **Usage**: Generated JSDoc comments and initial API endpoint documentation
- **Enhancement**: Expanded and refined documentation with real examples

### Specific Examples of AI-Assisted Code

#### Example 1: Sweet Service Structure
```typescript
// Copilot suggested the basic CRUD structure
// I added custom business logic for inventory management
@Injectable()
export class SweetsService {
  constructor(
    @InjectRepository(Sweet)
    private readonly sweetsRepository: Repository<Sweet>,
  ) {}
  
  // Copilot: basic create method
  // Manual: added validation and error handling
  async create(createSweetDto: CreateSweetDto): Promise<Sweet> {
    const sweet = this.sweetsRepository.create(createSweetDto);
    return await this.sweetsRepository.save(sweet);
  }
}
```

#### Example 2: React Component
```typescript
// Copilot: basic component structure
// Manual: gradient designs, animations, toast notifications
export function SweetCard({ sweet, onPurchase }: SweetCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg">
      {/* Custom UI implementation */}
    </div>
  );
}
```

### Reflection on AI Impact

#### ✅ Positive Impacts

1. **Accelerated Development**
   - Reduced time spent on repetitive boilerplate code
   - Faster prototyping of components and services
   - Quick generation of test structures

2. **Code Quality**
   - Helped maintain consistent naming conventions
   - Suggested TypeScript best practices
   - Identified potential null/undefined issues early

3. **Learning Experience**
   - Exposed to NestJS patterns I wasn't familiar with
   - Learned modern React patterns and hooks
   - Discovered Tailwind CSS utility combinations

4. **Testing Coverage**
   - AI helped identify edge cases to test
   - Generated comprehensive test templates
   - Maintained high test coverage

#### ⚠️ Challenges & Learnings

1. **Critical Review Required**
   - **Learning**: AI suggestions needed careful review and often modification
   - **Example**: Copilot suggested complex patterns when simple ones sufficed
   - **Solution**: Applied YAGNI (You Aren't Gonna Need It) principle

2. **Business Logic**
   - **Challenge**: AI couldn't understand specific business requirements
   - **Example**: Stock management logic and purchase validation rules
   - **Approach**: Used AI for structure, wrote business logic manually

3. **Security Considerations**
   - **Critical**: Never trusted AI blindly for security-critical code
   - **Manual Review**: Thoroughly reviewed authentication, authorization, and password hashing
   - **Result**: Implemented secure patterns with bcrypt and JWT best practices

4. **UI/UX Design**
   - **Observation**: AI provided basic structure but not creative design
   - **Solution**: Used Copilot for Tailwind classes, but designed the modern UI myself
   - **Result**: Created unique gradient themes and glassmorphism effects

5. **Context Limitations**
   - **Issue**: AI sometimes lacked full project context
   - **Example**: Suggested global state when local state was appropriate
   - **Mitigation**: Provided clear comments and reviewed integration points

#### 📊 Productivity Metrics

- **Time Saved**: Estimated 25-30% reduction in total development time
- **Code Generated with AI**: ~20-25% had AI assistance (with manual review)
- **Test Coverage**: Achieved 90%+ with AI-assisted test generation
- **Bugs Prevented**: AI caught ~10-12 potential issues during development

#### 🎓 Key Takeaways

1. **AI as an Assistant**: Best results came from treating AI as a junior developer - giving clear direction and reviewing all output

2. **Domain Knowledge Essential**: Understanding architecture, business logic, and best practices remained crucial

3. **Testing Requires Judgment**: While AI helped structure tests, knowing what and how to test required human expertise

4. **Security Cannot Be Delegated**: All security-related code required manual implementation and review

5. **Creative Work Is Human**: UI/UX design, user experience, and product decisions were entirely human-driven

#### 🔮 Future AI Usage

For future projects, I would:
- Use AI earlier in the planning phase
- Develop project-specific prompts and conventions
- Leverage AI for code refactoring suggestions
- Explore AI for performance optimization insights
- Continue manual oversight for critical functionality

### Transparency Note

This project represents a collaboration between human expertise and AI assistance. I maintained full responsibility for:
- Architecture and design decisions
- Business logic implementation
- Security measures
- User experience design
- Code quality and testing
- Final product delivery

AI tools accelerated development but didn't replace critical thinking, problem-solving, or software engineering expertise.

---

## 📁 Project Structure

```
sweet-shop-system/
├── backend/                      # NestJS Backend
│   ├── src/
│   │   ├── auth/                # Authentication module
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.service.spec.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/             # Data Transfer Objects
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── decorators/      # Custom decorators
│   │   │   │   └── roles.decorator.ts
│   │   │   ├── guards/          # JWT & Role guards
│   │   │   │   ├── jwt-auth.guard.ts
│   │   │   │   └── roles.guard.ts
│   │   │   └── strategies/      # Passport strategies
│   │   │       ├── jwt.strategy.ts
│   │   │       └── local.strategy.ts
│   │   ├── sweets/              # Sweets module
│   │   │   ├── sweets.controller.ts
│   │   │   ├── sweets.service.ts
│   │   │   ├── sweets.service.spec.ts
│   │   │   ├── sweets.module.ts
│   │   │   ├── entities/        # TypeORM entities
│   │   │   │   └── sweet.entity.ts
│   │   │   └── dto/
│   │   │       ├── create-sweet.dto.ts
│   │   │       ├── update-sweet.dto.ts
│   │   │       ├── search-sweet.dto.ts
│   │   │       ├── purchase-sweet.dto.ts
│   │   │       └── restock-sweet.dto.ts
│   │   ├── users/               # Users module
│   │   │   ├── users.service.ts
│   │   │   ├── users.service.spec.ts
│   │   │   ├── users.module.ts
│   │   │   ├── entities/
│   │   │   │   └── user.entity.ts
│   │   │   └── dto/
│   │   │       └── create-user.dto.ts
│   │   ├── purchases/           # Purchase history module
│   │   │   ├── purchases.controller.ts
│   │   │   ├── purchases.service.ts
│   │   │   ├── purchases.module.ts
│   │   │   └── entities/
│   │   │       └── purchase.entity.ts
│   │   ├── config/              # Configuration
│   │   │   └── typeorm.config.ts
│   │   ├── app.module.ts
│   │   └── main.ts              # Application entry point
│   ├── test/                    # E2E tests
│   │   └── jest-e2e.json
│   ├── Dockerfile
│   ├── .env.example
│   ├── nest-cli.json
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/                     # React Frontend
│   ├── src/
│   │   ├── components/          # Reusable components
│   │   │   ├── Layout.tsx       # App layout wrapper
│   │   │   ├── PrivateRoute.tsx # Route protection
│   │   │   ├── SweetCard.tsx    # Product card component
│   │   │   ├── SweetCard.test.tsx
│   │   │   └── SweetDetailModal.tsx  # Product detail modal
│   │   ├── pages/               # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Login.test.tsx
│   │   │   ├── Register.tsx
│   │   │   ├── Dashboard.tsx    # Main user dashboard
│   │   │   ├── Profile.tsx      # User profile page
│   │   │   └── AdminPanel.tsx   # Admin management
│   │   ├── context/             # React Context
│   │   │   └── AuthContext.tsx  # Authentication state
│   │   ├── services/            # API services
│   │   │   └── api.ts           # Axios instance & endpoints
│   │   ├── types/               # TypeScript types
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   ├── App.test.tsx
│   │   ├── main.tsx
│   │   ├── setupTests.ts
│   │   └── index.css            # Global styles + Tailwind
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── Dockerfile
│   ├── .env.example
│   ├── .env.production
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── tsconfig.json
│   └── package.json
│
├── screenshots/                  # Application screenshots
├── docker-compose.yml            # Docker orchestration
├── .github/
│   └── workflows/               # CI/CD pipelines
│       ├── backend-ci.yml       # Backend tests
│       └── frontend-ci.yml      # Frontend tests
├── netlify.toml                 # Netlify config
├── make-admin.ps1               # Admin creation script (Windows)
├── make-admin.sh                # Admin creation script (Linux/Mac)
└── README.md                    # This file
```

---

## 📝 Development Workflow

This project follows **Test-Driven Development (TDD)** principles:

### TDD Cycle

1. **🔴 Red**: Write a failing test first
   ```typescript
   it('should create a sweet with valid data', async () => {
     const result = await service.create(validSweetDto);
     expect(result).toBeDefined();
     // Test fails initially
   });
   ```

2. **🟢 Green**: Write minimal code to make the test pass
   ```typescript
   async create(createSweetDto: CreateSweetDto): Promise<Sweet> {
     const sweet = this.sweetsRepository.create(createSweetDto);
     return await this.sweetsRepository.save(sweet);
   }
   ```

3. **🔵 Refactor**: Improve code while keeping tests green
   ```typescript
   async create(createSweetDto: CreateSweetDto): Promise<Sweet> {
     // Added validation
     this.validateSweetData(createSweetDto);
     
     // Added error handling
     try {
       const sweet = this.sweetsRepository.create(createSweetDto);
       return await this.sweetsRepository.save(sweet);
     } catch (error) {
       throw new BadRequestException('Failed to create sweet');
     }
   }
   ```

### Git Workflow

View the commit history to see clear development patterns:

```bash
git log --oneline --graph
```

---

## 🚀 Deployment

### Production Deployment (Current)

**Frontend**: Deployed on Netlify  
**Live URL**: https://sweet-shop-system.netlify.app

**Backend**: Deployed on Render.com  
**API URL**: https://sweet-shop-system.onrender.com/api

**Database**: PostgreSQL on Render

### Backend Deployment (Render.com)

1. **Create PostgreSQL Database**
   - Go to Render Dashboard → New → PostgreSQL
   - Database Name: `sweet-shop-db`
   - Note the Internal Database URL

2. **Create Web Service**
   - Connect GitHub repository
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`

3. **Environment Variables**
   ```env
   DATABASE_URL=<internal-database-url>
   JWT_SECRET=<your-secret-key>
   CORS_ORIGIN=https://sweet-shop-system.netlify.app
   NODE_ENV=production
   ENABLE_DB_SYNC=true
   ```

4. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete

### Frontend Deployment (Netlify)

1. **Connect GitHub Repository**
   - Go to Netlify → New site from Git
   - Select your repository

2. **Build Settings**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build`

3. **Environment Variables**
   ```env
   REACT_APP_API_URL=https://sweet-shop-system.onrender.com/api
   ```

4. **Deploy**
   - Click "Deploy site"
   - Site will be live at a Netlify URL

### Creating Admin Users

After deployment, create an admin user:

**Option 1: PowerShell Script (Windows)**
```powershell
# Set environment variables
$env:DATABASE_URL = "your-database-url"

# Run script
.\make-admin.ps1 user@example.com
```

**Option 2: Bash Script (Linux/Mac)**
```bash
# Export environment variable
export DATABASE_URL="your-database-url"

# Run script
./make-admin.sh user@example.com
```

**Option 3: Direct SQL (Render Database)**
1. Go to Render Dashboard → Your Database
2. Click "Connect" → "External Connection"
3. Use connection string with any PostgreSQL client
4. Run:
```sql
UPDATE users SET role = 'admin' WHERE email = 'user@example.com';
```

### Local Docker Deployment

```bash
# Build and run
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## 🔒 Security Features

### Implemented Security Measures

✅ **Authentication & Authorization**
- Password hashing with bcryptjs (10 salt rounds)
- JWT tokens with configurable expiration
- Role-based access control (RBAC)
- Protected routes with guards
- Passport local and JWT strategies

✅ **Input Validation**
- DTO validation using class-validator
- Type checking with TypeScript
- Request sanitization
- SQL injection prevention via TypeORM

✅ **API Security**
- CORS configuration with specific origins
- HTTP-only security headers
- Environment variables for secrets

✅ **Data Protection**
- Sensitive data in environment variables
- No secrets in version control
- Secure database connections with SSL

### Security Best Practices

- ✅ Never store passwords in plain text
- ✅ Use strong JWT secrets (minimum 32 characters)
- ✅ Set appropriate token expiration times
- ✅ Validate all user inputs
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated
- ✅ Enable CORS only for trusted origins

---

## 🎯 Environment Variables

### Backend (.env)

```env
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=sweet_shop

# For production (Render, Heroku, etc.)
DATABASE_URL=postgresql://user:password@host:port/database

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Application
PORT=3001
NODE_ENV=development

# CORS
CORS_ORIGIN=http://localhost:3000

# Database synchronization (for initial deployment only)
ENABLE_DB_SYNC=true
```

### Frontend (.env)

```env
# Development
REACT_APP_API_URL=http://localhost:3001/api
```

### Frontend (.env.production)

```env
# Production
REACT_APP_API_URL=https://sweet-shop-system.onrender.com/api
```

---

## 🐛 Troubleshooting

### Common Issues

#### Issue 1: Database Connection Error
```
Error: Unable to connect to database
```
**Solution:**
1. Ensure PostgreSQL is running
2. Check database credentials in `.env`
3. Verify database exists
4. Check firewall settings

#### Issue 2: Port Already in Use
```
Error: Port 3001 is already in use
```
**Solution:**
```bash
# Windows
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

#### Issue 3: JWT Token Expired
```
Error: 401 Unauthorized
```
**Solution:**
- Token has expired, user needs to login again
- Check JWT_EXPIRATION in `.env`
- Clear localStorage and login again

#### Issue 4: CORS Error
```
Error: CORS policy blocked
```
**Solution:**
1. Check CORS_ORIGIN in backend `.env`
2. Ensure frontend URL is whitelisted
3. Verify backend is running

---

## 🤝 Contributing

While this project was created as an assessment, feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Gaurav Kumar**

- 🌐 GitHub: [@GAURAV834KUMAR](https://github.com/GAURAV834KUMAR)
- 📧 Email: gk1011200@gmail.com

---

## 🙏 Acknowledgments

- **NestJS Community** - For excellent documentation and best practices
- **React Team** - For the powerful React library
- **Tailwind CSS** - For the amazing utility framework
- **Render** and **Netlify** - For reliable hosting services
- **GitHub Copilot** - For AI assistance during development

---

## 🎯 Future Enhancements

Potential features for future iterations:

- [ ] Shopping cart functionality
- [ ] Order history tracking
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Product reviews and ratings
- [ ] Image upload for products
- [ ] Dark mode theme
- [ ] Real-time updates with WebSockets
- [ ] Export reports (PDF/Excel)

---

<div align="center">

### ⭐ Star this repository if you found it helpful!

**Built with ❤️ by [Gaurav Kumar](https://github.com/GAURAV834KUMAR)**

</div>

---

**Note:** This project demonstrates modern full-stack development practices including TDD, clean code principles, SOLID design patterns, responsive UI/UX design, and effective use of AI tools in software development.


### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePassword123!"
}
```

### Sweets Endpoints (Protected)

#### Get All Sweets
```http
GET /api/sweets
Authorization: Bearer <token>
```

#### Search Sweets
```http
GET /api/sweets/search?name=chocolate&category=candy&minPrice=1&maxPrice=10
Authorization: Bearer <token>
```

#### Add Sweet (Admin Only)
```http
POST /api/sweets
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Chocolate Bar",
  "category": "Chocolate",
  "price": 2.99,
  "quantity": 100,
  "description": "Delicious milk chocolate bar"
}
```

#### Update Sweet (Admin Only)
```http
PUT /api/sweets/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Dark Chocolate Bar",
  "price": 3.49
}
```

#### Delete Sweet (Admin Only)
```http
DELETE /api/sweets/:id
Authorization: Bearer <token>
```

### Inventory Endpoints (Protected)

#### Purchase Sweet
```http
POST /api/sweets/:id/purchase
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 2
}
```

#### Restock Sweet (Admin Only)
```http
POST /api/sweets/:id/restock
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 50
}
```

## 📸 Screenshots

[Screenshots will be added here after running the application]

## 🤖 My AI Usage

### AI Tools Used

I utilized **GitHub Copilot** throughout this project development to enhance productivity and code quality.

### How I Used AI

1. **Boilerplate Generation**: Used Copilot to generate initial NestJS module structures, service classes, and controller templates, which I then customized to fit specific requirements.

2. **Test Case Generation**: Leveraged Copilot to suggest comprehensive test cases for each module, ensuring edge cases were covered. I manually reviewed and adjusted assertions to match business logic.

3. **TypeScript Type Definitions**: Used Copilot to help create complex TypeScript interfaces and DTOs, especially for request/response validation schemas.

4. **Documentation**: Utilized Copilot for generating JSDoc comments and initial API documentation structure, which I refined for clarity.

5. **Error Handling**: Asked Copilot to suggest proper error handling patterns and HTTP exception responses following NestJS best practices.

6. **React Component Structure**: Used Copilot to scaffold React components with TypeScript props and hooks, then customized the business logic and styling.

### Reflection on AI Impact

**Positive Impacts:**
- **Accelerated Development**: AI helped speed up repetitive tasks like creating similar CRUD endpoints and test structures
- **Code Consistency**: Copilot suggestions helped maintain consistent coding patterns across the project
- **Learning Tool**: Exposed me to NestJS best practices and TypeScript patterns I wasn't previously aware of
- **Reduced Boilerplate**: Significantly reduced time spent writing repetitive code

**Challenges & Learnings:**
- **Critical Review Required**: I learned that AI suggestions need careful review - not all suggestions followed the specific business requirements
- **Testing Logic**: While AI could generate test structures, understanding and implementing proper assertions required manual intervention
- **Architecture Decisions**: High-level architectural decisions and design patterns were my responsibility; AI served as a coding assistant, not an architect
- **Security Considerations**: I had to manually review and enhance security measures, especially around JWT implementation and password hashing

**Overall Assessment:**
AI tools like Copilot are powerful productivity multipliers when used correctly. They excel at reducing boilerplate and suggesting patterns, but the developer must maintain ownership of architecture, business logic, and quality assurance. The combination of AI assistance and human oversight resulted in a well-structured, tested, and maintainable application.

## 🚀 Deployment

### Production Build

#### Backend
```bash
cd backend
npm run build
npm run start:prod
```

#### Frontend
```bash
cd frontend
npm run build
# Serve the build folder using a static server
```

### Docker Deployment

```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

### Environment-Specific Configuration

Ensure you update environment variables for production:
- Use strong, randomly generated JWT secrets
- Configure proper database credentials
- Set secure CORS origins
- Enable HTTPS in production

## 📝 Development Workflow

This project follows **Test-Driven Development (TDD)** principles:

1. **Red**: Write a failing test
2. **Green**: Write minimal code to make the test pass
3. **Refactor**: Improve code while keeping tests green

Check the commit history to see the TDD workflow in action with clear commit messages and AI co-authorship attribution.

## 🔒 Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization (User/Admin)
- Input validation using class-validator
- SQL injection prevention via TypeORM
- CORS configuration
- Environment variable protection

## 🤝 Contributing

This project was created as an assessment for Incubyte. While it's not open for contributions, feel free to fork it for learning purposes.

## 📄 License

This project is created for educational and assessment purposes.

## 👤 Author

[Your Name]
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com

## 🙏 Acknowledgments

- Incubyte for the challenging and comprehensive assessment
- The NestJS and React communities for excellent documentation
- GitHub Copilot for AI-assisted development support

---

**Note**: This project demonstrates modern full-stack development practices including TDD, clean code, SOLID principles, and effective use of AI tools in software development.
