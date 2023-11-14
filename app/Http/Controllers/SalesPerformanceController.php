<?php

namespace App\Http\Controllers;

use App\Models\CreditCardTransaction;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SalesPerformanceController extends Controller
{
    /**
     * Retrieve a list of all sales performances with related data.
     *
     * This function loads the related merchant and user data for each sales performance
     * and transforms the results to include additional information such as sales_id,
     * user's first and last name, commission percentage, and DBA name.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function findAll(): JsonResponse
    {
        // Load the related merchant and user data
        $performances = CreditCardTransaction::with('merchant.user')->get();

        $performances->transform(function ($performance) {
            $performance->sales_id = $performance->merchant->sales_id;
            $performance->user_first_name = $performance->merchant->user->first_name;
            $performance->user_last_name = $performance->merchant->user->last_name;
            $performance->commission_percentage = $performance->merchant->commission_percentage;
            $performance->DBA_name = $performance->merchant->DBA_name;
            return $performance;
        });

        return response()->json($performances);
    }

    /**
     * Filter sales performances based on date range and keyword.
     *
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function findByDateAndKeyword(Request $request): JsonResponse
    {

        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $keyword = $request->input('keyword');

        // Start building the query
        $query = CreditCardTransaction::with('merchant.user');

        // Apply date range filter
        if ($startDate && $endDate) {
            $query->whereBetween('pdate', [$startDate, $endDate]);
        }

        // Apply keyword search
        if ($keyword) {
        $query = $query ->whereHas('merchant', function ($merchantQuery) use ($keyword) {
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
        $performances = $query->get();

        $performances->transform(function ($performance) {
            $performance->sales_id = $performance->merchant->sales_id;
            $performance->user_first_name = $performance->merchant->user->first_name;
            $performance->user_last_name = $performance->merchant->user->last_name;
            $performance->commission_percentage = $performance->merchant->commission_percentage;
            $performance->DBA_name = $performance->merchant->DBA_name;
            return $performance;
        });

        return response()->json($performances);
    }

    //TODO: implement the report function
    public function reportAllByMonth(){}
    public function reportDateRangeByMonth($dateRange){}
    public function reportAllBySalesperson(){}
    public function reportDateRangeBySalesperson($dateRange){}




}
