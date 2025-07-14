<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jobnesia</title>
    
    {{-- Vite akan secara otomatis memasukkan CSS dan JS ke sini --}}
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body>
    {{-- Ini adalah titik di mana seluruh aplikasi React Anda akan dimuat --}}
    <div id="app"></div>
</body>
</html>