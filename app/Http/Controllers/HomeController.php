<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;

class HomeController extends Controller
{
    public function index()
    {
        // Get featured jobs to display on the homepage
        $featuredJobs = Job::where('is_featured', true)
                          ->orderBy('created_at', 'desc')
                          ->take(8)
                          ->get();
        
        return view('home', compact('featuredJobs'));
    }
}