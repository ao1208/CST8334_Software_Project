<?php

namespace App\Http\Controllers;

use App\Models\CommissionPayoutRecord;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CommissionPayoutController extends Controller
{
    public function findAll()
    {
        // Load the related merchant and user data
        $comm_payouts = CommissionPayoutRecord::with('merchant.user')->get();

        $comm_payouts->transform(function ($comm_payout) {
            $comm_payout->first_name = $comm_payout->user->first_name;
            $comm_payout->last_name = $comm_payout->user->last_name;
            $comm_payout->DBA_name = $comm_payout->merchant->DBA_name;
            return $comm_payout;
        });

        return response()->json($comm_payouts);
    }

    public function getById(Request $request): JsonResponse
    {
        $id = $request->route('id');

        $payout = CommissionPayoutRecord::join('merchants', 'commission_payout_records.merchant_id', '=', 'merchants.merchant_id')
            ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
            ->where('commission_payout_records.id', '=', $id)
            ->first();

        return response()->json($payout);
    }

    public function findByDateAndKeyword(Request $request): JsonResponse
    {

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $keyword = $request->input('keyword');

        // Start building the query
        $query = CommissionPayoutRecord::with('merchant.user');

        // Apply date range filter
        if ($startDate && $endDate) {
            $query->whereBetween('pdate', [$startDate, $endDate]);
        }

        // Apply keyword search
        if ($keyword) {
            $query = $query->whereHas('merchant', function ($merchantQuery) use ($keyword) {
                $merchantQuery->where('merchant_id', 'like', "%$keyword%")
                    ->orwhere('DBA_name', 'like', "%$keyword%")
                    ->orWhereHas('user', function ($userQuery) use ($keyword) {
                        $userQuery->where('sales_id', 'like', "%$keyword%")
                            ->orwhere('first_name', 'like', "%$keyword%")
                            ->orwhere('last_name', 'like', "%$keyword%");
                    });
            });
        }

        // Execute the query and transform the results
        $payouts = $query->get();

        $payouts->transform(function ($payout) {
            $payout->sales_id = $payout->merchant->sales_id;
            $payout->user_first_name = $payout->merchant->user->first_name;
            $payout->user_last_name = $payout->merchant->user->last_name;
            $payout->commission_percentage = $payout->merchant->commission_percentage;
            $payout->DBA_name = $payout->merchant->DBA_name;
            return $payout;
        });

        return response()->json($payouts);
    }

    public function create(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'date' => 'required|date',
            'sales_id' => 'required|string|max:255|unique:users',
            'amount' => 'required|numeric',
            'comment' => 'string',
        ]);

        $validatedData['type'] = 'Payout';

        // Create a new payout into Commission Payout Records table
        $payout = CommissionPayoutRecord::create($validatedData);

        return response()->json($validatedData, 201);
    }

    public function update(Request $request): JsonResponse
    {
        $id = $request->route('id');

        // Validate the request data
        $validatedData = $request->validate([
            'date' => 'required|date',
            'sales_id' => 'required|string|max:255|unique:users',
            'amount' => 'required|numeric',
        ]);

        // Find the user by ID
        $payout = CommissionPayoutRecord::where('id', '=', $id)->first();

        if (!$payout) {
            return response()->json(['message' => 'Payout not found'], 404);
        }

        // Update the payout data
        $payout->date = $validatedData['date'];
        $payout->sales_id = $validatedData['sales_id'];
        $payout->amount = $validatedData['amount'];
        $payout->update();

        return response()->json(['message' => 'Payout updated successfully']);
    }

    public function delete(Request $request): JsonResponse
    {
        $id = $request->route('id');
        // Find the user by ID
        $payout = CommissionPayoutRecord::where('id', '=', $id)->first();

        if (!$payout) {
            return response()->json(['message' => 'Payout not found'], 404);
        }

        // Delete the user
        $payout->delete();

        return response()->json(['message' => 'Payout deleted successfully']);
    }
}
