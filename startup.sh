#!/bin/bash

set -e

echo "🚀 Starting container..."

# Paths
ROOT="/var/www/html"
LARAVEL_DIR="$ROOT/backend"
ANGULAR_DIR="$ROOT/frontend"
PUBLIC_LINK="$ROOT/public_html"
ANGULAR_OUTPUT_DIR="$LARAVEL_DIR/public/angular"
ENV_LINK="$ROOT/.env"
LARAVEL_ENV_FILE="$LARAVEL_DIR/.env"

# Step 1: Composer install
# if [ ! -d "$LARAVEL_DIR/vendor" ]; then
#   echo "📦 Installing Laravel dependencies..."
#   cd $LARAVEL_DIR
#   composer install
# fi

# Step 2: Laravel setup
# echo "🔧 Running Laravel setup..."
# cd $LARAVEL_DIR
# php artisan config:clear
# php artisan route:clear
# php artisan view:clear
# php artisan storage:link || true

# Step 3: Build Angular
# if [ -d "$ANGULAR_DIR/node_modules" ]; then
#   echo "⚙️  Building Angular..."
#   cd $ANGULAR_DIR
#   npm install
#   npm run build -- --configuration production
# fi


# Step 4: Symlink public_html → backend/public
if [ ! -L "$PUBLIC_LINK" ]; then
  echo "🔗 Creating symlink: $PUBLIC_LINK → $LARAVEL_DIR/public"
  rm -rf "$PUBLIC_LINK"  # remove existing folder if any
  ln -s "$LARAVEL_DIR/public" "$PUBLIC_LINK"
fi

# New symlink logic for .env → $LARAVEL_DIR/.env
if [ ! -L "$ENV_LINK" ]; then
  echo "🔗 Creating symlink: $ENV_LINK → $LARAVEL_ENV_FILE"
  rm -f "$ENV_LINK"  # remove existing file if any
  ln -s "$LARAVEL_ENV_FILE" "$ENV_LINK"
fi

# Step 5: Fix permissions
echo "🔐 Setting permissions..."
chown -R www-data:www-data $LARAVEL_DIR
chown -h www-data:www-data $PUBLIC_LINK

# Step 6: Start Apache
echo "🧭 Starting Apache..."
apache2-foreground
