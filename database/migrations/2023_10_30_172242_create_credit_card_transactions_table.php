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
        Schema::create('credit_card_transactions', function (Blueprint $table) {
            $table->id();
            $table->date('pdate');
            $table->string('merchant_id');
            $table->double('visa_gross_volume')->nullable();
            $table->double('visa_transaction_fee')->nullable();
            $table->double('visa_commission')->nullable();
            $table->double('master_gross_volume')->nullable();
            $table->double('master_transaction_fee')->nullable();
            $table->double('master_commission')->nullable();
            $table->double('total_gross_volume');
            $table->double('total_transaction_fee');
            $table->double('total_commission');
            $table->timestamps();

            // Define the foreign key
            $table->foreign('merchant_id')
                ->references('merchant_id')
                ->on('merchants');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('credit_card_transactions');
    }
};
