<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\JobApplication;

class JobApplicationController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'job_id' => 'required|exists:jobs,id',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email',
            'phone' => 'required|string|max:30',
            'address' => 'required|string|max:255',
            'education' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'graduation_year' => 'required|string|max:10',
            'company' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'work_year' => 'nullable|string|max:10',
            'cv' => 'required|file|mimes:pdf|max:2048',
        ]);

        $cvPath = $request->file('cv')->store('cv_applications', 'public');

        $application = JobApplication::create([
            'user_id' => $validated['user_id'],
            'job_id' => $validated['job_id'],
            'first_name' => $validated['first_name'],
            'last_name' => $validated['last_name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'address' => $validated['address'],
            'education' => $validated['education'],
            'major' => $validated['major'],
            'graduation_year' => $validated['graduation_year'],
            'company' => $validated['company'] ?? null,
            'position' => $validated['position'] ?? null,
            'work_year' => $validated['work_year'] ?? null,
            'cv_path' => $cvPath,
        ]);

        return response()->json(['message' => 'Lamaran berhasil dikirim!', 'application' => $application], 201);
    }

    public function applicantsByEmployer(Request $request)
    {
        $userId = $request->query('user_id');
        // Ambil semua job yang dimiliki user ini
        $jobIds = \App\Models\Job::where('user_id', $userId)->pluck('id');
        // Ambil semua aplikasi ke job tersebut
        $applications = \App\Models\JobApplication::whereIn('job_id', $jobIds)
            ->with(['job', 'user'])
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($applications);
    }
}
