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
            CREATE TRIGGER reduce_stock_after_insert
            AFTER INSERT ON invoice_items
            FOR EACH ROW
            BEGIN
                DECLARE stock_after_sale INT;

                -- Mengambil jumlah stok produk sekarang
                SELECT stok INTO stock_after_sale
                FROM produks
                WHERE id = NEW.produk_id;

                -- Mengurangi stok produk sesuai dengan jumlah yang dijual
                SET stock_after_sale = stock_after_sale - NEW.jumlah;

                -- Jika stok setelah pengurangan tidak negatif, update stok produk
                IF stock_after_sale >= 0 THEN
                    UPDATE produks
                    SET stok = stock_after_sale
                    WHERE id = NEW.produk_id;
                END IF;
            END;
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP TRIGGER IF EXISTS reduce_stock_after_insert');
    }
};
