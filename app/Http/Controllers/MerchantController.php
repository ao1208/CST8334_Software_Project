<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MerchantController extends Controller
{
    /**
     * Retrieve a list of all merchants with related user data.
     *
     * This function loads the related user data for each merchant and transforms the results
     * to include additional information such as the sales' first and last name.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function findAll(): JsonResponse
    {
        // Load the related user data
        $merchants = Merchant::with('user')->get();

        $merchants->transform(function ($merchant) {
            $merchant->first_name = $merchant->user->first_name;
            $merchant->last_name = $merchant->user->last_name;
            return $merchant;
        });

        return response()->json($merchants);
    }

    public function getById(Request $request): JsonResponse
    {
        $merchant_id = $request->route('merchant_id');

        $merchant = Merchant::where('merchant_id', '=', $merchant_id)
            ->first();

        return response()->json($merchant);
    }

    public function findByKeyword(string $keyword): JsonResponse
    {
        // Search for merchants with a sales/merchant id or name containing the provided keyword
        $merchants = Merchant::where('sales_id', 'like', '%' . $keyword . '%')
            ->orWhere('first_name', 'like', '%' . $keyword . '%')
            ->orWhere('last_name', 'like', '%' . $keyword . '%')
            ->orWhere('merchant_id', 'like', '%' . $keyword . '%')
            ->orWhere('SCP_number', 'like', '%' . $keyword . '%')
            ->orWhere('DBA_name', 'like', '%' . $keyword . '%')
            ->get();

        // Return the list of matching merchants as a JSON response
        return response()->json($merchants);
    }

    public function create(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'merchant_id' => 'required|string|max:255',
            'SCP_number' => 'required|string|max:255',
            'DBA_name' => 'required|string|max:255',
            'date_open' => 'required|date',
            'date_closed' => 'nullable|date',
            'sales_id' => 'required|string|max:255',
            'commission_percentage' => 'required|string|max:255',
        ]);

        // Set account_status based on the value of date_closed
        $validatedData['account_status'] = $validatedData['date_closed'] ? 'P' : '0';

        // Create a new merchant into Merchants table
        $merchant = Merchant::create($validatedData);

        return response()->json($validatedData, 201);
    }

    public function update(Request $request): JsonResponse
    {
        $merchant_id = $request->route('merchant_id');

        // Validate the request data (you can define your validation rules)
        $request->validate([
//            'merchant_id' => 'required|string|unique:merchants,merchant_id,'.$merchant_id,
//            'SCP_number' => 'required|string',
//            'DBA_name' => 'required|string',
//            'date_open' => 'required|date_format:Y-m-d',
//            'date_closed' => 'nullable|date_format:Y-m-d',
            'sales_id' => 'required|string',
//            'commission_percentage' => 'required|numeric',
        ]);

//        'account_status' => 'required|string|size:1',

        // Find the merchant by ID
        $merchant = Merchant::where('merchant_id', '=', $merchant_id)->first();

        if (!$merchant) {
            return response()->json(['message' => 'Merchant not found'], 404);
        }

        // Update the merchant data
        $merchant->update($request->all());

        return response()->json(['message' => 'Merchant updated successfully']);
    }

    public function delete(Request $request): JsonResponse
    {
        $merchant_id = $request->route('merchant_id');
        // Find the merchant by ID
        $merchant = Merchant::where('merchant_id', '=', $merchant_id)->first();

        if (!$merchant) {
            return response()->json(['message' => 'Merchant not found'], 404);
        }

        // Delete the merchant
        $merchant->delete();

        return response()->json(['message' => 'Merchant deleted successfully']);
    }
}
