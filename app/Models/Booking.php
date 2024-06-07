<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        "nama",
        "jenis_layanan",
        "merk_motor",
        "tahun_pembuatan",
        "nomor_polisi",
        "km_kendaraan",
        "jadwal_booking",
        "catatan",
    ];
}
