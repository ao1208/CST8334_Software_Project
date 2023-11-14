<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('source_visa_records', function (Blueprint $table) {
            $table->id();
            $table->date('pdate');
            $table->string('merchant_id');
            $table->string('scp_number');
            $table->string('dba_name');
            $table->date('date_open');
            $table->date('date_closed')->nullable();
            $table->string('account_status');
            $table->double('gross_volume');
            $table->double('transaction_fee');
            $table->boolean('is_saved')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('source_visa_records');
    }
};
