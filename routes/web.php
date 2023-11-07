<?php

use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleSheetController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('google-spreadsheet-api', [GoogleSheetController::class, 'download']);
Route::get('api/test', [TestController::class, 'testAPI']);

Route::get('/', function () {
    return view('welcome');
});
