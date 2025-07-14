<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Job;
use App\Models\Category;
use App\Models\Location;

class JobController extends Controller
{
    // Method untuk menampilkan halaman depan dengan data dummy (tanpa database)
    // Ganti method index agar menjadi endpoint API
    public function index()
    {
        return response()->json(\App\Models\Job::orderBy('created_at', 'desc')->get());
    }

    // Method untuk menampilkan halaman form tambah lowongan
    public function create()
    {
        // Dummy data untuk kategori dan lokasi
        $categories = [
            'UI/UX Design',
            'Backend Developer',
            'Marketing',
            'Sales',
            'HR'
        ];

        $locations = [
            'Jakarta',
            'Bandung',
            'Surabaya',
            'Yogyakarta'
        ];

        // Kirimkan data kategori dan lokasi ke view
        return view('jobs.create', compact('categories', 'locations'));
    }
    
    // Method untuk menyimpan data lowongan ke database
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'company' => 'required|string|max:100',
            'location' => 'required|string|max:100',
            'jobType' => 'required|string',
            'category' => 'required|string',
            'experience' => 'required|string',
            'salaryMin' => 'nullable|integer',
            'salaryMax' => 'nullable|integer',
            'description' => 'required|string',
            'requirements' => 'required|string',
            'skills' => 'nullable|array',
            'deadline' => 'nullable|date',
            'contact' => 'required|email',
            'user_id' => 'required|integer',
            'profile_picture' => 'nullable|image|max:2048', // max 2MB
        ]);

        // Handle upload gambar jika ada
        $profilePicturePath = null;
        if ($request->hasFile('profile_picture')) {
            $profilePicturePath = $request->file('profile_picture')->store('company_profiles', 'public');
        }

        $job = \App\Models\Job::create([
            'title' => $validated['title'],
            'company' => $validated['company'],
            'location' => $validated['location'],
            'jobType' => $validated['jobType'],
            'category' => $validated['category'],
            'experience' => $validated['experience'],
            'salaryMin' => $validated['salaryMin'],
            'salaryMax' => $validated['salaryMax'],
            'description' => $validated['description'],
            'requirements' => $validated['requirements'],
            'skills' => $validated['skills'] ?? [],
            'deadline' => $validated['deadline'],
            'contact' => $validated['contact'],
            'user_id' => $validated['user_id'],
            'profile_picture' => $profilePicturePath,
        ]);

        return response()->json($job, 201);
    }

    // Method untuk menampilkan halaman Cari Lowongan Kerja dengan filter
    public function search(Request $request)
    {
        // Ambil query parameter dari request (misalnya keyword, lokasi, kategori)
        $query = $request->input('query');
        $location = $request->input('location');
        $category = $request->input('category');
        
        // Query untuk mencari lowongan berdasarkan input dari pengguna
        $jobs = Job::query();

        if ($query) {
            $jobs->where('title', 'like', '%' . $query . '%')
                 ->orWhere('description', 'like', '%' . $query . '%');
        }

        if ($location) {
            $jobs->whereHas('location', function ($query) use ($location) {
                $query->where('name', $location);
            });
        }

        if ($category) {
            $jobs->whereHas('category', function ($query) use ($category) {
                $query->where('name', $category);
            });
        }

        // Ambil hasil pencarian
        $jobs = $jobs->get();

        // Kirimkan data ke view
        return view('jobs.search', compact('jobs'));
    }
}
