<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommissionPayoutRecord extends Model
{
    protected $fillable = [
        'date',
        'sales_id',
        'merchant_id',
        'type',
        'amount',
        'balance',
        'comment'
    ];

    // Define the 'user' relationship
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sales_id', 'sales_id');
    }

    public function merchant(): BelongsTo
    {
        return $this->belongsTo(Merchant::class, 'merchant_id', 'merchant_id');
    }
}
