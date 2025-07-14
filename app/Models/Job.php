<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title', 'company', 'location', 'jobType', 'category', 'experience',
        'salaryMin', 'salaryMax', 'description', 'requirements', 'skills',
        'deadline', 'contact', 'user_id',
        'profile_picture'
    ];

    protected $casts = [
        'skills' => 'array',
        'deadline' => 'date',
    ];
}