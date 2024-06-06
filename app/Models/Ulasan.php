<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Ulasan extends Model
{
    use HasFactory;

    protected $fillable = ["user_id","jenis_layanan", "rating", "review"];

    public function fotoUlasans(): HasMany {
        return $this->hasMany(FotoUlasan::class);
    }
}
