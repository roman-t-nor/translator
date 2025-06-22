FROM php:8.3-apache

ARG WWWUSER=1000
ARG WWWGROUP=1000

# Install system dependencies and Node.js 20
RUN apt-get update && apt-get install -y \
    git \
    zip \
    unzip \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    curl \
    vim \
    nano \
    bash \
    supervisor \
    ca-certificates \
    gnupg \
    lsb-release \
    && curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@11.4.2 \
    && npm install -g @angular/cli@latest \
    && docker-php-ext-configure gd --with-jpeg --with-freetype --with-webp \
    && docker-php-ext-install pdo pdo_mysql zip gd bcmath pcntl opcache \
    && a2enmod rewrite headers \
    && apt-get clean && rm -rf /var/lib/apt/lists/*


# Add user and group for Laravel
RUN groupadd -g $WWWGROUP sailgroup \
    && useradd -u $WWWUSER -g sailgroup -m sail

# Install Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug \
    && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
    && echo "xdebug.start_with_request=trigger" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

# PHP custom settings
RUN echo "post_max_size = 100M" > /usr/local/etc/php/conf.d/uploads.ini \
    && echo "upload_max_filesize = 100M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "memory_limit = 512M" >> /usr/local/etc/php/conf.d/uploads.ini \
    && echo "opcache.enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini \
    && echo "opcache.enable_cli=1" >> /usr/local/etc/php/conf.d/docker-php-ext-opcache.ini

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Apache config
COPY ./default.conf /etc/apache2/sites-available/000-default.conf

# Copy startup script
COPY ./startup.sh /docker/startup.sh
RUN chmod +x /docker/startup.sh

# Set working directory
WORKDIR /var/www/html/backend

# Start container
CMD ["/docker/startup.sh"]
