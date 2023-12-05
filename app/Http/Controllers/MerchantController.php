<?php

namespace App\Http\Controllers;

use App\Models\Merchant;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


use App\Models\User;
use Illuminate\Support\Facades\Validator;

use Illuminate\support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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

    /**
     * Get a merchant by ID.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getById(Request $request): JsonResponse
    {
        $merchant_id = $request->route('merchant_id');
        $merchant = Merchant::where('merchant_id', '=', $merchant_id)
            ->first();

        return response()->json($merchant);
    }

    public function checkUnique(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'merchant_id' => 'required|string|max:255',
            'SCP_number' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }

        $merchantId = $request->merchant_id;
        $scpNumber = $request->SCP_number;

        $existingMerchant = Merchant::where('merchant_id', $merchantId)
            ->orWhere('SCP_number', $scpNumber)
            ->first();

        if ($existingMerchant) {
            $conflictField = $existingMerchant->merchant_id === $merchantId ? 'merchant_id' : 'SCP_number';

            // If a record with the same merchant_id or SCP_number exists, return false and the conflicting field
            return response()->json(['isUnique' => false, 'conflictField' => $conflictField]);
        }

        // If no record found, return true
        return response()->json(['isUnique' => true]);
    }

    /**
     * Find merchants by keyword.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function findByKeyword(Request $request): JsonResponse
    {
        $keyword = $request->query('keyword');
        // Check if the keyword parameter is missing
        if (!$keyword) {
            return response()->json(['message' => 'Keyword parameter missing'], 400);
        }
        // Query merchants based on the keyword, including related user data
        $merchants = Merchant::with('user')
            ->where('merchant_id', 'like', "%$keyword%")
            ->orWhere('SCP_number', 'like', "%$keyword%")
            ->orWhere('DBA_name', 'like', "%$keyword%")
            ->orWhereHas('user', function ($userQuery) use ($keyword) {
                $userQuery->where('sales_id', 'like', "%$keyword%")
                    ->orWhere('first_name', 'like', "%$keyword%")
                    ->orWhere('last_name', 'like', "%$keyword%")
                    ->select('first_name', 'last_name', 'sales_id');
            })
            ->get();
        // Transform and customize the merchant data
        $merchants->transform(function ($merchant) {
            $merchant->sales_id = $merchant->user->sales_id ?? null;
            $merchant->first_name = $merchant->user->first_name ?? null;
            $merchant->last_name = $merchant->user->last_name ?? null;
            $merchant->commission_percentage = $merchant->commission_percentage ?? null;
            $merchant->DBA_name = $merchant->DBA_name ?? null;
            return $merchant;
        });

        return response()->json($merchants);
    }

    /**
     * Create a new merchant.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request)
    {
        // Validate the incoming request data
        $validator = Validator::make($request->all(), [
            'merchant_id' => 'required|string|max:255',
            'SCP_number' => 'required|string|max:255',
            'DBA_name' => 'required|string|max:255',
            'date_open' => 'required|date',
            'date_closed' => 'nullable|date',
            'sales_id' => 'required|string|max:255',
            'commission_percentage' => 'required|numeric'
        ]);

        // Check for validation failure
        if ($validator->fails()) {
            return response()->json($validator->messages(), 400);
        }

        // Extract and process validated data
        $validatedData = $validator->validated();
        $accountStatus = $validatedData['date_closed'] ? 'P' : '0';

        try {
            // Build the data array for creating a new merchant
            $data = [
                'merchant_id' => $request->merchant_id,
                'SCP_number' => $request->SCP_number,
                'DBA_name' => $request->DBA_name,
                'date_open' => $request->date_open,
                'date_closed' => $request->date_closed,
                'account_status' => $accountStatus,
                'sales_id' => $request->sales_id,
                'commission_percentage' => $request->commission_percentage
            ];

            DB::beginTransaction();
            $merchant = Merchant::create($data);
            DB::commit();

            return response()->json(['message' => 'Merchant created successfully'], 201);

        } catch (\Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollBack();
            return response()->json(['message' => 'Failed to create merchant', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Update an existing merchant.
     *
     * @param Request $request
     * @param string $merchant_id
     * @return JsonResponse
     */
    public function update(Request $request, $merchant_id): JsonResponse
    {
        try {
            // Find the merchant by ID
            $merchant = Merchant::where('merchant_id', $merchant_id)->first();

            if (!$merchant) {
                return response()->json(['message' => 'Merchant not found'], 404);
            }

            // Validate the request data for the update operation
            $validatedData = $request->validate([
                'SCP_number' => 'required|string|max:255',
                'DBA_name' => 'required|string|max:255',
                'date_open' => 'required|date',
                'date_closed' => 'nullable|date',
                'sales_id' => 'required|string|max:255',
                'commission_percentage' => 'required|numeric'
            ]);

            // Set the validated data to merchant attributes
            $merchant->SCP_number = $validatedData['SCP_number'];
            $merchant->DBA_name = $validatedData['DBA_name'];
            $merchant->date_open = $validatedData['date_open'];
            $merchant->date_closed = $validatedData['date_closed'];
            // Handle the date_closed field properly
            if (isset($validatedData['date_closed'])) {
                $merchant->date_closed = $validatedData['date_closed'];
                $merchant->account_status = 'P'; // Assuming date_closed exists, set status to 'P'
            } else {
                $merchant->date_closed = null; // If date_closed is null, set it to null
                $merchant->account_status = '0'; // Set status to '0'
            }
            $merchant->sales_id = $validatedData['sales_id'];
            $merchant->commission_percentage = $validatedData['commission_percentage'];

            // Update the merchant data
            DB::beginTransaction();
            $merchant->save();
            DB::commit();

            return response()->json(['message' => 'Merchant updated successfully']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to update merchant', 'error' => $e->getMessage()], 500);
        }
    }

    /**
     * Delete a merchant by ID.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request): JsonResponse
    {
        $merchant_id = $request->route('merchant_id');
        $merchant = Merchant::where('merchant_id', '=', $merchant_id)->first();
        // Check if the merchant exists
        if (!$merchant) {
            return response()->json(['message' => 'Merchant not found'], 404);
        }

        DB::beginTransaction();
        $merchant->delete();
        DB::commit();

        return response()->json(['message' => 'Merchant deleted successfully']);
    }
}
