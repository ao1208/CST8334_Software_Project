<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImportLog extends Model
{
    protected $fillable = [
        'pdate',
        'number_of_merchant',
        'sales_id',
        'deleted_datetime'
    ];
}
