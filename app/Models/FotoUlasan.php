<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FotoUlasan extends Model
{
    use HasFactory;

    protected $fillable = ["ulasan_id", "foto"];

    public function ulasan(): BelongsTo
    {
        return $this->belongsTo(Ulasan::class);
    }
}
