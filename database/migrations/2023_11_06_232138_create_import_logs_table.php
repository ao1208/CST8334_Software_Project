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
        Schema::create('import_logs', function (Blueprint $table) {
            $table->id();
            $table->date('pdate');
            $table->Integer('number_of_merchant');
            $table->string('sales_id');
            $table->datetime('deleted_datetime')->nullable();
            $table->timestamps();

            // Define the foreign key
            $table->foreign('sales_id')
                ->references('sales_id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('import_logs');
    }
};
