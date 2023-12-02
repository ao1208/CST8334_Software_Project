<?php

use App\Http\Controllers\CommissionPayoutController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DataManagementController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\MerchantController;
use App\Http\Controllers\SalesPerformanceController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Auth;
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
// Authentication routes
Route::post('api/login', [LoginController::class, 'authenticate']);
// Dashboard routes
Route::get('api/dashboard-salesperson-list', [DashboardController::class, 'getSalespersonList']);
Route::get('api/dashboard-total-balance', [DashboardController::class, 'getTotalBalanceBySalesperson']);
Route::get('api/dashboard-monthly-commission', [DashboardController::class, 'getCommissionPerMonthBySalesperson']);
Route::get('api/dashboard-transaction', [DashboardController::class, 'getTransactionByDateORSalesperson']);
Route::get('api/dashboard-top-sales', [DashboardController::class, 'getTop10SalesByDate']);
// User routes
Route::get('api/user', [UserController::class, 'findAll']);
Route::get('api/user/{sales_id}', [UserController::class, 'getById']);
Route::post('api/user', [UserController::class, 'create']);
Route::put('api/user/{sales_id}', [UserController::class, 'update']);
Route::delete('api/user/{sales_id}', [UserController::class, 'delete']);
Route::get('api/user-search', [UserController::class, 'findByKeyword']);
Route::get('api/sales-id', [UserController::class, 'getNewId']);
// Merchant routes
Route::get('api/merchant', [MerchantController::class, 'findAll']);
Route::get('api/merchant/{merchant_id}', [MerchantController::class, 'getById']);
Route::post('api/merchant', [MerchantController::class, 'create']);
Route::put('api/merchant/{merchant_id}', [MerchantController::class, 'update']);
Route::delete('api/merchant/{merchant_id}', [MerchantController::class, 'delete']);
Route::get('api/merchant-search', [MerchantController::class, 'findByKeyword']);
// Sales performance routes-Administrator
Route::get('api/performance', [SalesPerformanceController::class, 'findAll']);
Route::get('api/performance-search', [SalesPerformanceController::class, 'findByDateAndKeyword']);
Route::get('api/performance-report', [SalesPerformanceController::class, 'reportAll']);
Route::get('api/performance-report-search', [SalesPerformanceController::class, 'reportByDate']);
// Sales performance routes-Salesperson
Route::get('api/sales-performance/{userId}', [SalesPerformanceController::class, 'findSalespersonByDateAndKeyword']);
Route::get('api/sales-performance-header/{userId}', [SalesPerformanceController::class, 'findSalespersonHeaderByDate']);
// Commission payout routes-Administrator
Route::get('api/payout', [CommissionPayoutController::class, 'findAll']);
Route::get('api/payout/{id}', [CommissionPayoutController::class, 'getById']);
Route::post('api/payout', [CommissionPayoutController::class, 'create']);
Route::put('api/payout/{id}', [CommissionPayoutController::class, 'update']);
Route::delete('api/payout/{id}', [CommissionPayoutController::class, 'delete']);
Route::get('api/payout-search', [CommissionPayoutController::class, 'findByDateAndKeyword']);
// Google Sheet API route for import data
Route::get('api/google-spreadsheet-api', [GoogleSheetController::class, 'download']);
// Data management routes
Route::get('api/data', [DataManagementController::class, 'findAll']);
Route::put('api/data/{id}', [DataManagementController::class, 'update']);
Route::get('api/data-search', [DataManagementController::class, 'findByDate']);
//// Welcome route
//Route::get('/', function () {
//    return view('welcome');
//});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});
