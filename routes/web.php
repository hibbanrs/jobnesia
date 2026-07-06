<?php
use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

Route::get('/{any?}', function () {
    return view('app');
})->where('any', '.*');

