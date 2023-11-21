<?php

namespace App\Http\Controllers;

use App\Helpers\Formatter;
use App\Helpers\SheetInfo;
use App\Models\CommissionPayoutRecord;
use App\Models\CreditCardTransaction;
use App\Models\ImportLog;
use App\Models\SourceMasterRecord;
use App\Models\SourceVisaRecord;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\Foreach_;
use Revolution\Google\Sheets\Facades\Sheets;

class GoogleSheetController extends Controller
{
    /**
     * Fetch data from Google Sheets.
     *
     * @param SheetInfo $sheet_info
     * @return array array
     */
    public function fetch(SheetInfo $sheet_info): array
    {
        return Sheets::spreadsheet($sheet_info->getId())
            ->sheet($sheet_info->getNameAndRange())
            ->get()
            ->toArray();
    }

    /**
     * Download and save data from Google Sheets.
     *
     * @param Request $request
     * @return Response
     */
    public function download(Request $request): Response
    {
        $dateFrom = $request->input('dateFrom');
        $dateTo = $request->input('dateTo');

        // Parse the input dates using Carbon
        $start = Carbon::parse($dateFrom);
        $end = Carbon::parse($dateTo);

        // Initialize an array to store the month names
        $sheet_names = [];

        // Loop through each month between the given dates
        while ($start->lte($end)) {
            // Get the month name and add it to the array
            $sheet_names[] = $start->format('M');

            // Move to the next month
            $start->addMonth();
        }

        $log = [];

        foreach ($sheet_names as $month) {
            $visa_sheet_info = new SheetInfo(env('VISA_SPREAD_SHEET_ID'), $month, 'A3:AA');
            $master_sheet_info = new SheetInfo(env('MASTERCARD_SPREAD_SHEET_ID'), $month, 'A3:AA');
//        $sheet_info_3 = new SheetInfo(env('SALES_PERFORMANCE_SPREAD_SHEET_ID'), 'sales report', 'A3:D');

            $visa_existed_dates = SourceVisaRecord::distinct()->orderBy('pdate')->pluck('pdate')->toArray();
            $visa_rows_data = self::fetch($visa_sheet_info);
            foreach ($visa_rows_data as $visa_row) {
                $date = Formatter::formatDate($visa_row[0]);
                if (!in_array($date, $visa_existed_dates)) {
                    self::saveVisaRecord($visa_row);
                }
            }
            $log[] .= 'Successfully saved Google Sheets visa records into DB.';

            $master_existed_dates = SourceMasterRecord::distinct()->orderBy('pdate')->pluck('pdate')->toArray();
            $master_rows_data = self::fetch($master_sheet_info);
            foreach ($master_rows_data as $master_row) {
                $date = Formatter::formatDate($master_row[0]);
                if (!in_array($date, $master_existed_dates)) {
                    self::saveMasterRecord($master_row);
                }
            }
            $log[] .= 'Successfully saved Google Sheets master records into DB.';
        }

        $log[] .= self::saveTransactions();
        $log[] .= self::saveCommissionPayoutRecords();

        return Response($log, 200);
    }

    /**
     * Save Visa records into the database.
     *
     * @param array $rows_data
     * @return string
     */
    private function saveVisaRecord(array $row): int
    {
        $visa_record = [
            'pdate' => $row[0],
            'merchant_id' => $row[1],
            'scp_number' => $row[2],
            'dba_name' => $row[3],
            'date_open' => $row[5],
            'date_closed' => $row[6],
            'account_status' => $row[7],
            'gross_volume' => $row[12],
            'transaction_fee' => $row[26]
        ];
        SourceVisaRecord::create($visa_record);
        return 1;
    }

    /**
     * Save Visa records into the database.
     *
     * @param array $rows_data
     * @return string
     */
    private function saveVisaRecords(array $rows_data): string
    {
        foreach ($rows_data as $row_data) {
            $visa_record = [
                'pdate' => $row_data[0],
                'merchant_id' => $row_data[1],
                'scp_number' => $row_data[2],
                'dba_name' => $row_data[3],
                'date_open' => $row_data[5],
                'date_closed' => $row_data[6],
                'account_status' => $row_data[7],
                'gross_volume' => $row_data[12],
                'transaction_fee' => $row_data[26]
            ];
            SourceVisaRecord::create($visa_record);
        }
        return 'Successfully saved Google Sheets visa records into DB.';
    }

