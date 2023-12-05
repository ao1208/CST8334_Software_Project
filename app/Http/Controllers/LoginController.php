<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
            $user = auth()->user();
            $userId = Auth::id();
            return response()->json(['role' => $user->role, 'id' => $userId]);
        } else {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }
    }

}
