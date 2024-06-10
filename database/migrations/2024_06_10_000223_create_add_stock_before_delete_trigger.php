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
                CREATE TRIGGER add_stock_before_delete
                BEFORE DELETE ON invoice_items
                FOR EACH ROW
                BEGIN
                    DECLARE current_stock INT;

                    -- Mengambil jumlah stok produk saat ini
                    SELECT stok INTO current_stock
                    FROM produks
                    WHERE id = OLD.produk_id;

                    -- Menambahkan stok kembali
                    UPDATE produks
                    SET stok = current_stock + OLD.jumlah
                    WHERE id = OLD.produk_id;
                END;
            ');
        }
    

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS add_stock_before_delete');
    }
};
