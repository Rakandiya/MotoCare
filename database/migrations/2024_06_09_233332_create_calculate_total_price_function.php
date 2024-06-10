<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared('
            CREATE FUNCTION calculate_total_price(invoiceId INT)
            RETURNS DECIMAL(10,2)
            DETERMINISTIC
            BEGIN
                DECLARE total DECIMAL(10,2);
                SELECT SUM(jumlah * harga) INTO total
                FROM invoice_items
                WHERE invoice_id = invoiceId;
                RETURN IFNULL(total, 0);
            END
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP FUNCTION IF EXISTS calculate_total_price');
    }
};
