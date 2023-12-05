<?php

namespace App\Http\Controllers;

use App\Helpers\DateRange;
use App\Models\CommissionPayoutRecord;
use App\Models\CreditCardTransaction;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Expr\Array_;

class DashboardController extends Controller
{
    /**
     * Get the list of salespersons.
     *
     * @return JsonResponse
     */
    public function getSalespersonList(): JsonResponse
    {
        // Retrieve users with specific fields where the role is 2(salesperson)
        $users = User::select('sales_id', 'first_name', 'last_name')->where('role','=', 2)->get();
        // Map the users to key-value pairs where the key is sales_id and the value is the concatenated first and last name
        $userList = $users->mapWithKeys(function ($user) {
            return [$user->sales_id => $user->first_name . ' ' . $user->last_name];
        })->toArray();

        return response()->json($userList);
    }

    /**
     * Get the total balance and increase rate for a specific salesperson.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function getTotalBalanceBySalesperson(Request $request): JsonResponse
    {
        // Extract salesperson from the request
        $salesPerson = $request->input('sales-person');

        // Get the last day of the last month
        $lastDayLastMonth = Carbon::now()->subMonth(1)->lastOfMonth();

        // Initialize query builder
        $query = CommissionPayoutRecord::query();

        // Apply salesperson filter if provided
        if ($salesPerson) {
            $query->where('sales_id', '=', $salesPerson);
        }

        // Retrieve commission data based on the constructed query
        $totalBalanceThisMonth =  $query->select(DB::raw('SUM(amount) as total_balance'))->first()->total_balance ?? 0;
        $totalBalanceLastMonth =  $query->select(DB::raw('SUM(amount) as total_balance_last_month'))
            ->where('date', '<=', $lastDayLastMonth)
            ->first()->total_balance_last_month ?? 0;
        $increaseRate = ($totalBalanceThisMonth - $totalBalanceLastMonth)/$totalBalanceLastMonth * 100 ;
        $balance = ['total' => $totalBalanceThisMonth, 'increaseRate' => $increaseRate];
        return response()->json($balance);
    }

    /**
     * Retrieves commission data per month for a specific salesperson within the last two years.
     *
     * @param Request $request The HTTP request containing the salesperson parameter.
     * @return JsonResponse The JSON response containing commission data grouped by month.
     */
    public function getCommissionPerMonthBySalesperson(Request $request): JsonResponse
    {
        // Extract salesperson from the request
        $salesPerson = $request->input('sales-person');

        // Get the first day of the last year
        $firstDayLastYear = Carbon::now()->subYear(1)->startOfYear();

        // Initialize query builder
        $query = CommissionPayoutRecord::query();

        // Apply salesperson filter if provided
        if ($salesPerson) {
            $query->where('sales_id', '=', $salesPerson);
        }

        // Retrieve commission data based on the constructed query
        $commissions = $query->select(DB::raw('DATE_FORMAT(date, "%Y-%m") as month'), DB::raw('SUM(amount) as month_amount'))
            ->where('type', '=','Commission')
            ->where('date', '>=', $firstDayLastYear) // Filter by date within the last two years
            ->groupBy('date')
            ->orderBy('date','asc')
            ->limit(24)
            ->get();

        // Supplement with zero values for missing months
        $commissions = $this->supplementWithZero($commissions);

        // Return the JSON response with the formatted commission data
        return response()->json($commissions);
    }

