#!/usr/bin/env bash
# Hentikan proses jika ada eror
set -o errexit

# Instal dependensi PHP (Backend)
composer install --no-dev --optimize-autoloader

# Instal dependensi Node.js & bangun aset Vite (Frontend)
npm install
npm run build

# Eksekusi migrasi database otomatis
php artisan migrate --force