    /**
     * Save Master records into the database.
     *
     * @param array $row
     * @return string
     */
    private function saveMasterRecord(array $row): int
    {
        $master_record = [
            'pdate' => $row[0],
            'merchant_id' => $row[1],
            'scp_number' => $row[2],
            'dba_name' => $row[3],
            'date_open' => $row[5],
            'date_closed' => $row[6],
            'account_status' => $row[7],
            'gross_volume' => $row[12],
            'transaction_fee' => $row[26]
        ];
        SourceMasterRecord::create($master_record);
        return 1;
    }

    /**
     * Save Master records into the database.
     *
     * @param array $rows_data
     * @return string
     */
    private function saveMasterRecords(array $rows_data): string
    {
        foreach ($rows_data as $row_data) {
            $master_record = [
                'pdate' => $row_data[0],
                'merchant_id' => $row_data[1],
                'scp_number' => $row_data[2],
                'dba_name' => $row_data[3],
                'date_open' => $row_data[5],
                'date_closed' => $row_data[6],
                'account_status' => $row_data[7],
                'gross_volume' => $row_data[12],
                'transaction_fee' => $row_data[26]
            ];
            SourceMasterRecord::create($master_record);
        }
        return 'Successfully saved Google Sheets master records into DB.';
    }

    /**
     * Process and save credit card transaction records.
     *
     * This method retrieves unprocessed Visa and MasterCard records, calculates commissions, and inserts or updates
     * corresponding credit card transaction records in the database.
     *
     * @return string
     */
    public function saveTransactions(): string
    {
        $existed_dates = CreditCardTransaction::distinct()->orderBy('pdate')->pluck('pdate')->toArray();
        // Retrieve unprocessed Visa records from the source Visa records table
        $visa_records = DB::table('source_visa_records')
            ->select('pdate', 'merchant_id', 'gross_volume', 'transaction_fee')
            ->get();
        // Process and insert Visa records into the credit card transactions table
        foreach ($visa_records as $visa_record) {
            if (!in_array($visa_record->pdate, $existed_dates)) {
                // Get the commission percentage for the merchant table
                $percent = DB::table('merchants')->where('merchant_id', '=', $visa_record->merchant_id)->value('commission_percentage');
                // Prepare the data for the credit card transaction record
                $record = [
                    'pdate' => $visa_record->pdate,
                    'merchant_id' => $visa_record->merchant_id,
                    'visa_gross_volume' => $visa_record->gross_volume,
                    'visa_transaction_fee' => $visa_record->transaction_fee,
                    'visa_commission' => ROUND($percent * $visa_record->transaction_fee, 2),
                    'total_gross_volume' => ROUND($visa_record->gross_volume, 2),
                    'total_transaction_fee' => ROUND($visa_record->transaction_fee, 2),
                    'total_commission' => ROUND($percent * $visa_record->transaction_fee, 2)
                ];
                // Create a new credit card transaction record
                CreditCardTransaction::create($record);
            }
        }

        // Retrieve unprocessed MasterCard records from the source Master records table
        $master_records = DB::table('source_master_records')
            ->select('pdate', 'merchant_id', 'gross_volume', 'transaction_fee')
            ->get();
        // Process and insert MasterCard records into the credit card transactions table
        foreach ($master_records as $master_record) {
            if (in_array($master_record->pdate, $existed_dates)) {
                // Check if a credit card transaction record with the same merchant_id exists
                $record = DB::table('credit_card_transactions')->where('merchant_id', '=', $master_record->merchant_id)->first();

                // Get the commission percentage for the merchant table
                $percent = DB::table('merchants')->where('merchant_id', '=', $master_record->merchant_id)->value('commission_percentage');

                if ($record) {
                    // Update the existing credit card transaction record
                    DB::table('credit_card_transactions')
                        ->where('merchant_id', $master_record->merchant_id)
                        ->update([
                            'master_gross_volume' => $master_record->gross_volume,
                            'master_transaction_fee' => $master_record->transaction_fee,
                            'master_commission' => ROUND($percent * $master_record->transaction_fee, 2),
                            'total_gross_volume' => DB::raw('ROUND(total_gross_volume + ' . $master_record->gross_volume . ', 2)'),
                            'total_transaction_fee' => DB::raw('ROUND(total_transaction_fee + ' . $master_record->transaction_fee . ', 2)'),
                            'total_commission' => DB::raw('ROUND(total_commission + ' . ($percent * $master_record->transaction_fee) . ', 2)'),
                        ]);
                } else {
                    // Create a new credit card transaction record for the MasterCard data
                    $record = [
                        'pdate' => $master_record->pdate,
                        'merchant_id' => $master_record->merchant_id,
                        'master_gross_volume' => $master_record->gross_volume,
                        'master_transaction_fee' => $master_record->transaction_fee,
                        'master_commission' => ROUND($percent * $master_record->transaction_fee, 2),
                        'total_gross_volume' => ROUND($master_record->gross_volume, 2),
                        'total_transaction_fee' => ROUND($master_record->transaction_fee, 2),
                        'total_commission' => ROUND($percent * $master_record->transaction_fee, 2)
                    ];
                    CreditCardTransaction::create($record);
                }
            }
        }
        return 'Transactions Saved.';
    }

