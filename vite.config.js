import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react'; // 1. Impor plugin React

export default defineConfig({
    plugins: [
        laravel({
            // Pastikan Anda mengubah input ke app.tsx jika menggunakan TypeScript
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            refresh: true,
        }),
        tailwindcss(),
        react(), // 2. Tambahkan plugin React di sini
    ],
});