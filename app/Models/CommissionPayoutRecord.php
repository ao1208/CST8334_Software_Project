<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommissionPayoutRecord extends Model
{
    protected $fillable = [
        'date',
        'sales_id',
        'merchant_id',
        'type',
        'amount',
        'comment'
    ];
}
