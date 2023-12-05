<?php

namespace App\Models;

use App\Helpers\Formatter;
use Illuminate\Database\Eloquent\Model;

class SourceVisaRecord extends Model
{
    protected $fillable = [
        'pdate',
        'merchant_id',
        'scp_number',
        'dba_name',
        'date_open',
        'date_closed',
        'account_status',
        'gross_volume',
        'transaction_fee'
    ];

    protected static function boot()
    {
        parent::boot();
        static::saving(function ($record) {
            $record->pdate = Formatter::formatDate($record->pdate);
            $record->date_open = Formatter::formatDate($record->date_open);
            $record->date_closed = Formatter::formatDate($record->date_closed);
            $record->gross_volume = Formatter::formatDollar($record->gross_volume);
            $record->transaction_fee = Formatter::formatDollar($record->transaction_fee);
        });
    }

}
