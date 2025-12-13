#!/bin/bash
# Make a user admin in the Sweet Shop System

echo "=== Sweet Shop - Make User Admin ==="
echo ""

# Check if email is provided
if [ -z "$1" ]; then
    echo "Usage: ./make-admin.sh <email>"
    echo "Example: ./make-admin.sh user@example.com"
    echo ""
    echo "First, let's see all users:"
    docker exec -it sweet-shop-db psql -U postgres -d sweet_shop -c "SELECT id, email, \"firstName\", \"lastName\", role FROM users;"
    exit 1
fi

EMAIL=$1

echo "Making $EMAIL an admin..."
docker exec -it sweet-shop-db psql -U postgres -d sweet_shop -c "UPDATE users SET role = 'admin' WHERE email = '$EMAIL';"

echo ""
echo "Verifying..."
docker exec -it sweet-shop-db psql -U postgres -d sweet_shop -c "SELECT id, email, \"firstName\", \"lastName\", role FROM users WHERE email = '$EMAIL';"

echo ""
echo "✓ Done! Please log out and log back in to see admin privileges."
