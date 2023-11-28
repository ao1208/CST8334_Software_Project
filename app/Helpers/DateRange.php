<?php

namespace App\Helpers;

use Illuminate\Support\Carbon;

class DateRange
{
    /**
     * Calculates the start and end dates based on the provided date range.
     *
     * @param string $dateRange The selected date range.
     * @return array An associative array containing 'startDate' and 'endDate'.
     */
    public static function getStartAndEndDate($dateRange):array
    {
        // Initialize an empty array to store the start and end dates
        $dateArray = [];

        // Switch case to determine the start and end dates based on the selected date range
        switch ($dateRange) {
            case "This month":
                $startDate = Carbon::now()->startOfMonth(); // First day of the current month
                $endDate = Carbon::now()->endOfMonth();   // Last day of the current month
                break;
            case "Last month":
                $startDate = Carbon::now()->subMonth(1)->startOfMonth(); // First day of the last month
                $endDate = Carbon::now()->subMonth(1)->endOfMonth();   // Last day of the last month
                break;
            case "Last 3 months":
                $startDate = Carbon::now()->subMonths(2)->startOfMonth(); // First day of 3 months ago
                $endDate = Carbon::now()->endOfMonth();   // Last day of the current month
                break;
            case "Last 6 months":
                $startDate = Carbon::now()->subMonths(5)->startOfMonth(); // First day of 6 months ago
                $endDate = Carbon::now()->endOfMonth();   // Last day of the current month
                break;
            case "This year":
                $startDate = Carbon::now()->startOfYear(); // First day of the current year
                $endDate = Carbon::now()->endOfYear();   // Last day of the current year
                break;
            case "Last year":
                $startDate = Carbon::now()->subYear(1)->startOfYear(); // First day of last year
                $endDate = Carbon::now()->subYear(1)->endOfYear();   // Last day of last year
                break;
            case "Last 12 months":
                $startDate = Carbon::now()->subMonths(11)->startOfMonth(); // First day of 12 months ago
                $endDate = Carbon::now()->endOfMonth();   // Last day of the current month
                break;
            default:
                $startDate = null;
                $endDate = null;
        }

        // Assign values to the array keys directly
        $dateArray['startDate'] = $startDate;
        $dateArray['endDate'] = $endDate;

        // Return the associative array containing start and end dates
        return $dateArray;
    }

}
