<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    // Method showRegistrationForm() tidak lagi diperlukan untuk API, bisa dihapus
    // public function showRegistrationForm() { ... }

    public function register(Request $request)
    {
        // Validasi input
        $validator = Validator::make($request->all(), [
            'firstName' => ['required', 'string', 'max:255'],
            'lastName' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'userType' => ['required', 'string'],
        ]);

        // Jika validasi gagal, kembalikan error dalam format JSON
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Buat user baru
        $user = User::create([
            'first_name' => $request->firstName,
            'last_name' => $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->userType,
        ]);

        // Buat token autentikasi untuk user (menggunakan Laravel Sanctum)
        $token = $user->createToken('auth_token')->plainTextToken;

        // Kembalikan respons dalam format JSON
        return response()->json([
            'message'       => 'Registrasi berhasil!',
            'access_token'  => $token,
            'token_type'    => 'Bearer',
            'user'          => $user
        ], 201); // Kode status 201 berarti "Created"
    }
}