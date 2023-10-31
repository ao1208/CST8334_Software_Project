<?php

namespace App\Http\Controllers;

use App\Helpers\SheetInfo;
use App\Models\SourceMasterRecord;
use App\Models\SourceVisaRecord;
use Illuminate\Http\Response;
use Revolution\Google\Sheets\Facades\Sheets;

class GoogleSheetController extends Controller
{
    /**
     * Todo
     *
     * @param SheetInfo $sheet_info Todo
     * @return array Todo
     */
    public function fetch(SheetInfo $sheet_info): array
    {
        return Sheets::spreadsheet($sheet_info->getId())
            ->sheet($sheet_info->getNameAndRange())
            ->get()
            ->toArray();
    }

    /**
     * Todo
     *
     * @return Response Todo
     */
    public function download(): Response
    {
        $log = [];
        $success_msg = '';
        $sheet_info_1 = new SheetInfo(env('VISA_SPREAD_SHEET_ID'), 'May', 'A3:AA');
        $sheet_info_2 = new SheetInfo(env('MASTERCARD_SPREAD_SHEET_ID'), 'May', 'A3:AA');
//        $sheet_info_3 = new SheetInfo(env('SALES_PERFORMANCE_SPREAD_SHEET_ID'), 'sales report', 'A3:D');

        $rows_data_1 = self::fetch($sheet_info_1);
        $rows_data_2 = self::fetch($sheet_info_2);

        // return successful message
        $success_msg = self::saveVisaRecords($rows_data_1);
        $log[] .= $success_msg;
        $success_msg = self::saveMasterRecords($rows_data_2);
        $log[] .= $success_msg;

        return Response($log, 200);
    }

    /**
     * Todo
     *
     * @param array $rows_data Todo
     * @return string Todo
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
     * Todo
     *
     * @param array $rows_data Todo
     * @return string Todo
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
