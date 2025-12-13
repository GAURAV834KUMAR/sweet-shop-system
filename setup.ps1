# Sweet Shop Management System - Setup Script

Write-Host "🍬 Sweet Shop Management System - Setup Script" -ForegroundColor Magenta
Write-Host "=" * 60 -ForegroundColor Magenta
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking Node.js installation..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($?) {
    Write-Host "✓ Node.js is installed: $nodeVersion" -ForegroundColor Green
}
else {
    Write-Host "✗ Node.js is not installed. Please install Node.js v18 or higher." -ForegroundColor Red
    exit 1
}

# Check if Docker is installed (optional)
Write-Host "Checking Docker installation..." -ForegroundColor Yellow
$dockerVersion = docker --version 2>$null
if ($?) {
    Write-Host "✓ Docker is installed: $dockerVersion" -ForegroundColor Green
    $hasDocker = $true
}
else {
    Write-Host "⚠ Docker is not installed. You'll need to set up PostgreSQL manually." -ForegroundColor Yellow
    $hasDocker = $false
}

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Magenta
Write-Host "Setting up Backend..." -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Magenta

# Setup Backend
Set-Location backend

if (Test-Path ".env") {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}
else {
    Write-Host "Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file" -ForegroundColor Green
}

Write-Host "Installing backend dependencies..." -ForegroundColor Yellow
npm install
if ($?) {
    Write-Host "✓ Backend dependencies installed successfully" -ForegroundColor Green
}
else {
    Write-Host "✗ Failed to install backend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Magenta
Write-Host "Setting up Frontend..." -ForegroundColor Cyan
Write-Host "=" * 60 -ForegroundColor Magenta

# Setup Frontend
Set-Location frontend

if (Test-Path ".env") {
    Write-Host "✓ .env file already exists" -ForegroundColor Green
}
else {
    Write-Host "Creating .env file from .env.example..." -ForegroundColor Yellow
    Copy-Item ".env.example" ".env"
    Write-Host "✓ Created .env file" -ForegroundColor Green
}

Write-Host "Installing frontend dependencies..." -ForegroundColor Yellow
npm install
if ($?) {
    Write-Host "✓ Frontend dependencies installed successfully" -ForegroundColor Green
}
else {
    Write-Host "✗ Failed to install frontend dependencies" -ForegroundColor Red
    exit 1
}

Set-Location ..

Write-Host ""
Write-Host "=" * 60 -ForegroundColor Green
Write-Host "✓ Setup Complete!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Green
Write-Host ""

if ($hasDocker) {
    Write-Host "To start the application with Docker:" -ForegroundColor Cyan
    Write-Host "  docker-compose up -d" -ForegroundColor White
    Write-Host ""
}

Write-Host "To start the application manually:" -ForegroundColor Cyan
Write-Host "  1. Start PostgreSQL database (ensure running on localhost:5432)" -ForegroundColor White
Write-Host "  2. Backend: cd backend; npm run start:dev" -ForegroundColor White
Write-Host "  3. Frontend: cd frontend; npm start" -ForegroundColor White
Write-Host ""
Write-Host "Application will be available at:" -ForegroundColor Cyan
Write-Host "  Frontend: http://localhost:3000" -ForegroundColor White
Write-Host "  Backend:  http://localhost:3001/api" -ForegroundColor White
Write-Host ""
Write-Host "Default admin credentials will be created on first run." -ForegroundColor Yellow
Write-Host ""
