<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class UserController extends Controller
{
    /**
     * Retrieve and return a list of all users.
     */
    public function findAll(): JsonResponse
    {
        $users = User::orderBy('sales_id')->get();
        return response()->json($users);
    }

    /**
     * Retrieves a user from the database based on the provided sales ID.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function getById(Request $request): JsonResponse
    {
        $sales_id = $request->route('sales_id');

        $user = User::where('sales_id', '=', $sales_id)
            ->first();

        return response()->json($user);
    }

    public function checkSalesIDExistence($salesId)
    {
        try {
            $user = User::where('sales_id', $salesId)->first();
            if ($user) {
                return response()->json([
                    'exists' => true,
                    'firstName' => $user->first_name,
                    'lastName' => $user->last_name
                ]);
            } else {
                return response()->json(['exists' => false]);
            }
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while checking sales ID existence'], 500);
        }
    }

    /**
     * Search for users based on a provided keyword.
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
        // Search for users with a sales_id or name or email containing the provided keyword
        $users = User::where('sales_id', 'like', '%' . $keyword . '%')
            ->orWhere('first_name', 'like', '%' . $keyword . '%')
            ->orWhere('last_name', 'like', '%' . $keyword . '%')
            ->orWhere('email', 'like', '%' . $keyword . '%')
            ->orderBy('sales_id')
            ->get();

        // Return the list of matching users as a JSON response
        return response()->json($users);
    }

    /**
     * Create a new user.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function create(Request $request): JsonResponse
    {
        // Validate the request data
        $validatedData = $request->validate([
            'sales_id' => 'required|string|max:255|unique:users',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255|unique:users',
            'phone' => 'required|string|max:255',
            'address_street' => 'nullable|string|max:255',
            'address_city' => 'nullable|string|max:255',
            'address_province' => 'nullable|string|max:255',
            'address_country' => 'nullable|string|max:255',
            'address_postal_code' => 'nullable|string|max:255',
            'hire_date' => 'required|date',
            'status' => 'required',
            'role' => 'required'
        ]);

        // Auto-generate a random password
//        $password = Str::random(8);
        $password = "123";
        $validatedData['password'] = bcrypt($password);

        // Create a new user into Users table
        $user = User::create($validatedData);

        // Send the random password to the new user's email
//        Mail::to($user->email)->send(new NewUserWelcomeMail($user, $password));

        return response()->json($validatedData, 201);
    }

    /**
     * Get a new unique sales_id for a user.
     *
     * @return string
     */
    public function getNewId(): string
    {
        // Get the last sales_id from the database
        $lastSalesID = User::orderBy('sales_id', 'desc')->value('sales_id');

        // If there are no existing sales_id records, start with the initial value
        if (!$lastSalesID) {
            $newSalesID = 'Clove-001';
        } else {
            $sequence = (int)preg_replace('/[^0-9]/', '', $lastSalesID);
            $nextSequence = str_pad($sequence + 1, 3, '0', STR_PAD_LEFT);
            $newSalesID = 'Clove-' . $nextSequence;
        }

        // Check if there is any user with the given sales ID
        $existingUser = User::where('sales_id', '=', $newSalesID)->first();

        // Check if the new sales_id is unique
        while (!is_null($existingUser)) {
            // If not unique, generate another ID
            $sequence = (int)preg_replace('/[^0-9]/', '', $newSalesID);
            $nextSequence = str_pad($sequence + 1, 3, '0', STR_PAD_LEFT);
            $newSalesID = 'Clove-' . $nextSequence;
        }

        return $newSalesID;
    }

    /**
     * Update an existing user.
     *
     * @param Request $request
     * @param string $sales_id
     */
    public function update(Request $request): JsonResponse
    {
        $sales_id = $request->route('sales_id');

        // Validate the request data
        $validatedData = $request->validate([
            'first_name' => 'required|string',
            'last_name' => 'required|string',
            'email' => 'required|email',
            'phone' => 'required|string',
            'address_street' => 'nullable|string',
            'address_city' => 'nullable|string',
            'address_province' => 'nullable|string',
            'address_country' => 'nullable|string',
            'address_postal_code' => 'nullable|string',
            'hire_date' => 'required|date',
            'status' => 'required',
            'role' => 'required',
        ]);

        // Find the user by ID
        $user = User::where('sales_id', '=', $sales_id)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Update the user data
        $user->first_name = $validatedData['first_name'];
        $user->last_name = $validatedData['last_name'];
        $user->email = $validatedData['email'];
        $user->phone = $validatedData['phone'];
        $user->address_street = $validatedData['address_street'];
        $user->address_city = $validatedData['address_city'];
        $user->address_province = $validatedData['address_province'];
        $user->address_country = $validatedData['address_country'];
        $user->address_postal_code = $validatedData['address_postal_code'];
        $user->hire_date = $validatedData['hire_date'];
        $user->status = $validatedData['status'];
        $user->role = $validatedData['role'];
        $user->update();

        return response()->json(['message' => 'User updated successfully']);
    }

    /**
     * Delete an existing user.
     *
     * @param string $sales_id
     */
    public function delete(Request $request): JsonResponse
    {
        $sales_id = $request->route('sales_id');
        // Find the user by ID
        $user = User::where('sales_id', '=', $sales_id)->first();

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        // Delete the user
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

}
