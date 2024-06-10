<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

         User::create([
            'username' => 'admin',
            'nama' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'), // atau bcrypt('password')
            'role' => 'admin', // sesuaikan dengan nilai enum Anda
            'jenis_kelamin' => 'laki-laki', // sesuaikan dengan nilai enum Anda
            'no_telepon' => '1234567890',
            'tanggal_lahir' => '1990-01-01',
            'created_at' => now(),
        ]);

        // Membuat user lainnya dengan menggunakan factory
        User::factory()->count(10)->create();
    }
}
