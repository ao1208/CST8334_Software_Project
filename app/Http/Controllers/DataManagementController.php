<?php

namespace App\Http\Controllers;

use App\Models\CommissionPayoutRecord;
use App\Models\CreditCardTransaction;
use App\Models\ImportLog;
use App\Models\SourceMasterRecord;
use App\Models\SourceVisaRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DataManagementController extends Controller
{
    public function findAll(): JsonResponse
    {
        $logs = ImportLog::with('user')->get();

        $logs->transform(function ($log) {
            $log->first_name = $log->user->first_name;
            $log->last_name = $log->user->last_name;
            return $log;
        });
        return response()->json($logs);
    }

    //TODO: Not yet to test...
    public function findByDate(Request $request):JsonResponse
    {
        $dateRange = $request->input('date-range');

        switch ($dateRange) {
            case "This month":
                $startDate = Carbon::now()->startOfMonth(); // First day of the current month
                $endDate = Carbon::now()->endOfMonth();   // Last day of the current month
                break;
            case "Last month":
                $startDate = Carbon::now()->subMonth(1)->startOfMonth(); // First day of the last month
                $endDate = Carbon::now()->subMonth(1)->endOfMonth();   // Last day of the last month
                break;
            case "Last 3 months":
                $startDate = Carbon::now()->subMonths(2)->startOfMonth(); // First day of 3 months ago
                $endDate = Carbon::now()->endOfMonth();   // Last day of the current month
                break;
            case "Last 6 months":
                $startDate = Carbon::now()->subMonths(5)->startOfMonth(); // First day of 6 months ago
                $endDate = Carbon::now()->endOfMonth();   // Last day of the current month
                break;
            case "This year":
                $startDate = Carbon::now()->startOfYear(); // First day of the current year
                $endDate = Carbon::now()->endOfYear();   // Last day of the current year
                break;
            case "Last year":
                $startDate = Carbon::now()->subYear(1)->startOfYear(); // First day of last year
                $endDate = Carbon::now()->subYear(1)->endOfYear();   // Last day of last year
                break;
            case "Last 12 months":
                $startDate = Carbon::now()->subMonths(11)->startOfMonth(); // First day of 12 months ago
                $endDate = Carbon::now()->endOfMonth();   // Last day of the current month
                break;
            default:
                $startDate = null;
                $endDate = null;
        }

        // Start building the query
        $query = ImportLog::with('user');

        // Apply date range filter
        if ($startDate && $endDate) {
            $query->whereBetween('pdate', [$startDate, $endDate]);
        }

        // Execute the query and transform the results
        $logs = $query->get();

        $logs->transform(function ($log) {
            $log->first_name = $log->user->first_name;
            $log->last_name = $log->user->last_name;
            return $log;
        });

        return response()->json($logs);
    }
    public function update(Request $request):JsonResponse
    {
        $id = $request->route('id');
        // Find the user by ID
        $log = ImportLog::find($id);

        if (!$log) {
            return response()->json(['message' => 'Log not found'], 404);
        }

        try {
            // Delete the data from tables in DB which match the 'pdate'
            $commissions = CommissionPayoutRecord::where('date', '=', $log->pdate)->delete();
            $transactions = CreditCardTransaction::where('pdate', '=', $log->pdate)->delete();
            $source_visa_records = SourceVisaRecord::where('pdate', '=', $log->pdate)->delete();
            $source_master_records = SourceMasterRecord::where('pdate', '=', $log->pdate)->delete();

            // Update the deleted_datetime to the current time and save the changes to the database
            $log->update(['deleted_datetime' => now()]);

            return response()->json(['message' => 'Log updated successfully']);
        }catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
