import React, { useState, useEffect } from 'react';
// import imageBeat from '../assets/images/ahm-gaul-sideview-deluxe-black-7-01022023-085330.webp';
// import Navbar from './Navbar';
// import Footer from './Footer';
import styles from "../../../css/User/katalog.module.css";
import UserLayout from "@/Layouts/UserLayout";
import axios from "axios";



export default function Katalog () {
  //   const product = new Map([
  //   ["Honda", ["BeAT", "PCX160", "Vario 160", "CBR150R"]],
  //   ["Yamaha", ["NMAX 155", "Aerox", "Xmax", "XSR 155"]],
  //   ["Suzuki", ["GSX-R150", "NEX II", "SATRIA F150"]],
  //   ["Kawasaki", ["W 175", "KLX", "ZX-25R"]],
  //   ["BMW", ["G 310 R", "R nineT", "R 18"]],
  //   ["KTM", ["KTM RC 200", "KTM DUKE 200", "KTM 450 SX-F"]],
  //   ["Husqvarna", ["Vitpilen 401", "FC 250", "Norden 901"]],
  // ]);
  
  // const detailproduct = new Map([
  //   [
  //     "BeAT",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Honda BeAT",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda Beat 2024: \n 1. Periksa dan Ganti Oli Mesin Secara Berkala: Pastikan oli mesin diganti sesuai dengan jadwal yang direkomendasikan oleh pabrikan, biasanya setiap 2.000-4.000 km, untuk menjaga mesin tetap terlubrikasi dengan baik.\n 2. Cek Tekanan Angin Ban: Ban dengan tekanan angin yang tepat tidak hanya meningkatkan efisiensi bahan bakar tetapi juga memperpanjang umur ban dan meningkatkan keamanan berkendara. Periksa tekanan ban secara berkala, idealnya sekali seminggu. \n 3. Bersihkan Filter Udara: Filter udara yang bersih memastikan aliran udara yang baik ke mesin, yang penting untuk menjaga performa motor. Bersihkan filter udara secara teratur dan ganti jika sudah terlalu kotor atau rusak.",
  //     ],
  //   ],
  //   [
  //     "PCX160",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Honda PCX160",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda PCX 160: \n 1. Perawatan Baterai: PCX 160 menggunakan sistem start-stop yang otomatis, yang membuat penggunaan baterai lebih intensif. Pastikan baterai selalu dalam kondisi terisi penuh dan periksa secara berkala untuk memastikan tidak ada kerusakan atau kebocoran. \n  2. Cek dan Bersihkan Filter Udara: Sistem intake udara yang bersih sangat penting untuk efisiensi bahan bakar dan performa motor. Bersihkan filter udara secara berkala dan ganti jika sudah terlalu kotor atau rusak. \n 3. Perawatan CVT (Continuous Variable Transmission): Karena menggunakan transmisi CVT, penting untuk memeriksa dan memastikan bahwa sabuk transmisi dalam kondisi baik dan tidak aus. Ganti sabuk CVT sesuai interval yang direkomendasikan oleh pabrikan atau lebih awal jika diperlukan.",
  //     ],
  //   ],
  //   [
  //     "Vario 160",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Honda Vario 160",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda Vario 160: \n 1. Cek Tekanan Angin Ban: Ban dengan tekanan yang tepat penting untuk menjaga kestabilan dan efisiensi bahan bakar. Periksa tekanan angin ban secara rutin dan sesuaikan sesuai spesifikasi pabrikan. \n 2. Lubrikasi Rantai dan Sprocket: Meskipun Vario 160 adalah skuter matik, memastikan komponen transmisi seperti sprocket penggerak roda belakang terlubrikasi dengan baik dapat memperpanjang umur komponen dan mengurangi keausan. \n 3. Periksa dan Ganti Cairan Rem: Untuk menjaga performa sistem pengereman, penting untuk memeriksa level cairan rem secara berkala dan menggantinya setiap 12.000 km atau sesuai anjuran pabrikan.",
  //     ],
  //   ],
  //   [
  //     "CBR150R",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Honda CBR150R",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda CBR 150R: \n 1. Perawatan Sistem Pendinginan: CBR150R menggunakan sistem pendinginan cairan untuk menjaga suhu mesin. Pastikan level cairan pendingin sesuai dan ganti cairan pendingin sesuai jadwal yang direkomendasikan untuk menghindari overheating. \n 2. Cek dan Atur Ketegangan Rantai: Rantai yang terlalu kendor atau terlalu kencang bisa mempengaruhi performa berkendara dan umur rantai. Pastikan rantai memiliki ketegangan yang tepat dan terlubrikasi dengan baik. \n 3. Pemeliharaan Suspensi: Cek kondisi oli suspensi depan dan karet seal untuk mencegah kebocoran. Suspensi yang terawat dengan baik penting untuk kenyamanan dan stabilitas saat berkendara, terutama pada motor sport seperti CBR150R.",
  //     ],
  //   ],
  //   [
  //     "NMAX 155",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Yamaha NMAX 155",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Yamaha NMAX 155: \n 1. Periksa dan Ganti Oli Mesin secara Berkala: Oli mesin yang berkualitas dan diganti secara berkala adalah kunci untuk menjaga mesin tetap dalam kondisi terbaik. Pastikan untuk mengganti oli mesin setiap 2.000-3.000 km atau sesuai dengan rekomendasi pabrikan. \n 2. Cek Sistem VVA (Variable Valve Actuation): Nmax 155 dilengkapi dengan teknologi VVA yang meningkatkan performa mesin. Pastikan sistem VVA berfungsi dengan baik melalui servis berkala di bengkel resmi. \n 3. Perawatan Sistem Pengereman ABS: Jika Nmax Anda dilengkapi dengan ABS, pastikan sistem ini diperiksa secara berkala oleh teknisi yang berkualifikasi untuk memastikan keamanan maksimal saat berkendara.",
  //     ],
  //   ],
  //   [
  //     "Aerox",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Yamaha Aerox",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Yamaha Aerox 155: \n 1. Bersihkan Filter Udara secara Rutin: Aerox 155 memerlukan aliran udara yang optimal untuk performa mesin yang efisien. Bersihkan filter udara secara berkala dan ganti bila diperlukan untuk menjaga performa mesin.\n 2.Cek dan Atur Tekanan Angin Ban: Pastikan ban selalu dalam kondisi tekanan yang ideal. Ban dengan tekanan yang tepat tidak hanya memperpanjang umur ban tetapi juga meningkatkan efisiensi bahan bakar dan kestabilan saat berkendara.\n 3. Periksa Sabuk CVT dan Roller: Sebagai skuter matik, kondisi sabuk CVT dan roller sangat penting untuk transmisi yang halus dan efisien. Periksa dan ganti komponen-komponen ini sesuai kebutuhan atau sesuai interval yang disarankan oleh pabrikan.",
  //     ],
  //   ],
  //   [
  //     "Xmax",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Yamaha Xmax",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda CBR 150R:\n 1. Perawatan Sistem Pendinginan: Xmax 250 menggunakan sistem pendinginan cairan yang memerlukan perhatian khusus. Pastikan untuk memeriksa level cairan pendingin secara berkala dan mengganti cairan pendingin setiap 20.000 km atau sesuai dengan petunjuk pabrikan. \n 2. Periksa dan Ganti Filter Oli Mesin: Selain oli mesin, filter oli juga perlu diganti secara berkala untuk menjaga mesin bekerja dengan lancar. Pastikan untuk mengganti filter oli setiap kali Anda mengganti oli mesin.",
  //     ],
  //   ],
  //   [
  //     "XSR 155",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Yamaha XSR 155",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Yamaha XSR 155:\n 1. Ganti Oli Mesin Secara Berkala: Oli mesin berperan vital dalam menjaga mesin tetap bersih dan terlubrikasi dengan baik. Pastikan untuk mengganti oli mesin XSR 155 Anda sesuai interval yang disarankan oleh Yamaha, yaitu setiap 3.000 hingga 5.000 km, tergantung pada kondisi penggunaan.\n 2.Periksa Level Oli: Selalu periksa level oli mesin secara rutin, minimal sekali sebulan atau sebelum melakukan perjalanan jauh, untuk memastikan mesin selalu terlubrikasi dengan baik.\n 3. Lubrikasi Rantai: Rantai yang kering bisa menyebabkan keausan cepat dan mengurangi efisiensi transmisi. Lubrikasi rantai secara teratur, idealnya setiap 500 km atau setelah terpapar hujan, dapat membantu memperpanjang umur rantai dan sprocket.",
  //     ],
  //   ],
  //   [
  //     "GSX-R150",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Suzuki GSX-R150",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Suzuki GSX-R150: \n 1. Lakukan perawatan rutin seperti penggantian oli dan filter sesuai jadwal.\n 2. Jaga kebersihan motor dengan membersihkan secara teratur. 3. Pelumasan rantai secara teratur untuk menghindari keausan berlebihan.",
  //     ],
  //   ],
  //   [
  //     "NEX II",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Suzuki NEX II",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Suzuki NEX II: \n 1. Lakukan perawatan rutin seperti penggantian oli, servis, dan pembersihan secara teratur.\n 2.Perhatikan tekanan ban dan lakukan pelumasan rantai secara berkala.\n 3. Periksa sistem rem dan suspensi secara teratur untuk menjaga kinerja optimal.",
  //     ],
  //   ],
  //   [
  //     "SATRIA F150",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Suzuki SATRIA F150",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Suzuki SATRIA F150:\n 1. Lakukan perawatan rutin seperti penggantian oli, pelumasan rantai, dan periksa sistem rem. \n 2. Bersihkan motor secara teratur untuk menjaga penampilan dan performa.\n 3. Simpan motor di tempat yang aman dan lindungi dari cuaca ekstrem.",
  //     ],
  //   ],
  //   [
  //     "W 175",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Kawasaki W 175",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Bersihkan motor secara teratur untuk mencegah penumpukan kotoran dan debu yang dapat merusak komponen.\n 2. Periksa sistem rem dan suspensi secara berkala untuk menjaga kinerja optimal.\n 3. Pastikan untuk melumasi rantai secara berkala untuk mencegah keausan berlebihan.",
  //     ],
  //   ],
  //   [
  //     "KLX",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Kawasaki KLX",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Pemeriksaan Berkala: Lakukan servis rutin sesuai jadwal yang direkomendasikan oleh pabrikan. Ini mencakup penggantian oli, filter oli, dan pengecekan komponen penting lainnya.\n 2. Tekanan Ban: Selalu cek tekanan ban sebelum berkendara. Ban dengan tekanan yang tepat memastikan keamanan, kenyamanan, dan efisiensi bahan bakar.",
  //     ],
  //   ],
  //   [
  //     "ZX-25R",
  //     [
  //       '/images/beat.webp',
  //       "Tips Perawatan Motor Kawasaki ZX-25R",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan: \n 1. Periksa dan Ganti Cairan: Pastikan semua cairan (oli mesin, cairan rem, cairan radiator) pada level yang tepat dan ganti sesuai rekomendasi pabrikan.\n 2. Perlindungan dari Cuaca: Saat tidak digunakan, parkirkan motor di dalam garasi atau tutup dengan penutup motor untuk melindunginya dari cuaca buruk dan sinar matahari langsung.",
  //     ],
  //   ],
  //   [
  //     "G 310 R",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor BMW G 310 R",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan: \n 1. Gunakan Suku Cadang Asli: Ketika perlu mengganti suku cadang, gunakan suku cadang asli dari pabrikan. Hal ini memastikan kompatibilitas dan kinerja yang optimal.\n 2. Baterai: Jaga baterai tetap terisi penuh, terutama jika motor tidak digunakan dalam waktu yang lama. Pertimbangkan penggunaan trickle charger untuk menjaga daya baterai.",
  //     ],
  //   ],
  //   [
  //     "R nineT",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor BMW R nineT",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Kebersihan Motor: Cuci motor secara teratur untuk menghilangkan kotoran, pasir, atau garam yang bisa mengikis bagian logam dan cat. Gunakan sabun yang khusus dirancang untuk kendaraan dan hindari sabun cuci piring yang dapat merusak lapisan wax.\n 2. Periksa Sistem Pencahayaan: Pastikan semua lampu (lampu depan, lampu belakang, lampu sein) berfungsi dengan baik untuk keselamatan berkendara di malam hari atau dalam kondisi cuaca buruk.",
  //     ],
  //   ],
  //   [
  //     "R 18",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor BMW R 18",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Pemeriksaan Berkala: Lakukan servis rutin sesuai jadwal yang direkomendasikan oleh pabrikan. Ini mencakup penggantian oli, filter oli, dan pengecekan komponen penting lainnya.\n 2. Kebersihan Motor: Cuci motor secara teratur untuk menghilangkan kotoran, pasir, atau garam yang bisa mengikis bagian logam dan cat. Gunakan sabun yang khusus dirancang untuk kendaraan dan hindari sabun cuci piring yang dapat merusak lapisan wax.",
  //     ],
  //   ],
  //   [
  //     "KTM RC 200",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor KTM RC 200",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Baterai: Jaga baterai tetap terisi penuh, terutama jika motor tidak digunakan dalam waktu yang lama. Pertimbangkan penggunaan trickle charger untuk menjaga daya baterai.\n 2. Gunakan Suku Cadang Asli: Ketika perlu mengganti suku cadang, gunakan suku cadang asli dari pabrikan. Hal ini memastikan kompatibilitas dan kinerja yang optimal.",
  //     ],
  //   ],
  //   [
  //     "KTM DUKE 200",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor KTM DUKE 200",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Tekanan Ban: Selalu cek tekanan ban sebelum berkendara. Ban dengan tekanan yang tepat memastikan keamanan, kenyamanan, dan efisiensi bahan bakar.\n 2. Periksa dan Ganti Cairan: Pastikan semua cairan (oli mesin, cairan rem, cairan radiator) pada level yang tepat dan ganti sesuai rekomendasi pabrikan.",
  //     ],
  //   ],
  //   [
  //     "KTM 450 SX-F",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor KTM 450 SX-F",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Pemeriksaan Rem: Periksa ketebalan pad rem dan kondisi disk rem secara berkala. Ganti pad rem yang sudah menipis untuk menghindari kerusakan pada disk rem.\n 2. Baterai: Jaga baterai tetap terisi penuh, terutama jika motor tidak digunakan dalam waktu yang lama. Pertimbangkan penggunaan trickle charger untuk menjaga daya baterai.",
  //     ],
  //   ],
  //   [
  //     "Vitpilen 401",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor Husqvarna Vitpilen 401",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Pemeliharaan Rantai: Bersihkan dan lumasi rantai secara berkala. Penggunaan pelumas rantai yang sesuai dapat memperpanjang umur rantai dan meningkatkan kinerja berkendara.\n 2. Kebersihan Motor: Cuci motor secara teratur untuk menghilangkan kotoran, pasir, atau garam yang bisa mengikis bagian logam dan cat. Gunakan sabun yang khusus dirancang untuk kendaraan dan hindari sabun cuci piring yang dapat merusak lapisan wax.",
  //     ],
  //   ],
  //   [
  //     "FC 250",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor Husqvarna FC 250",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Periksa dan Ganti Cairan: Pastikan semua cairan (oli mesin, cairan rem, cairan radiator) pada level yang tepat dan ganti sesuai rekomendasi pabrikan.\n 2. Pemeriksaan Berkala: Lakukan servis rutin sesuai jadwal yang direkomendasikan oleh pabrikan. Ini mencakup penggantian oli, filter oli, dan pengecekan komponen penting lainnya.",
  //     ],
  //   ],
  //   [
  //     "Norden 901",
  //     [
  //       "/images/beat.webp",,
  //       "Tips Perawatan Motor Husqvarna Norden 901",
  //       "Untuk menjaga performa dan memastikan umur panjang kendaraan:\n 1. Tekanan Ban: Selalu cek tekanan ban sebelum berkendara. Ban dengan tekanan yang tepat memastikan keamanan, kenyamanan, dan efisiensi bahan bakar.\n 2. Gunakan Suku Cadang Asli: Ketika perlu mengganti suku cadang, gunakan suku cadang asli dari pabrikan. Hal ini memastikan kompatibilitas dan kinerja yang optimal.",
  //     ],
  //   ],
  // ]);
  
  const [katalogs, setKatalogs] = useState([]);
  const [merkList, setMerkList] = useState([]);
  const [lineupList, setLineupList] = useState([]);
  const [searchMerk, setSearchMerk] = useState("");
  const [searchLineup, setSearchLineup] = useState("");
  const [currentBrand, setCurrentBrand] = useState(null);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    fetchKatalogs();
  }, []);

  const fetchKatalogs = async () => {
    try {
      const response = await axios.get("/api/katalogs");
      setKatalogs(response.data);
      const newMerkList = [...new Set(response.data.map(item => item.merk))];
      setMerkList(newMerkList);
    } catch (error) {
      console.error("Error fetching the katalogs", error);
    }
  };

  // useEffect(() => {
  //   const newMerkList = [...product.keys()];
  //   if (JSON.stringify(newMerkList) !== JSON.stringify(merkList)) {
  //     setMerkList(newMerkList);
  //   }
  // }, [product]);

  const capitalizeFirstLetterOfEachWord = (input) => {
    let words = input.split(" ");
    for (let i = 0; i < words.length; i++) {
      let firstLetter = words[i].charAt(0).toUpperCase();
      words[i] = firstLetter + words[i].slice(1);
    }
    return words.join(" ");
  };

  const handleMerkSearch = (e) => {
    setSearchMerk(e.target.value);
    if (e.target.value) {
      const searchValue = capitalizeFirstLetterOfEachWord(e.target.value);
      const filteredMerks = [...new Set(katalogs.map(item => item.merk))]
        .filter((merk) => merk.includes(searchValue));
      setMerkList(filteredMerks);
    } else {
      setMerkList([...new Set(katalogs.map(item => item.merk))]);
    }
  };

  const handleLineupSearch = (e) => {
    const LineupSearchValue = e.target.value;
    setSearchLineup(LineupSearchValue);
    if (LineupSearchValue) {
      const filteredLineups = katalogs
        .filter(item => item.model.toLowerCase().includes(LineupSearchValue.toLowerCase()))
        .map(item => item.model);
      setLineupList(filteredLineups);
    } else {
      setLineupList(katalogs.filter(item => item.merk === currentBrand).map(item => item.model));
    }
  };


  // const handleLineupClick = (lineupId) => {
  //   const selectedDetails = detailproduct.get(lineupId) || [];
  //   if (selectedDetails.length > 0) {
  //     document.getElementById('gambar-produk').src = selectedDetails[0];
  //     document.getElementById('title').innerHTML = selectedDetails[1];
  //     document.getElementById('description').innerHTML = selectedDetails[2];
  //   }
  // };

  const handleBrandClick = (merk, e) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentBrand(merk);
    setCurrentProduct(null);
    setLineupList(katalogs.filter(item => item.merk === merk).map(item => item.model));
  };

  const handleProductClick = (product, e) => {
    if (product) {
      setCurrentProduct(product);
      e.preventDefault();
    }
  };


  return (
    <UserLayout>
      <div className="backgroundImage">
        <main>
          <article className={styles["article"]}>
            <section>
              <div className="container mt-4">
                <div className={styles["row"]}>
                <section className={styles["form-katalog"]}>
                  <div className="col-md-3">
                    <div className={styles["left-panel"]}>
                      <div id="merk">
                        <div className={styles["title"]}>
                          <div className={styles["MerkMotor"]} id="MerkMotor">Merk Motor</div>
                          <input 
                          type="text" 
                          className="form-control mb3" 
                          id="cari-merk" 
                          value={searchMerk}
                          onChange={handleMerkSearch}
                          placeholder="Cari merk Motor"/>
                        </div>
                        <div id="merk-list">
                          {merkList.map((merk) => (
                            <div
                              key={merk}
                              id={merk}
                              className={styles["merk"]}
                              onClick={(e) => handleBrandClick(merk, e)}
                              style={{ cursor: 'pointer' }}
                            >
                              {merk}
                            </div>
                          ))}
                        </div>
                        
                      </div>
                        <div id="lineup">
                          <div className={styles["title"]}>
                            <div className={styles["LineupProduk"]}>Lineup Produk</div>
                            <input type="text" 
                            className="form-control mb3" 
                            id="cari-merk" 
                            value={searchLineup} 
                            onChange={handleLineupSearch}
                            placeholder="Cari lineup produk" />
                          </div>
                            <div id="lineup-list">
                              {lineupList && lineupList.map((lineup) => (
                                <div
                                  key={lineup}
                                  id={lineup}
                                  className={styles["merk"]}
                                  onClick={(e) => handleProductClick(lineup, e)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  {lineup}
                                </div>
                              ))}
                            </div>
                          
                        </div>
                    </div>
                  </div>
                  <div className={styles["right-panel"]} id="Konten">
                    {currentProduct && (
                      <>
                        <img 
                          title="Gambar" 
                          id="gambar-produk" 
                          src={detailproduct.get(currentProduct)[0]} 
                          className={styles["motor-image"]}
                          alt={currentProduct}
                        /> 
                        <div className={styles["title-deskripsi"]} id="title">
                          {katalogs.find(item => item.model === currentProduct).merk} {currentProduct}
                        </div>
                        <p className={styles["description"]} id="description">
                          {katalogs.find(item => item.model === currentProduct).deskripsi}
                        </p>
                      </>
                    )}
                  </div>
                </section>
                </div>
              </div>
            </section>
          </article>
        </main>
      </div>
    </UserLayout>
  );
};
