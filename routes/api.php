<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController; 
use App\Http\Controllers\JobController;
use App\Http\Controllers\CommunityCommentController;
use App\Http\Controllers\JobApplicationController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/jobs', [JobController::class, 'store']);
Route::get('/jobs', [JobController::class, 'index']);
Route::get('/community-comments', [CommunityCommentController::class, 'index']);
Route::post('/community-comments', [CommunityCommentController::class, 'store']);
Route::post('/apply-job', [JobApplicationController::class, 'store']);
Route::get('/employer-applicants', [JobApplicationController::class, 'applicantsByEmployer']);