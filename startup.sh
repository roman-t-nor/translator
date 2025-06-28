#!/bin/bash

set -e

ROOT="/var/www/html"
LARAVEL_DIR="$ROOT/backend"
ANGULAR_DIR="$ROOT/frontend"
PUBLIC_LINK="$ROOT/public_html"

chown -R www-data:www-data $LARAVEL_DIR

groupadd -g $WWWGROUP sailgroup \
    && useradd -u $WWWUSER -g sailgroup -m sail \
    && usermod -aG www-data sail
	
chmod -R g+w $ANGULAR_DIR
chmod -R g+w $LARAVEL_DIR
chmod -R 777 $LARAVEL_DIR/storage

echo "🧭 Starting Apache..."
apache2-foreground
