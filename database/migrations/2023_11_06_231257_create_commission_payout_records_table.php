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
        Schema::create('commission_payout_records', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('sales_id');
            $table->string('merchant_id')->nullable();
            $table->string('type');
            $table->double('amount');
            $table->double('balance');
            $table->string('comment');
            $table->timestamps();

            // Define the foreign key
            $table->foreign('sales_id')
                ->references('sales_id')
                ->on('users');
            $table->foreign('merchant_id')
                ->references('merchant_id')
                ->on('merchants')
                ->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commission_payout_records');
    }
};
