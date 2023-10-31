<?php

namespace App\Models;

use App\Helpers\Formatter;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditCardTransaction extends Model
{
    protected $fillable = [
        'pdate',
        'merchant_id',
        'visa_gross_volume',
        'visa_transaction_fee',
        'visa_commission',
        'master_gross_volume',
        'master_transaction_fee',
        'master_commission',
        'total_gross_volume',
        'total_transaction_fee',
        'total_commission'
    ];

    protected static function boot()
    {
        parent::boot();
        static::saving(function ($record) {

        });
    }
}
