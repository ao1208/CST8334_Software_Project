<?php

namespace App\Http\Controllers;

use App\Helpers\SheetInfo;
use App\Models\SourceMasterRecord;
use App\Models\SourceVisaRecord;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Carbon;
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
        $success_msg = '';

        foreach ($sheet_names as $month) {
            $sheet_info_1 = new SheetInfo(env('VISA_SPREAD_SHEET_ID'), $month, 'A3:AA');
            $sheet_info_2 = new SheetInfo(env('MASTERCARD_SPREAD_SHEET_ID'), $month, 'A3:AA');
//        $sheet_info_3 = new SheetInfo(env('SALES_PERFORMANCE_SPREAD_SHEET_ID'), 'sales report', 'A3:D');

            $rows_data_1 = self::fetch($sheet_info_1);
            $rows_data_2 = self::fetch($sheet_info_2);

            // return successful message
            $success_msg = self::saveVisaRecords($rows_data_1);
            $log[] .= $success_msg;
            $success_msg = self::saveMasterRecords($rows_data_2);
            $log[] .= $success_msg;
        }
        return Response($log, 200);
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

}