    /**
     * Retrieves transaction data based on the specified date range and salesperson filter.
     *
     * @param Request $request The HTTP request containing the date range and salesperson parameters.
     * @return JsonResponse The JSON response containing transaction data grouped by card type.
     */
    public function getTransactionByDateORSalesperson(Request $request): JsonResponse
    {
        // Extract date range and salesperson from the request
        $dateRange = $request->input('date-range');
        $salesPerson = $request->input('sales-person');
        // Get start and end dates based on the provided date range
        $startDate = DateRange::getStartAndEndDate($dateRange)['startDate'];
        $endDate = DateRange::getStartAndEndDate($dateRange)['endDate'];

        // Initialize query builder
        $query = CreditCardTransaction::join('merchants', 'credit_card_transactions.merchant_id', '=', 'merchants.merchant_id');

        // Apply date range filter if provided
        if ($startDate && $endDate) {
            $query->whereBetween('credit_card_transactions.pdate', [$startDate, $endDate]);
        }

        // Apply salesperson filter if provided
        if ($salesPerson) {
            $query->where('merchants.sales_id', '=', $salesPerson);
        }

        // Retrieve data based on the constructed query
        $result = $query->select(
            DB::raw('SUM(visa_gross_volume) as visa_transactionVolume'),
            DB::raw('SUM(visa_transaction_fee) as visa_transactionFee'),
            DB::raw('SUM(visa_commission) as visa_commission'),
            DB::raw('SUM(master_gross_volume) as master_transactionVolume'),
            DB::raw('SUM(master_transaction_fee) as master_transactionFee'),
            DB::raw('SUM(master_commission) as master_commission'),
            DB::raw('SUM(total_gross_volume) as total_transactionVolume'),
            DB::raw('SUM(total_transaction_fee) as total_transactionFee'),
            DB::raw('SUM(total_commission) as total_commission')
        )->first();

        // Format the result
        $transactions = [
            'VISA' => [
                'transactionVolume' => $result->visa_transactionVolume,
                'transactionFee' => $result->visa_transactionFee,
                'commission' => $result->visa_commission,
            ],
            'MASTER' => [
                'transactionVolume' => $result->master_transactionVolume,
                'transactionFee' => $result->master_transactionFee,
                'commission' => $result->master_commission,
            ],
            'Total' => [
                'transactionVolume' => $result->total_transactionVolume,
                'transactionFee' => $result->total_transactionFee,
                'commission' => $result->total_commission,
            ],
        ];

        // Return the JSON response with the formatted transaction data
        return response()->json($transactions);
    }

    /**
     * Retrieves the top 10 sales performances within a specified date range.
     *
     * @param Request $request The HTTP request containing the date range parameter.
     * @return JsonResponse The JSON response containing the top sales performances and the data date.
     */
    public function getTop10SalesByDate(Request $request): JsonResponse
    {
        // Extract date range from the request
        $dateRange = $request->input('date-range');
        // Get start and end dates based on the provided date range
        $startDate = DateRange::getStartAndEndDate($dateRange)['startDate'];
        $endDate = DateRange::getStartAndEndDate($dateRange)['endDate'];

        // Start building the query
        $query = CommissionPayoutRecord::join('users', 'commission_payout_records.sales_id', '=', 'users.sales_id');

        // Apply date range filter if both start and end dates are provided
        if ($startDate && $endDate) {
            $query->whereBetween('date', [$startDate, $endDate]);
        }

        // Execute the query to get top 10 sales performances
        $performances = $query->select('commission_payout_records.sales_id', 'users.first_name', 'users.last_name', DB::raw('SUM(commission_payout_records.amount) as total_amount'))
            ->where('commission_payout_records.type', '=','Commission')
            ->groupBy('commission_payout_records.sales_id')
            ->orderByDesc('total_amount')
            ->limit(10)
            ->get();

        // Assign ranks to each performance
        $rank = 1;
        $performances->each(function ($performance) use (&$rank) {
            $performance->rank = 'No.' . $rank;
            $rank++;
        });

        // Get the data date from the first record, assuming date is present in all records
        $dataDate = $performances->isNotEmpty() ? CommissionPayoutRecord::select('date')
            ->where('commission_payout_records.type', '=','Commission')->orderByDesc('date')->first() : null;

        // Return the response with top performances and data date
        return response()->json(['performances' => $performances, 'dataDate' => $dataDate]);
    }

    /**
     * Supplements the provided data with zero values for missing months.
     *
     * @param array $data The data to be supplemented.
     * @return array The supplemented data.
     */
    private function supplementWithZero($data)
    {
        $months = [];
        $currentDate = Carbon::now()->subYear(1)->startOfYear();

        // Generate an array of months for the last two years
        for ($i = 0; $i < 24; $i++) {
            $months[] = $currentDate->format('Y-m');
            $currentDate->addMonth();
        }

        // Convert the collection to an array
        $dataArray = $data->toArray();

        // Iterate through the data and fill in zero values for missing months
        foreach ($months as $month) {
            $found = false;

            foreach ($dataArray as $item) {
                if ($item['month'] === $month) {
                    $found = true;
                    break;
                }
            }

            if (!$found) {
                $dataArray[] = ['month' => $month, 'month_amount' => 0];
            }
        }

        // Sort the data by month
        usort($dataArray, function ($a, $b) {
            return strcmp($a['month'], $b['month']);
        });

        return $dataArray;
    }

}
