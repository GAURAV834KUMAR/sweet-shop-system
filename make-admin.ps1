# Make a user admin in the Sweet Shop System
# Usage: .\make-admin.ps1 <email>

param(
    [string]$Email
)

Write-Host "=== Sweet Shop - Make User Admin ===" -ForegroundColor Magenta
Write-Host ""

if (-not $Email) {
    Write-Host "Usage: .\make-admin.ps1 <email>" -ForegroundColor Yellow
    Write-Host "Example: .\make-admin.ps1 user@example.com" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "First, let's see all users:" -ForegroundColor Cyan
    docker exec -it sweet-shop-db psql -U postgres -d sweet_shop -c "SELECT id, email, \`"firstName\`", \`"lastName\`", role FROM users;"
    exit 1
}

Write-Host "Making $Email an admin..." -ForegroundColor Yellow
docker exec -it sweet-shop-db psql -U postgres -d sweet_shop -c "UPDATE users SET role = 'admin' WHERE email = '$Email';"

Write-Host ""
Write-Host "Verifying..." -ForegroundColor Cyan
docker exec -it sweet-shop-db psql -U postgres -d sweet_shop -c "SELECT id, email, \`"firstName\`", \`"lastName\`", role FROM users WHERE email = '$Email';"

Write-Host ""
Write-Host "✓ Done! Please log out and log back in to see admin privileges." -ForegroundColor Green
