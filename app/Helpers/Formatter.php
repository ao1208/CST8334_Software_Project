<?php

namespace App\Helpers;

use Carbon\Carbon;

class Formatter
{
    /**
     * Todo
     *
     * @return string|null Todo
     */
    public static function formatDate(string $date_string): ?string
    {
        $NULL_VAL = 'NULL';
        $REDUNDANT_LETTER = '\\';
        $DATE_PATTERN_1 = '/^\d{1,2}\/\d{1,2}\/\d{2}$/';
        $DATE_PATTERN_2 = '/^\d{1,2}\/\d{1,2}\/\d{4}$/';
        $DATE_FORMAT_1 = 'm/d/y';
        $DATE_FORMAT_2 = 'm/d/Y';
        $DB_DATE_FORMAT = 'Y-m-d';

        $date_string = trim($date_string); // trims the date string

        // Transform the date into null if the cell value is 'NULL' ignored case.
        if ($date_string === '' || stripos($date_string, $NULL_VAL) !== false) {
            return null;
        }
        // Removes redundancy in the date.
        if (strpos($date_string, $REDUNDANT_LETTER)) {
            $date_string = str_replace($REDUNDANT_LETTER, '', $date_string);
        }
        // Formats and returns the date.
        $date = '';
        if (preg_match($DATE_PATTERN_1, $date_string)) {
            $date = Carbon::createFromFormat($DATE_FORMAT_1, $date_string)
                ->format($DB_DATE_FORMAT);
        }
        elseif (preg_match($DATE_PATTERN_2, $date_string)) {
            $date = Carbon::createFromFormat($DATE_FORMAT_2, $date_string)
                ->format($DB_DATE_FORMAT);
        }
        return $date;
    }

    /**
     * Todo
     *
     * @param string $dollar Todo
     * @return float Todo
     */
    public static function formatDollar(string $dollar): float
    {
        $PATTERNS = [' ', '$', ',', '-'];

        // Cleans the dollar value into a floating number.
        $dollar = str_replace($PATTERNS, '', $dollar);

        return (float)$dollar;
    }

}
