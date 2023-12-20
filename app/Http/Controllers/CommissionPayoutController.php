<?php

namespace App\Http\Controllers;

use App\Helpers\DateRange;
use App\Models\CommissionPayoutRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class CommissionPayoutController extends Controller
{
    public function findAll(Request $request)
    {
        // Set the default values for page and perPage
        $perPage = $request->input('perPage', 10);

        // Load the related merchant and user data
        $comm_payouts = CommissionPayoutRecord::leftjoin('merchants', 'commission_payout_records.merchant_id', '=', 'merchants.merchant_id')
            ->join('users', 'commission_payout_records.sales_id', '=', 'users.sales_id')
            ->select('commission_payout_records.id', 'commission_payout_records.date',
                'users.sales_id', 'users.first_name', 'users.last_name',
                'merchants.merchant_id', 'merchants.DBA_name',
                'type', 'amount', 'balance', 'comment')
            ->orderBy('commission_payout_records.id', 'asc')
//            ->orderBy('date', 'asc')
//            ->orderBy('users.sales_id', 'asc')
            ->paginate($perPage);

        $subCommission = 0;
        $subPayout = 0;

        foreach ($comm_payouts as $payout) {
            if ($payout->type === 'Commission') {
                $subCommission += $payout->amount;
            } elseif ($payout->type === 'Payout') {
                $subPayout += $payout->amount;
            }
        }

        $payouts = [['subtotalCommission' => $subCommission], ['subtotalPayout' => $subPayout], $comm_payouts];

        return response()->json($payouts);
    }

    public function getById(Request $request): JsonResponse
    {
        $id = $request->route('id');

        try {
            $payout = CommissionPayoutRecord::select(
                'commission_payout_records.id', // select all columns from the main table
                'commission_payout_records.date',
                'commission_payout_records.sales_id',
                'commission_payout_records.merchant_id',
                'commission_payout_records.type',
                'commission_payout_records.amount',
                'commission_payout_records.balance',
                'commission_payout_records.comment',
                'users.first_name',
                'users.last_name',
            )
                ->join('users', 'commission_payout_records.sales_id', '=', 'users.sales_id')
                ->where('commission_payout_records.id', $id)
                ->firstOrFail(); // Use firstOrFail to throw an exception if not found

            return response()->json($payout);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Payout not found'], 404);
        }
    }

    public function getBalanceById(Request $request): JsonResponse
    {
        $id = $request->route('id');

        try {
            $commission = CommissionPayoutRecord::select(DB::raw('SUM(amount) as totalCommission'))
                ->where('type', '=', 'Commission')
                ->where('sales_id', '=', $id)
                ->groupBy('sales_id')
                ->first();
            $payout = CommissionPayoutRecord::select(DB::raw('SUM(amount) as totalPayout'))
                ->where('type', '=', 'Payout')
                ->where('sales_id', '=', $id)
                ->groupBy('sales_id')
                ->first();
            // Extract values from objects
            $totalCommission = $commission ? $commission->totalCommission : 0;
            $totalPayout = $payout ? $payout->totalPayout : 0;
            // Calculate balance
            $balance = $totalCommission - $totalPayout;
            return response()->json(['currentBalance' => $balance]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Payout not found'], 404);
        }
    }

    public function findByDateAndKeyword(Request $request): JsonResponse
    {
        // Set the default values for page and perPage
        $perPage = $request->input('perPage', 10);

        // Extract date range, start date, end date, and keyword from the request
        $dateRange = $request->input('date-range');
        if ($dateRange) {
            // Get start and end dates based on the provided date range
            $startDate = DateRange::getStartAndEndDate($dateRange)['startDate'];
            $endDate = DateRange::getStartAndEndDate($dateRange)['endDate'];
        } else {
            $startDate = $request->input('startDate');
            $endDate = $request->input('endDate');
        }
        $keyword = $request->input('keyword');

        // Start building the query
        $query = CommissionPayoutRecord::leftjoin('merchants', 'commission_payout_records.merchant_id', '=', 'merchants.merchant_id')
            ->join('users', 'commission_payout_records.sales_id', '=', 'users.sales_id');

        // Apply date range filter
        if ($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        // Apply keyword search
        if ($keyword) {
            $query = $query->where(function ($q) use ($keyword) {
                $q->where('merchants.merchant_id', 'like', "%$keyword%")
                    ->orwhere('merchants.DBA_name', 'like', "%$keyword%")
                    ->orwhere('users.sales_id', 'like', "%$keyword%")
                    ->orwhere('users.first_name', 'like', "%$keyword%")
                    ->orwhere('users.last_name', 'like', "%$keyword%");
            });
        }

        $payouts_data = $query->select('commission_payout_records.id', 'commission_payout_records.date',
            'users.sales_id', 'users.first_name', 'users.last_name',
            'merchants.merchant_id', 'merchants.DBA_name', 'type', 'amount', 'balance', 'comment')
            ->orderBy('date', 'asc')->orderBy('users.sales_id', 'asc')
            ->paginate($perPage);

        $subCommission = 0;
        $subPayout = 0;

        foreach ($payouts_data as $payout) {
            if ($payout->type === 'Commission') {
                $subCommission += $payout->amount;
            } elseif ($payout->type === 'Payout') {
                $subPayout += $payout->amount;
            }
        }

        $payouts = [['subtotalCommission' => $subCommission], ['subtotalPayout' => $subPayout], $payouts_data];

        return response()->json($payouts);
    }

    public function create(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'date' => 'required|date',
            'sales_id' => 'required|string|max:255',
            'amount' => 'required|numeric',
            'balance' => 'required|numeric',
            'comment' => 'string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }
        $validatedData = $validator->validated();
        $validatedData['type'] = 'Payout';

        // Create a new payout into Commission Payout Records table
        try {

            $validatedData = [
                'date' => $request->date,
                'sales_id' => $request->sales_id,
                'type' => 'Payout',
                'amount' => $request->amount,
                'balance' => $request->balance,
                'comment' => $request->comment,
            ];

            DB::beginTransaction();
            // Create a new payout into Commission Payout Records table
            $payout = CommissionPayoutRecord::create($validatedData);
            DB::commit();

            return response()->json(['message' => 'Commission Payout Record created successfully'], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => 'Failed to create Commission Payout Record', 'error' => $e->getMessage()], 500);
        }
    }

    public
    function update(Request $request): JsonResponse
    {
        $id = $request->route('id');

        // Validate the request data
        $validatedData = $request->validate([
            'date' => 'required|date',
            'sales_id' => 'required|string',
            'amount' => 'required|numeric',
            'balance' => 'required|numeric',
            'comment' => 'string'
        ]);

        try {
            Log::info('ID being used:', ['id' => $id]);
            $payout = CommissionPayoutRecord::findOrFail($id);

            // Update the payout data with validated fields
            $payout->fill($validatedData);

            // Start a database transaction
            DB::beginTransaction();
            $payout->save(); // Save the updated payout
            DB::commit(); // Commit the transaction
            return response()->json(['message' => 'Payout updated successfully']);
        } catch (\Exception $e) {
            DB::rollBack(); // Rollback the transaction in case of failure
            return response()->json(['message' => 'Failed to update Payout', 'error' => $e->getMessage()], 500);
        }
    }

    public
    function delete(Request $request): JsonResponse
    {
        $id = $request->route('id');
        // Find the user by ID
        $payout = CommissionPayoutRecord::where('id', '=', $id)->first();

        if (!$payout) {
            return response()->json(['message' => 'Payout not found'], 404);
        }

        // Delete the user
        DB::beginTransaction();
        $payout->delete();
        DB::commit();
        return response()->json(['message' => 'Payout deleted successfully']);
    }

    public function findSalespersonByDateAndKeyword(Request $request, $userId): JsonResponse
    {
        // Set the default values for page and perPage
        $perPage = $request->input('perPage', 10);

        // Extract date range, start date, end date, and keyword from the request
        $dateRange = $request->input('date-range');
        if ($dateRange) {
            // Get start and end dates based on the provided date range
            $startDate = DateRange::getStartAndEndDate($dateRange)['startDate'];
            $endDate = DateRange::getStartAndEndDate($dateRange)['endDate'];
        } else {
            $startDate = $request->input('startDate');
            $endDate = $request->input('endDate');
        }
        $keyword = $request->input('keyword');

        // Start building the query
        $query = CommissionPayoutRecord::leftjoin('merchants', 'commission_payout_records.merchant_id', '=', 'merchants.merchant_id')
            ->join('users', 'commission_payout_records.sales_id', '=', 'users.sales_id');

        // Apply date range filter
        if ($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        // Apply keyword search
        if ($keyword) {
            $query = $query->where(function ($q) use ($keyword) {
                $q->where('merchants.merchant_id', 'like', "%$keyword%")
                    ->orwhere('merchants.DBA_name', 'like', "%$keyword%")
                    ->orwhere('users.sales_id', 'like', "%$keyword%")
                    ->orwhere('users.first_name', 'like', "%$keyword%")
                    ->orwhere('users.last_name', 'like', "%$keyword%");
            });
        }

        $payouts_data = $query->select('commission_payout_records.id', 'commission_payout_records.date',
            'users.sales_id', 'users.first_name', 'users.last_name',
            'merchants.merchant_id', 'merchants.DBA_name', 'type', 'amount', 'balance', 'comment')
            ->where('users.id', '=', $userId)
            ->orderBy('date', 'asc')->orderBy('users.sales_id', 'asc')
            ->paginate($perPage);

        $subCommission = 0;
        $subPayout = 0;

        foreach ($payouts_data as $payout) {
            if ($payout->type === 'Commission') {
                $subCommission += $payout->amount;
            } elseif ($payout->type === 'Payout') {
                $subPayout += $payout->amount;
            }
        }

        $payouts = [['subtotalCommission' => $subCommission], ['subtotalPayout' => $subPayout], $payouts_data];

        return response()->json($payouts);
    }
}
