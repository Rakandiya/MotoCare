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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->string("jenis_layanan");
            $table->foreignId('katalog_id')->constrained();
            $table->string("tahun_pembuatan");
            $table->string("nomor_polisi");
            $table->string("km_kendaraan");
            $table->date("jadwal_booking");
            $table->string("status");
            $table->text("catatan");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};