<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Produk extends Model
{
    use HasFactory;

    protected $fillable = [
        "nama_produk",
        "harga",
        "stok",
        "deskripsi"
    ];

    public function invoiceItem(): HasMany
    {
        return $this->hasMany(InvoiceItem::class);
    }
}