    /**
     * Save commission payout records based on credit card transactions.
     *
     * @return string
     */
    public function saveCommissionPayoutRecords(): string
    {
        // Retrieve existing commission payout dates from the database
        $existed_dates = CommissionPayoutRecord::distinct()->orderBy('date')->pluck('date')->toArray();
        // Load the related merchant data with eager loading
        $commissions = CreditCardTransaction::with('merchant')->get();
        // Initialize an associative array to store commission totals by sales_id
        $salesIdTotals = [];
        // Initialize an array to store new commission payout records
        $rows = [];
        $pdates = [];
        $import_logs = [];

        foreach ($commissions as $commission) {
            // Check if the commission date does not exist in the database
            if (!in_array($commission->pdate, $existed_dates)) {
                // Get sales ID
                $salesId = $commission->merchant->sales_id;
                // Get commission date
                $pdate= $commission->pdate;
                // Check if 'number_of_merchant' is already set for the current date
                if (!isset($import_logs[$pdate])) {
                    array_push($pdates, $pdate);
                    $import_logs[$pdate]['number_of_merchant'] = 1; // If not set, initialize it to 1
                } else {
                    $import_logs[$pdate]['number_of_merchant'] += 1; // If already set, increment the value by 1
                }

                // Check if sales_id is already present in the associative array
                if (isset($salesIdTotals[$salesId])) {
                    $total = $salesIdTotals[$salesId]['balance'] + $commission->total_commission;
                    // Create a new commission payout record
                    $row = [
                        'date' => $commission->pdate,
                        'sales_id' => $commission->merchant->sales_id,
                        'merchant_id' => $commission->merchant_id,
                        'type' => 'Commission',
                        'amount' => $commission->total_commission,
                        'balance' => $total,
                        'comment' => 'Commission For ' . \Carbon\Carbon::parse($commission->pdate)->format('F, Y')
                    ];
                    // Add the row to the array
                    array_push($rows, $row);
                    // Update the balance in the associative array
                    $salesIdTotals[$salesId]['balance'] = $total;
                } else {
                    // Fetch the last total balance for the sales_id from the database
                    $last_total = 0;
                    $last_record = DB::table('commission_payout_records')
                        ->where('sales_id', '=', $salesId)
                        ->orderByDesc('date')
                        ->first();
                    // If the last record exists, update the last total
                    if ($last_record) {
                        $last_total = $last_record->balance;
                    }
                    // If the sales_id doesn't exist in the associative array, create a new entry
                    $row = [
                        'date' => $commission->pdate,
                        'sales_id' => $commission->merchant->sales_id,
                        'merchant_id' => $commission->merchant_id,
                        'type' => 'Commission',
                        'amount' => $commission->total_commission,
                        'balance' => $last_total + $commission->total_commission,
                        'comment' => 'Commission For ' . Carbon::parse($commission->pdate)->format('F, Y')
                    ];
                    // Add the row to the array
                    array_push($rows, $row);
                    // Update the balance in the associative array
                    $salesIdTotals[$salesId]['balance'] = $last_total + $commission->total_commission;
                }
            }
        }
        // Insert the new commission payout records into the database
        foreach ($rows as $row) {
            CommissionPayoutRecord::create($row);
        }

        // Iterate over $import_logs to create ImportLog records
        foreach ($import_logs as $pdate => $import_log) {
            $log = [
                'pdate' => $pdate,
                'number_of_merchant' => $import_logs[$pdate]['number_of_merchant'],
                'sales_id' => 'Clover-008',
//                        'sales_id' => auth()->user()->sales_id,
                'deleted_datetime' => null,
            ];
            ImportLog::create($log);
        }

        // Return a success message
        return 'Commission Payouts and Logs Saved.';
    }
}
