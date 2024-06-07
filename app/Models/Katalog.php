<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Katalog extends Model
{
    use HasFactory;

    protected $fillable = ["merk", "model", "deskripsi", "gambar"];

    public function booking(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
