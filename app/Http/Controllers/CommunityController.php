<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Discussion; // Pastikan model Discussion sudah ada
use App\Models\Job; // Pastikan model Job sudah ada

class CommunityController extends Controller
{
    public function index()
    {
        // Dummy data untuk sementara waktu
        $discussions = [
            (object)[
                'title' => 'Diskusi Pertama',
                'user' => (object)['name' => 'John Doe'],
                'created_at' => now()->subHours(2),
                'replies_count' => 5,
                'views_count' => 100
            ],
            (object)[
                'title' => 'Diskusi Kedua',
                'user' => (object)['name' => 'Jane Smith'],
                'created_at' => now()->subDays(1),
                'replies_count' => 10,
                'views_count' => 150
            ],
            (object)[
                'title' => 'Diskusi Ketiga',
                'user' => (object)['name' => 'Mark Wilson'],
                'created_at' => now()->subDays(3),
                'replies_count' => 0,
                'views_count' => 50
            ]
        ];

        // Mengirim data diskusi ke view 'community'
        return view('jobs.community', compact('discussions'));
    }
}
