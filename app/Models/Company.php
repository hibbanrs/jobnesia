<?php

namespace App\Models;

// app/Models/Company.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    use HasFactory;

    public function jobs()
    {
        return $this->hasMany(Job::class); // Relasi dengan Job
    }
}
