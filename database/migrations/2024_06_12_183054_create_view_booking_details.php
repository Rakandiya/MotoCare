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
         DB::statement("
            CREATE VIEW ViewBookingDetails AS
            SELECT 
                u.id AS user_id,
                u.nama AS user_nama,
                b.id AS booking_id,
                jl.jenis_layanan AS jenis_layanan,
                b.nomor_polisi,
                b.jadwal_booking,
                b.status AS booking_status,
                i.id AS invoice_id,
                i.status AS invoice_status
            FROM 
                users u
            JOIN 
                bookings b ON u.id = b.user_id
            JOIN 
                invoices i ON b.id = i.booking_id
            JOIN 
                jenis_layanans jl ON b.jenis_layanan_id = jl.id  
            ORDER BY 
                b.jadwal_booking DESC
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS ViewBookingDetails");
    }
};
