<?php

use App\Http\Controllers\CommissionPayoutController;
use App\Http\Controllers\DataManagementController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\SalesPerformanceController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
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
Route::post('api/login', [LoginController::class, 'authenticate']);

Route::get('api/user', [UserController::class, 'findAll']);
Route::get('api/user/{sales_id}', [UserController::class, 'getById']);
Route::post('api/user', [UserController::class, 'create']);
Route::put('api/user/{sales_id}', [UserController::class, 'update']);
Route::delete('api/user/{sales_id}', [UserController::class, 'delete']);
Route::get('api/user-search', [UserController::class, 'findByKeyword']);

Route::get('api/merchant', [MerchantController::class, 'findAll']);
Route::get('api/merchant/{merchant_id}', [MerchantController::class, 'getById']);
Route::post('api/merchant', [MerchantController::class, 'create']);
Route::put('api/merchant/{merchant_id}', [MerchantController::class, 'update']);
Route::delete('api/merchant/{merchant_id}', [MerchantController::class, 'delete']);
Route::get('api/merchant-search', [MerchantController::class, 'findByKeyword']);

Route::get('api/performance', [SalesPerformanceController::class, 'findAll']);
Route::get('api/performance-search', [SalesPerformanceController::class, 'findByDateAndKeyword']);

Route::get('api/payout', [CommissionPayoutController::class, 'findAll']);
Route::get('api/payout/{id}', [CommissionPayoutController::class, 'getById']);
Route::post('api/payout', [CommissionPayoutController::class, 'create']);
Route::put('api/payout/{id}', [CommissionPayoutController::class, 'update']);
Route::delete('api/payout/{id}', [CommissionPayoutController::class, 'delete']);
Route::get('api/payout-search', [CommissionPayoutController::class, 'findByDateAndKeyword']);

Route::get('api/google-spreadsheet-api', [GoogleSheetController::class, 'download']);
Route::get('api/data', [DataManagementController::class, 'findAll']);
Route::put('api/data/{id}', [DataManagementController::class, 'update']);
Route::get('api/data-search', [DataManagementController::class, 'findByDate']);

//Route::get('api/test', [GoogleSheetController::class, 'test']);

Route::get('/', function () {
    return view('welcome');
});
