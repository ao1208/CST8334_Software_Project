<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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
}
