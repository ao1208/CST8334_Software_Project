<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ImportLog extends Model
{
    protected $fillable = [
        'pdate',
        'number_of_merchant',
        'sales_id',
        'deleted_datetime'
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'sales_id', 'sales_id');
    }
}
