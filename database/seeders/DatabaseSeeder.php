<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Tutorial;
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

        Tutorial::insert([
            [
                'judul' => 'Cara Merawat Motor Agar Awet',
                'deskripsi' => 'Cara merawat motor matic agar awet, wajib lakukan ini di rumah, service motor matic, perawatan motor matic, cara merawat motor matic di rumah.',
                'slug' => 'cara-merawat-motor-agar-awet',
                'link' => 'https://www.youtube.com/embed/SUJi--0486s?si=Wnye2KVb7-JGdZ5N'
            ],
            [
                'judul' => 'CARA BELAJAR MOTOR MATIC UNTUK PEMULA',
                'deskripsi' => 'Cara belajar motor matic untuk pemula, 5 menit dijamin bisa. Belajar motor matic, belajar motor manual, belajar motor koping. Dibahas tuntas melalui video ini.',
                'slug' => 'cara-belajar-motor-matic-untuk-pemula',
                'link' => 'https://www.youtube.com/embed/k8hn9SWh_ow?si=91VUAouocG0Em-rR'
            ],
            [
                'judul' => 'Belajar Naik Motor Kopling Manual',
                'deskripsi' => 'Belajar motor yang dilengkapi dengan kopling manual sebenarnya mudah jika kalian mengetahui triknya. Dalam video kali ini juga dibahas beberapa kesalahan yang biasa dilakukan para pemotor ketika belajar motor dengan kopling manual.',
                'slug' => 'belajar-naik-motor-kopling-manual',
                'link' => 'https://www.youtube.com/embed/Jb1Wy5eTdHM?si=dI7Mar-UNfZDduk1'
            ],
            [
                'judul' => 'CARA BERBONCENGAN MOTOR YG AMAN',
                'deskripsi' => 'Cara berboncengan motor yg aman, belajar motor matic bagi pemula, tips boncengan motor yg benar, cara boncengan naik motor.',
                'slug' => 'cara-berboncengan-motor-yg-aman',
                'link' => 'https://www.youtube.com/embed/U5R39jHu8go?si=Z7oyYrK-dvetNqdX'
            ],
            [
                'judul' => 'Nama nama mesin dan part motor lengkap',
                'deskripsi' => 'Pengenalan nama-nama mesin sepeda motor lengkap beserta fungsinya, dan kerusakan yang mungkin timbul, serta cara mengatasinya.',
                'slug' => 'nama-nama-mesin-dan-part-motor-lengkap',
                'link' => 'https://www.youtube.com/embed/DCHJMga9kLE?si=8pkoT8JxC-k8mveZ'
            ],
            [
                'judul' => 'CARA MENGATUR KOPLING MOTOR DI JALAN MACET',
                'deskripsi' => 'Cara mengatur kopling motor di jalan macet, cara belajar motor kopling pemula di jalan raya macet.',
                'slug' => 'cara-mengatur-kopling-motor-di-jalan-macet',
                'link' => 'https://www.youtube.com/embed/eMQQh7B-cnY?si=uaySag1dcQKBUdR4'
            ],
            [
                'judul' => 'CARA MENGATASI MASALAH KARBURATOR SEPEDA MOTOR',
                'deskripsi' => 'Berikut ini adalah video cara kerja karburator dan mengenal komponen yang ada beserta fungsinya masing masing, agar kamu dapat menseting sendiri karburator yang ada di sepeda motor kamu. Di video ini juga diajarkan bagaimana cara membaca pembakaran dari busi, dan bagaimana cara mengatasi apabila karburator kamu terjadi masalah.',
                'slug' => 'cara-mengatasi-masalah-karburator-sepeda-motor',
                'link' => 'https://www.youtube.com/embed/C5UVnTe4fRA?si=-82NN40TXYwyBr9K'
            ],
            [
                'judul' => '16 POINT PENTING SERVICE MOTOR',
                'deskripsi' => 'Pada video ini kami memperagakan urutan 16 poin service ringan sepeda motor untuk tipe transmisi manual, terdapat variasi jumlah poin servis di masing-masing bengkel sepeda motor, video ini hanyalah salah satu contoh atau referensi dalam melakukan servis / perawatan rutin yang dapat disesuaikan dengan kebutuhan.',
                'slug' => '16-point-penting-service-motor',
                'link' => 'https://www.youtube.com/embed/-7R66xrA5x4?si=_0xJG0xs4N_o7Y75'
            ],
            [
                'judul' => 'Kesalahan Saat Belajar Motor Kopling',
                'deskripsi' => 'Di video ini kami bahas video cara belajar naik motor kopling manual. Buat kalian yang baru belajar naik motor kopling manual, ada beberapa keasalahan yang sering dilakukan. Kesalahan-kesalahan ini kerap bikin kalian panik ketika di jalan karena sering membuat motor menjadi mati mendadak ketika digunakan.',
                'slug' => 'kesalahan-saat-belajar-motor-kopling',
                'link' => 'https://www.youtube.com/embed/MYVdRHBkl0U?si=l1RvRwz_b10RuEJa'
            ],
            [
                'judul' => 'TIPS MERAWAT SEPEDA MOTOR VARIO 125 2024 AGAR TETAP AWET DAN MULUS',
                'deskripsi' => 'Dalam video ini, kami akan membagikan serangkaian tips dan trik terbaik untuk menjaga Sepeda Motor Vario 125 edisi 2024 Anda tetap dalam kondisi prima. Mulai dari pembersihan rutin, pengecekan oli, hingga tips penyimpanan yang tepat, kami akan memandu Anda melalui langkah-langkah penting untuk memastikan motor Anda selalu siap untuk perjalanan berikutnya.',
                'slug' => 'tips-merawat-sepeda-motor-vario-125-2024-agar-tetap-awet-dan-mulus',
                'link' => 'https://www.youtube.com/embed/ohp67LsfyoI?si=1XySxnKBMb-YEb4z'
            ],
            [
                'judul' => 'Tips Meninggalkan Motor Jangka Waktu Lama',
                'deskripsi' => 'persiapan motor untuk ditinggal lama harus memperhatikan beberapa point penting. disamping aki, mesin harus menjadi pokok utama, berikut secara lengkapnya.',
                'slug' => 'tips-meninggalkan-motor-jangka-waktu-lama',
                'link' => 'https://www.youtube.com/embed/yEy7_7LwMm8?si=usv8dh38qT3CuiCZ'
            ],
            [
                'judul' => 'TIPS | Berkendara Motor Listrik Yang Aman Dan Nyaman',
                'deskripsi' => 'Bertumbuhnya penjualan motor listrik rupanya harus dibarengi dengan tata cara dan kebiasaan para konsumen roda dua dalam menghadapi perubahan zaman.',
                'slug' => 'tips-berkendara-motor-listrik-yang-aman-dan-nyaman',
                'link' => 'https://www.youtube.com/embed/JnMJg_o5qfI?si=n4CARG2F2XDS0o5v'
            ],
            [
                'judul' => 'Oli Mesin Telat Ganti, Mesin Bisa Jadi Korban',
                'deskripsi' => 'Menunda penggantian oli mesin bukan hanya mengurangi performa, tetapi juga dapat merusak mesin Anda. Video ini akan menjelaskan dampak negatif dari penundaan penggantian oli mesin dan bagaimana hal itu dapat memperpendek umur mesin. Kami akan memberikan panduan langkah demi langkah untuk mengenali tanda-tanda oli mesin yang harus diganti, serta tips untuk menjaga mesin tetap dalam kondisi optimal.',
                'slug' => 'oli-mesin-telat-ganti-mesin-bisa-jadi-korban',
                'link' => 'https://www.youtube.com/embed/tpvZK8xMfEk?si=UDyP61vYf5LxhbUk'
            ],
            [
                'judul' => 'Tips Cara cek motor bekas /second sebelum membeli',
                'deskripsi' => 'Sebelum membeli motor bekas tentunya kita harus cek kondisi motor nya mulai dari mesin,body,surat surat dan lain nya agar tidak menyesal di kemudian hari. Cara ini bisa di terapkan pada motor matic lain nya seperti vario,spacy scoopt beat pop beat street mio j mio soul gt dll.',
                'slug' => 'tips-cara-cek-motor-bekas-second-sebelum-membeli',
                'link' => 'https://www.youtube.com/embed/gf92Fs0pUoI?si=nWoUnVqxU4x5ZFkw'
            ],
            [
                'judul' => 'CVT MOTOR MATIC BERISIK = MENCARI DAN MENGATASI MOTOR MATIC BERISIK KASAR',
                'deskripsi' => 'Temukan solusi atas masalah CVT motor matic yang berisik dengan panduan kami. Video ini akan memandu Anda melalui proses diagnostik untuk menemukan sumber kebisingan kasar dan langkah-langkah efektif untuk mengatasinya. Dari pemeriksaan komponen hingga tips perawatan, kami akan membantu Anda mengembalikan kenyamanan berkendara Anda.',
                'slug' => 'cvt-motor-matic-berisik-mencari-dan-mengatasi-motor-matic-berisik-kasar',
                'link' => 'https://www.youtube.com/embed/qKOMgspBkhM?si=2OZCr5XoQ5Pe-KNm'
            ]
        ]);
    }
}
