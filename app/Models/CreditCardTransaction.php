<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

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

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class, 'merchant_id', 'merchant_id');
    }

    protected static function boot()
    {
        parent::boot();
        static::saving(function ($record) {

        });
    }
}
