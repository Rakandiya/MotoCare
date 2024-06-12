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
        DB::unprepared("
            CREATE PROCEDURE CreateBooking (
                IN p_user_id INT,
                IN p_jenis_layanan INT,
                IN p_katalog_id INT,
                IN p_tahun_pembuatan VARCHAR(255),
                IN p_nomor_polisi VARCHAR(255),
                IN p_km_kendaraan VARCHAR(255),
                IN p_jadwal_booking DATE,
                IN p_catatan TEXT
            )
            BEGIN
                DECLARE v_booking_id INT;

                -- Insert ke tabel bookings
                INSERT INTO bookings (
                    user_id, jenis_layanan_id, katalog_id, tahun_pembuatan, nomor_polisi, km_kendaraan, jadwal_booking, status, catatan, created_at
                ) VALUES (
                    p_user_id, p_jenis_layanan, p_katalog_id, p_tahun_pembuatan, p_nomor_polisi, p_km_kendaraan, p_jadwal_booking, 'Diproses', p_catatan, NOW()
                );

                -- Mendapatkan ID booking yang baru dibuat
                SET v_booking_id = LAST_INSERT_ID();

                -- Insert ke tabel invoices
                INSERT INTO invoices (
                    user_id, booking_id, status, created_at
                ) VALUES (
                    p_user_id, v_booking_id, 'Unpaid', NOW()
                );
            END
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS CreateBooking');
    }
};
