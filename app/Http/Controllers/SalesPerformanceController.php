<?php

namespace App\Http\Controllers;

use App\Helpers\DateRange;
use App\Models\CreditCardTransaction;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SalesPerformanceController extends Controller
{
    /**
     * Retrieve all credit card transaction data along with related merchant and user information.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function findAll(Request $request): JsonResponse
    {
        // Set the default values for page and perPage
        $perPage = $request->input('perPage', 10);

        // Load the related merchant and user data using joins
        $performances = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
            ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
            ->select('pdate','merchants.merchant_id', 'DBA_name','visa_gross_volume', 'visa_transaction_fee',
                'master_gross_volume','master_transaction_fee','total_commission', 'users.sales_id',
                'users.first_name', 'users.last_name', 'merchants.commission_percentage')
            ->orderBy('pdate','asc')->orderBy('users.sales_id','asc')
            ->paginate($perPage);

        return response()->json($performances);
    }

    /**
     * Retrieve credit card transaction data based on date range and/or keyword search.
     *
     * @param \Illuminate\Http\Request $request The HTTP request instance.
     * @return \Illuminate\Http\JsonResponse
     */
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
        $query = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
            ->join('users', 'merchants.sales_id', '=', 'users.sales_id');

        // Apply date range filter
        if ($startDate && $endDate) {
            $query = $query->whereBetween('pdate', [$startDate, $endDate]);
        }

        // Apply keyword search
        if ($keyword) {
            $query = $query->where(function ($q) use ($keyword) {
                  $q->where('credit_card_transactions.merchant_id', 'like', "%$keyword%")
                    ->orWhere('DBA_name', 'like', "%$keyword%")
                    ->orWhere('users.sales_id', 'like', "%$keyword%")
                    ->orWhere('users.first_name', 'like', "%$keyword%")
                    ->orWhere('users.last_name', 'like', "%$keyword%");
            });
        }

        $performances = $query->select('pdate','merchants.merchant_id', 'DBA_name',
            'visa_gross_volume', 'visa_transaction_fee', 'master_gross_volume','master_transaction_fee',
            'total_commission', 'users.sales_id', 'users.first_name', 'users.last_name', 'merchants.commission_percentage')
            ->orderBy('pdate','asc')->orderBy('users.sales_id','asc')
            ->paginate($perPage);;

        return response()->json($performances);
    }

    /**
     * Generate a comprehensive report of credit card transactions based on the selected option.
     *
     * @param \Illuminate\Http\Request $request The HTTP request instance.
     * @return \Illuminate\Http\JsonResponse
     */
    public function reportAll(Request $request): JsonResponse
    {
        // Extract the selected option from the request
        $selectedOption = $request->input('option');
        // Initialize an empty array to store the report data
        $report = [];
        // Check the selected option and build the report accordingly
        if ($selectedOption === "salesperson") {
            $aggregates = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                ->select('users.sales_id as salesId',
                    DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                    DB::raw('YEAR(pdate) as dateRange'),
                    DB::raw('SUM(visa_gross_volume) as visaGross'),
                    DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                    DB::raw('SUM(master_gross_volume) as masterGross'),
                    DB::raw('SUM(master_transaction_fee) as masterTXN'),
                    DB::raw('SUM(total_commission) as commission'))
                ->groupBy('users.sales_id', DB::raw('YEAR(pdate)'))
                ->orderBy('users.sales_id')
                ->get();
            foreach ($aggregates as $aggregate) {
                $months = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                    ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                    ->select('users.sales_id as salesId',
                        DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                        DB::raw('CONCAT(YEAR(pdate), "/", MONTH(pdate)) as dateRange'),
                        DB::raw('SUM(visa_gross_volume) as visaGross'),
                        DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                        DB::raw('SUM(master_gross_volume) as masterGross'),
                        DB::raw('SUM(master_transaction_fee) as masterTXN'),
                        DB::raw('SUM(total_commission) as commission'))
                    ->groupBy('dateRange', 'users.sales_id')
                    ->orderBy('dateRange')
                    ->where('users.sales_id', '=', $aggregate->salesId)
                    ->get();
                $months->transform(function ($month) {
                    $month->balance = "";
                    $month->payout = "";
                    return $month;
                });
                $report[] = [
                    'salesId' => $aggregate->salesId,
                    'salesName' => $aggregate->salesName,
                    'dateRange' => $aggregate->dateRange,
                    'visaGross' => $aggregate->visaGross,
                    'visaTXN' => $aggregate->visaTXN,
                    'masterGross' => $aggregate->masterGross,
                    'masterTXN' => $aggregate->masterTXN,
                    'balance' => "",
                    'commission' => $aggregate->commission,
                    'payout' => "",
                    'details' => $months,
                ];
            }
        } else {
            $aggregates = CreditCardTransaction::select('pdate',
                DB::raw('SUM(visa_gross_volume) as visaGross'),
                DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                DB::raw('SUM(master_gross_volume) as masterGross'),
                DB::raw('SUM(master_transaction_fee) as masterTXN'),
                DB::raw('SUM(total_commission) as commission'))
                ->groupBy('pdate')
                ->orderByDesc('pdate')
                ->get();
            foreach ($aggregates as $aggregate) {
                $salespersons = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                    ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                    ->select('pdate as pDate', 'users.sales_id as salesId',
                        DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                        DB::raw('SUM(visa_gross_volume) as visaGross'),
                        DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                        DB::raw('SUM(master_gross_volume) as masterGross'),
                        DB::raw('SUM(master_transaction_fee) as masterTXN'),
                        DB::raw('SUM(total_commission) as commission'))
                    ->groupBy('pdate', 'users.sales_id')
                    ->orderByDesc('pdate')
                    ->where('pdate', '=', $aggregate->pdate)
                    ->get();
                $salespersons->transform(function ($salesperson) {
                    $salesperson->balance = "";
                    $salesperson->payout = "";
                    return $salesperson;
                });
                $report[] = [
                    'pDate' => $aggregate->pdate,
                    'salesId' => "",
                    'salesName' => "",
                    'visaGross' => $aggregate->visaGross,
                    'visaTXN' => $aggregate->visaTXN,
                    'masterGross' => $aggregate->masterGross,
                    'masterTXN' => $aggregate->masterTXN,
                    'balance' => "",
                    'commission' => $aggregate->commission,
                    'payout' => "",
                    'details' => $salespersons,
                ];
            }
        }
        return response()->json($report);
    }

    /**
     * Generate a comprehensive report of credit card transactions based on the date range and selected option.
     *
     * @param \Illuminate\Http\Request $request The HTTP request instance.
     * @return \Illuminate\Http\JsonResponse
     */
    public function reportByDate(Request $request): JsonResponse
    {
        // Extract the date range and selected option from the request
        $startDate = $request->input('startDate');
        $endDate = $request->input('endDate');
        $selectedOption = $request->input('option');
        // Initialize an empty array to store the report data
        $report = [];
        // Check the selected option and build the report accordingly
        if ($selectedOption === "salesperson") {
            // Apply date range filter
            if ($startDate && $endDate) {
                $aggregates = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                    ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                    ->select('users.sales_id as salesId',
                        DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                        DB::raw('YEAR(pdate) as dateRange'),
                        DB::raw('SUM(visa_gross_volume) as visaGross'),
                        DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                        DB::raw('SUM(master_gross_volume) as masterGross'),
                        DB::raw('SUM(master_transaction_fee) as masterTXN'),
                        DB::raw('SUM(total_commission) as commission'))
                    ->whereBetween('pdate', [$startDate, $endDate])
                    ->groupBy('users.sales_id', DB::raw('YEAR(pdate)'))
                    ->orderBy('users.sales_id')
                    ->get();
                foreach ($aggregates as $aggregate) {
                    $months = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                        ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                        ->select('users.sales_id as salesId',
                            DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                            DB::raw('CONCAT(YEAR(pdate), "/", MONTH(pdate)) as dateRange'),
                            DB::raw('SUM(visa_gross_volume) as visaGross'),
                            DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                            DB::raw('SUM(master_gross_volume) as masterGross'),
                            DB::raw('SUM(master_transaction_fee) as masterTXN'),
                            DB::raw('SUM(total_commission) as commission'))
                        ->whereBetween('pdate', [$startDate, $endDate])
                        ->groupBy('dateRange', 'users.sales_id')
                        ->orderBy('dateRange')
                        ->where('users.sales_id', '=', $aggregate->salesId)
                        ->get();
                    $months->transform(function ($month) {
                        $month->balance = "";
                        $month->payout = "";
                        return $month;
                    });
                    $report[] = [
                        'salesId' => $aggregate->salesId,
                        'salesName' => $aggregate->salesName,
                        'dateRange' => $aggregate->dateRange,
                        'visaGross' => $aggregate->visaGross,
                        'visaTXN' => $aggregate->visaTXN,
                        'masterGross' => $aggregate->masterGross,
                        'masterTXN' => $aggregate->masterTXN,
                        'balance' => "",
                        'commission' => $aggregate->commission,
                        'payout' => "",
                        'details' => $months,
                    ];
                }
            } else {
                $aggregates = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                    ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                    ->select('users.sales_id as salesId',
                        DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                        DB::raw('YEAR(pdate) as dateRange'),
                        DB::raw('SUM(visa_gross_volume) as visaGross'),
                        DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                        DB::raw('SUM(master_gross_volume) as masterGross'),
                        DB::raw('SUM(master_transaction_fee) as masterTXN'),
                        DB::raw('SUM(total_commission) as commission'))
                    ->groupBy('users.sales_id', DB::raw('YEAR(pdate)'))
                    ->orderBy('users.sales_id')
                    ->get();
                foreach ($aggregates as $aggregate) {
                    $months = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                        ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                        ->select('users.sales_id as salesId',
                            DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                            DB::raw('CONCAT(YEAR(pdate), "/", MONTH(pdate)) as dateRange'),
                            DB::raw('SUM(visa_gross_volume) as visaGross'),
                            DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                            DB::raw('SUM(master_gross_volume) as masterGross'),
                            DB::raw('SUM(master_transaction_fee) as masterTXN'),
                            DB::raw('SUM(total_commission) as commission'))
                        ->groupBy('dateRange', 'users.sales_id')
                        ->orderBy('dateRange')
                        ->where('users.sales_id', '=', $aggregate->salesId)
                        ->get();
                    $months->transform(function ($month) {
                        $month->balance = "";
                        $month->payout = "";
                        return $month;
                    });
                    $report[] = [
                        'salesId' => $aggregate->salesId,
                        'salesName' => $aggregate->salesName,
                        'dateRange' => $aggregate->dateRange,
                        'visaGross' => $aggregate->visaGross,
                        'visaTXN' => $aggregate->visaTXN,
                        'masterGross' => $aggregate->masterGross,
                        'masterTXN' => $aggregate->masterTXN,
                        'balance' => "",
                        'commission' => $aggregate->commission,
                        'payout' => "",
                        'details' => $months,
                    ];
                }
            }
        } else {
            // Apply date range filter
            if ($startDate && $endDate) {
                $aggregates = CreditCardTransaction::select('pdate',
                    DB::raw('SUM(visa_gross_volume) as visaGross'),
                    DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                    DB::raw('SUM(master_gross_volume) as masterGross'),
                    DB::raw('SUM(master_transaction_fee) as masterTXN'),
                    DB::raw('SUM(total_commission) as commission'))
                    ->whereBetween('pdate', [$startDate, $endDate])
                    ->groupBy('pdate')
                    ->orderByDesc('pdate')
                    ->get();
                foreach ($aggregates as $aggregate) {
                    $salespersons = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                        ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                        ->select('pdate as pDate', 'users.sales_id as salesId',
                            DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                            DB::raw('SUM(visa_gross_volume) as visaGross'),
                            DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                            DB::raw('SUM(master_gross_volume) as masterGross'),
                            DB::raw('SUM(master_transaction_fee) as masterTXN'),
                            DB::raw('SUM(total_commission) as commission'))
                        ->groupBy('pdate', 'users.sales_id')
                        ->orderByDesc('pdate')
                        ->where('pdate', '=', $aggregate->pdate)
                        ->get();
                    $salespersons->transform(function ($salesperson) {
                        $salesperson->balance = "";
                        $salesperson->payout = "";
                        return $salesperson;
                    });
                    $report[] = [
                        'pDate' => $aggregate->pdate,
                        'salesId' => "",
                        'salesName' => "",
                        'visaGross' => $aggregate->visaGross,
                        'visaTXN' => $aggregate->visaTXN,
                        'masterGross' => $aggregate->masterGross,
                        'masterTXN' => $aggregate->masterTXN,
                        'balance' => "",
                        'commission' => $aggregate->commission,
                        'payout' => "",
                        'details' => $salespersons,
                    ];
                }
            }else{
                $aggregates = CreditCardTransaction::select('pdate',
                    DB::raw('SUM(visa_gross_volume) as visaGross'),
                    DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                    DB::raw('SUM(master_gross_volume) as masterGross'),
                    DB::raw('SUM(master_transaction_fee) as masterTXN'),
                    DB::raw('SUM(total_commission) as commission'))
                    ->groupBy('pdate')
                    ->orderByDesc('pdate')
                    ->get();
                foreach ($aggregates as $aggregate) {
                    $salespersons = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id')
                        ->join('users', 'merchants.sales_id', '=', 'users.sales_id')
                        ->select('pdate as pDate', 'users.sales_id as salesId',
                            DB::raw('CONCAT(first_name, " ", last_name) as salesName'),
                            DB::raw('SUM(visa_gross_volume) as visaGross'),
                            DB::raw('SUM(visa_transaction_fee) as visaTXN'),
                            DB::raw('SUM(master_gross_volume) as masterGross'),
                            DB::raw('SUM(master_transaction_fee) as masterTXN'),
                            DB::raw('SUM(total_commission) as commission'))
                        ->groupBy('pdate', 'users.sales_id')
                        ->orderByDesc('pdate')
                        ->where('pdate', '=', $aggregate->pdate)
                        ->get();
                    $salespersons->transform(function ($salesperson) {
                        $salesperson->balance = "";
                        $salesperson->payout = "";
                        return $salesperson;
                    });
                    $report[] = [
                        'pDate' => $aggregate->pdate,
                        'salesId' => "",
                        'salesName' => "",
                        'visaGross' => $aggregate->visaGross,
                        'visaTXN' => $aggregate->visaTXN,
                        'masterGross' => $aggregate->masterGross,
                        'masterTXN' => $aggregate->masterTXN,
                        'balance' => "",
                        'commission' => $aggregate->commission,
                        'payout' => "",
                        'details' => $salespersons,
                    ];
                }
            }
        }
        return response()->json($report);
    }

    //TODO: not finish yet(for salesperson page)
    public function findAllBySalesperson(): JsonResponse
    {
        // Check if the user is authenticated
        if (!auth()->check()) {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        // Get the ID of the authenticated user
        $userId = auth()->id();
        // Retrieve the user by ID
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['error' => 'User not found'], 404);
        }
        // Access the user's name
        $salesId = $user->sales_id;

        // Load the related merchant and user data
        $performances = CreditCardTransaction::with('merchant.user')
            ->where('sales_id', '=', $salesId)
            ->get();

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
}
