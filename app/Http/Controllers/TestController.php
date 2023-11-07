<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function testAPI(): JsonResponse
    {
        $responseData = [
            'id' => 1,
            'name' => 'John Doe',
            'email' => 'john@example.com',
        ];

        return response()->json($responseData, 200);
    }
}
