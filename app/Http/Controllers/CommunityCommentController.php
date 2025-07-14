<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CommunityComment;
use App\Models\User;

class CommunityCommentController extends Controller
{
    public function index()
    {
        return CommunityComment::with('user')->orderBy('created_at', 'desc')->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string|max:1000',
            'user_id' => 'required|exists:users,id',
        ]);

        $comment = CommunityComment::create([
            'user_id' => $request->user_id,
            'content' => $request->content,
        ]);

        return response()->json($comment->load('user'), 201);
    }
}
