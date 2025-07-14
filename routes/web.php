<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

// Rute ini akan menangkap semua URL dan menampilkannya melalui view 'app',
// menyerahkan kontrol routing selanjutnya kepada React Router.
Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');

