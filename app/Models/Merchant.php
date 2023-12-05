<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Merchant extends Model
{
    protected $fillable = [
        'merchant_id',
        'SCP_number',
        'DBA_name',
        'date_open',
        'date_closed',
        'account_status',
        'sales_id',
        'commission_percentage'
    ];

    // Define the 'user' relationship
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sales_id', 'sales_id');
    }
}
