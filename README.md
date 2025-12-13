# Sweet Shop Management System

A full-stack e-commerce application for managing a sweet shop, built with modern technologies and following Test-Driven Development (TDD) principles.

## 🚀 Tech Stack

### Backend
- **NestJS** - Progressive Node.js framework
- **TypeScript** - Type-safe development
- **PostgreSQL** - Relational database
- **TypeORM** - Object-Relational Mapping
- **JWT** - JSON Web Token authentication
- **Jest** - Testing framework
- **Passport** - Authentication middleware

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Testing Library** - Component testing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **GitHub Actions** - CI/CD pipeline

## 📋 Features

### User Management
- User registration with validation
- Secure login with JWT authentication
- Role-based access control (User/Admin)

### Sweet Shop Features
- Browse all available sweets
- Search and filter by name, category, or price range
- View detailed information about each sweet
- Purchase sweets (with stock management)

### Admin Features
- Add new sweets to inventory
- Update sweet details (name, price, category, quantity)
- Delete sweets from inventory
- Restock inventory items

## 🛠️ Prerequisites

Before running this project, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v14 or higher)
- **Docker** and **Docker Compose** (optional, for containerized setup)

## 📦 Installation & Setup

### Option 1: Using Docker (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sweet-shop-system
   ```

2. **Start the application**
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - PostgreSQL: localhost:5432

### Option 2: Manual Setup

#### Backend Setup

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
   # Database
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_DATABASE=sweet_shop

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRATION=1d

   # App
   PORT=3001
   ```

4. **Create PostgreSQL database**
   ```bash
   createdb sweet_shop
   ```

5. **Run migrations**
   ```bash
   npm run migration:run
   ```

6. **Start the backend server**
   ```bash
   # Development mode
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
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

5. **Access the application**
   
   Open http://localhost:3000 in your browser

## 🧪 Testing

### Backend Tests

```bash
cd backend

# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e

# Run tests in watch mode
npm run test:watch
```

### Frontend Tests

```bash
cd frontend

# Run all tests
npm test

# Run tests with coverage
npm run test:cov

# Run tests in watch mode
npm test -- --watch
```

## 📚 API Documentation

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
