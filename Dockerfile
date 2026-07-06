FROM php:8.2-fpm-alpine

# Instal dependensi sistem & PostgreSQL driver
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    libpng-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    nodejs \
    npm \
    postgresql-dev \
    bash \
    && docker-php-ext-install pdo pdo_pgsql bcmath gd

# Instal Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Salin semua kode proyek
COPY . .

# Jalankan instalasi Laravel & Frontend
RUN composer install --no-dev --optimize-autoloader
RUN npm install && npm run build

# Atur izin folder
RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

# Salin konfigurasi peladen Nginx bawaan Render
EXPOSE 80

CMD ["sh", "-c", "php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=80"]