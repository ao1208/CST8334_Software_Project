<?php

namespace App\Http\Controllers;

use App\Models\CommissionPayoutRecord;
use App\Models\CreditCardTransaction;
use App\Models\SourceMasterRecord;
use App\Models\SourceVisaRecord;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

/**
 * Class DBController
 *
 * This class handles the task of processing and saving credit card transaction records.
 *
 * @package App\Http\Controllers
 */
class DBController extends Controller
{
    /**
     * Process and save credit card transaction records.
     *
     * This method retrieves unprocessed Visa and MasterCard records, calculates commissions, and inserts or updates
     * corresponding credit card transaction records in the database.
     *
     * @return void
     */
    public function saveTransactions(): void
    {
        // Retrieve unprocessed Visa records from the source Visa records table
        $visa_records = DB::table('source_visa_records')
            ->where('is_saved', '=', 0)
            ->select('pdate', 'merchant_id', 'gross_volume', 'transaction_fee')
            ->get();
        // Process and insert Visa records into the credit card transactions table
        foreach ($visa_records as $visa_record) {
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

        // Retrieve unprocessed MasterCard records from the source Master records table
        $master_records = DB::table('source_master_records')
            ->where('is_saved', '=', 0)
            ->select('pdate', 'merchant_id', 'gross_volume', 'transaction_fee')
            ->get();

        // Process and insert MasterCard records into the credit card transactions table
        foreach ($master_records as $master_record) {
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

            // Update the is_saved column to 1 in VISA and MasterCard resource table
            SourceVisaRecord::where('is_saved', 0)->update(['is_saved' => 1]);
            SourceMasterRecord::where('is_saved', 0)->update(['is_saved' => 1]);
        }
    }

    //TODO: Not finished yet, need to filter the new inserting transactions according to pdate.
    public function saveCommissionPayoutRecords(): void
    {
        $commissions = DB::table('credit_card_transactions')
//            ->where('pdate', '=', $date)
            ->select('pdate', 'merchant_id', 'total_commission')
            ->get();
        // Load the related merchant data
        $commissions = CreditCardTransaction::with('merchant')->get();

        // Initialize an associative array to store commission totals by sales_id
//        $salesIdTotals = [];
//        $rows = [];

        foreach ($commissions as $commission) {

//            $salesId = $commission->merchant->sales_id;
//
//            if (isset($salesIdTotals[$salesId])) {
//                $total = $salesIdTotals[$salesId]['balance'] + $commission->total_commission;
//                $row = [
//                    'date' => $commission->pdate,
//                    'sales_id' => $commission->merchant->sales_id,
//                    'merchant_id' => $commission->merchant_id,
//                    'type' => 'Commission',
//                    'amount' => $commission->total_commission,
//                    'balance' => $total,
//                    'comment' => 'Commission For ' . Carbon::parse($commission->pdate)->format('F, Y')
//                ];
//                $row = [
//                    'date' => '2023-01-01',
//                    'sales_id' => 'sales_id',
//                    'merchant_id' => '01',
//                    'type' => 'com',
//                    'amount' => 100,
//                    'balance' => 200,
//                    'comment' => 'comment'
//                ];
//                $rows += $row;
//                $salesIdTotals[$salesId]['balance'] = $total;
//            } else {
                // If it doesn't exist, create a new entry for the sales_id
//                $row = [
//                    'date' => $commission->pdate,
//                    'sales_id' => $commission->merchant->sales_id,
//                    'merchant_id' => $commission->merchant_id,
//                    'type' => 'Commission',
//                    'amount' => $commission->total_commission,
//                    'balance' => $commission->total_commission,
//                    'comment' => 'Commission For ' . Carbon::parse($commission->pdate)->format('F, Y')
//                ];
//                $row = [
//                    'date' => '2023-01-01',
//                    'sales_id' => 'sales_id',
//                    'merchant_id' => '01',
//                    'type' => 'com',
//                    'amount' => 100,
//                    'balance' => 200,
//                    'comment' => 'comment'
//                ];
//                $rows += $row;
//                $salesIdTotals[$salesId]['balance'] = $commission->total_commission;
//            }

            // Prepare the data for the commission payout record
            $record = [
                'date' => $commission->pdate,
                'sales_id' => $commission->merchant->sales_id,
                'merchant_id' => $commission->merchant_id,
                'type' => 'Commission',
                'amount' => $commission->total_commission,
                'balance' => $commission->total_commission,
                'comment' => 'Commission For ' . Carbon::parse($commission->pdate)->format('F, Y')
            ];
            CommissionPayoutRecord::create($record);
        }
//        foreach ($rows as $row) {
            // Create a new commission payout record
//            CommissionPayoutRecord::create($row);
//        }
    }
}
