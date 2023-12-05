<?php

namespace App\Http\Controllers;

use App\Helpers\DateRange;
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
    public function findAll(Request $request): JsonResponse
    {
        // Set the default values for page and perPage
        $perPage = $request->input('perPage', 10);

        $logs = ImportLog::join('users', 'import_logs.sales_id', '=', 'users.sales_id')
            ->select('import_logs.id','pdate', 'number_of_merchant','users.sales_id','users.first_name',
                'users.last_name', 'import_logs.created_at', 'deleted_datetime')
            ->orderBy('pdate','asc')->get();

        return response()->json($logs);
    }

    public function findByDate(Request $request):JsonResponse
    {
        // Extract date range from the request
        $dateRange = $request->input('date-range');
        // Get start and end dates based on the provided date range
        $startDate = DateRange::getStartAndEndDate($dateRange)['startDate'];
        $endDate = DateRange::getStartAndEndDate($dateRange)['endDate'];

        // Start building the query
        $query = ImportLog::join('users', 'import_logs.sales_id', '=', 'users.sales_id');

        // Apply date range filter
        if ($startDate && $endDate) {
            $query->whereBetween('pdate', [$startDate, $endDate]);
        }

        // Execute the query and transform the results
        $logs = $query->select( 'import_logs.id','pdate', 'number_of_merchant',
            'users.sales_id','users.first_name','users.last_name',
            'import_logs.created_at', 'deleted_datetime')
            ->orderBy('pdate','asc')->get();

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
