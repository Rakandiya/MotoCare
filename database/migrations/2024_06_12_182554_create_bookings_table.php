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
            $table->foreignId('jenis_layanan_id')->constrained();
            $table->foreignId('katalog_id')->constrained();
            $table->string("tahun_pembuatan")->nullable();
            $table->string("nomor_polisi")->nullable();
            $table->string("km_kendaraan")->nullable();
            $table->date("jadwal_booking");
            $table->enum("status", ["Diproses", "Selesai", "Dibatalkan"])->default("Diproses");
            $table->text("catatan")->nullable();
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
