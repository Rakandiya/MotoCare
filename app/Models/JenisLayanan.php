<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class JenisLayanan extends Model
{
    use HasFactory;

    protected $fillable = [
        'jenis_layanan',
        'harga',
    ];

    public function booking(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
