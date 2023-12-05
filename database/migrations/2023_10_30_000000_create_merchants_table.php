<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('merchants', function (Blueprint $table) {
            $table->id();
            $table->string('merchant_id')->unique();
            $table->string('SCP_number')->unique();
            $table->string('DBA_name');
            $table->date('date_open');
            $table->date('date_closed')->nullable();
            $table->Char('account_status',1);
            $table->string('sales_id');
            $table->double('commission_percentage',4,2);
            $table->timestamps();

            // Define the foreign key
            $table->foreign('sales_id')
                ->references('sales_id')
                ->on('users');

            // Add a database constraint to ensure commission_percentage <= 1.00
//            DB::statement('ALTER TABLE merchants ADD CHECK (commission_percentage <= 1.00)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchants');
    }
};
