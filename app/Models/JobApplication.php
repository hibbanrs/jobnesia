<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobApplication extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'job_id', 'first_name', 'last_name', 'email', 'phone', 'address',
        'education', 'major', 'graduation_year', 'company', 'position', 'work_year', 'cv_path'
    ];

    public function job()
    {
        return $this->belongsTo(\App\Models\Job::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
