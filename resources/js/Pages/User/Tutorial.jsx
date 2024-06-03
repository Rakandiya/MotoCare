import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Tutorial.module.css";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect } from "react";

export default function Tutorial() {
    const [tutorials, setTutorials] = useState([
        {
            id: 1,
            title: "Cara Merawat Motor Agar Awet",
            description:
                "Cara merawat motor matic agar awet, wajib lakukan ini di rumah, service motor matic, perawatan motor matic, cara merawat motor matic di rumah.",
            video: "https://www.youtube.com/embed/SUJi--0486s?si=Wnye2KVb7-JGdZ5N",
        },
        {
            id: 2,
            title: "CARA BELAJAR MOTOR MATIC UNTUK PEMULA",
            description:
                "Cara belajar motor matic untuk pemula, 5 menit dijamin bisa. Belajar motor matic, belajar motor manual, belajar motor koping. Dibahas tuntas melalui video ini.",
            video: "https://www.youtube.com/embed/k8hn9SWh_ow?si=91VUAouocG0Em-rR",
        },
        {
            id: 3,
            title: "Belajar Naik Motor Kopling Manual",
            description:
                "Belajar motor yang dilengkapi dengan kopling manual sebenarnya mudah jika kalian mengetahui triknya. Dalam video kali ini juga dibahas beberapa kesalahan yang biasa dilakukan para pemotor ketika belajar motor dengan kopling manual.",
            video: "https://www.youtube.com/embed/Jb1Wy5eTdHM?si=dI7Mar-UNfZDduk1",
        },
        {
            id: 4,
            title: "CARA BERBONCENGAN MOTOR YG AMAN",
            description:
                "Cara berboncengan motor yg aman, belajar motor matic bagi pemula, tips boncengan motor yg benar, cara boncengan naik motor.",
            video: "https://www.youtube.com/embed/U5R39jHu8go?si=Z7oyYrK-dvetNqdX",
        },
        {
            id: 5,
            title: "Nama nama mesin dan part motor lengkap",
            description:
                "Pengenalan nama-nama mesin sepeda motor lengkap beserta fungsinya, dan kerusakan yang mungkin timbul, serta cara mengatasinya.",
            video: "https://www.youtube.com/embed/DCHJMga9kLE?si=8pkoT8JxC-k8mveZ",
        },
        {
            id: 6,
            title: "CARA MENGATUR KOPLING MOTOR DI JALAN MACET",
            description:
                "Cara mengatur kopling motor di jalan macet, cara belajar motor kopling pemula di jalan raya macet.",
            video: "https://www.youtube.com/embed/eMQQh7B-cnY?si=uaySag1dcQKBUdR4",
        },
        {
            id: 7,
            title: "CARA MENGATASI MASALAH KARBURATOR SEPEDA MOTOR",
            description:
                "Berikut ini adalah video cara kerja karburator dan mengenal komponen yang ada beserta fungsinya masing masing, agar kamu dapat menseting sendiri karburator yang ada di sepeda motor kamu. Di video ini juga diajarkan bagaimana cara membaca pembakaran dari busi, dan bagaimana cara mengatasi apabila karburator kamu terjadi masalah.",
            video: "https://www.youtube.com/embed/C5UVnTe4fRA?si=-82NN40TXYwyBr9K",
        },
        {
            id: 8,
            title: "16 POINT PENTING SERVICE MOTOR",
            description:
                "Pada video ini kami memperagakan urutan 16 poin service ringan sepeda motor untuk tipe transmisi manual, terdapat variasi jumlah poin servis di masing-masing bengkel sepeda motor, video ini hanyalah salah satu contoh atau referensi dalam melakukan servis / perawatan rutin yang dapat disesuaikan dengan kebutuhan.",
            video: "https://www.youtube.com/embed/-7R66xrA5x4?si=_0xJG0xs4N_o7Y75",
        },
        {
            id: 9,
            title: "Kesalahan Saat Belajar Motor Kopling",
            description:
                "Di video ini kami bahas video cara belajar naik motor kopling manual. Buat kalian yang baru belajar naik motor kopling manual, ada beberapa keasalahan yang sering dilakukan. Kesalahan-kesalahan ini kerap bikin kalian panik ketika di jalan karena sering membuat motor menjadi mati mendadak ketika digunakan.",
            video: "https://www.youtube.com/embed/MYVdRHBkl0U?si=l1RvRwz_b10RuEJa",
        },
        {
            id: 10,
            title: "TIPS MERAWAT SEPEDA MOTOR VARIO 125 2024 AGAR TETAP AWET DAN MULUS",
            description:
                "Dalam video ini, kami akan membagikan serangkaian tips dan trik terbaik untuk menjaga Sepeda Motor Vario 125 edisi 2024 Anda tetap dalam kondisi prima. Mulai dari pembersihan rutin, pengecekan oli, hingga tips penyimpanan yang tepat, kami akan memandu Anda melalui langkah-langkah penting untuk memastikan motor Anda selalu siap untuk perjalanan berikutnya.",
            video: "https://www.youtube.com/embed/ohp67LsfyoI?si=1XySxnKBMb-YEb4z",
        },
        {
            id: 11,
            title: "Tips Meninggalkan Motor Jangka Waktu Lama",
            description:
                "persiapan motor untuk ditinggal lama harus memperhatikan beberapa point penting. disamping aki, mesin harus menjadi pokok utama, berikut secara lengkapnya.",
            video: "https://www.youtube.com/embed/yEy7_7LwMm8?si=usv8dh38qT3CuiCZ",
        },
        {
            id: 12,
            title: "TIPS | Berkendara Motor Listrik Yang Aman Dan Nyaman",
            description:
                "Bertumbuhnya penjualan motor listrik rupanya harus dibarengi dengan tata cara dan kebiasaan para konsumen roda dua dalam menghadapi perubahan zaman.",
            video: "https://www.youtube.com/embed/JnMJg_o5qfI?si=n4CARG2F2XDS0o5v",
        },
        {
            id: 13,
            title: "Oli Mesin Telat Ganti, Mesin Bisa Jadi Korban",
            description:
                "Menunda penggantian oli mesin bukan hanya mengurangi performa, tetapi juga dapat merusak mesin Anda. Video ini akan menjelaskan dampak negatif dari penundaan penggantian oli mesin dan bagaimana hal itu dapat memperpendek umur mesin. Kami akan memberikan panduan langkah demi langkah untuk mengenali tanda-tanda oli mesin yang harus diganti, serta tips untuk menjaga mesin tetap dalam kondisi optimal.",
            video: "https://www.youtube.com/embed/tpvZK8xMfEk?si=UDyP61vYf5LxhbUk",
        },
        {
            id: 14,
            title: "Tips Cara cek motor bekas /second sebelum membeli",
            description:
                "Sebelum membeli motor bekas tentunya kita harus cek kondisi motor nya mulai dari mesin,body,surat surat dan lain nya agar tidak menyesal di kemudian hari. Cara ini bisa di terapkan pada motor matic lain nya seperti vario,spacy scoopt beat pop beat street mio j mio soul gt dll.",
            video: "https://www.youtube.com/embed/gf92Fs0pUoI?si=nWoUnVqxU4x5ZFkw",
        },
        {
            id: 15,
            title: "CVT MOTOR MATIC BERISIK = MENCARI DAN MENGATASI MOTOR MATIC BERISIK KASAR",
            description:
                "Temukan solusi atas masalah CVT motor matic yang berisik dengan panduan kami. Video ini akan memandu Anda melalui proses diagnostik untuk menemukan sumber kebisingan kasar dan langkah-langkah efektif untuk mengatasinya. Dari pemeriksaan komponen hingga tips perawatan, kami akan membantu Anda mengembalikan kenyamanan berkendara Anda.",
            video: "https://www.youtube.com/embed/qKOMgspBkhM?si=2OZCr5XoQ5Pe-KNm",
        },
    ]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tutorialsPerPage, setTutorialsPerPage] = useState(12);

    const indexOfLastTutorial = currentPage * tutorialsPerPage;
    const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
    const currentTutorials = tutorials.slice(
        indexOfFirstTutorial,
        indexOfLastTutorial
    );

    const totalPages = Math.ceil(tutorials.length / tutorialsPerPage);

    const goToFirstPage = () => {
        setCurrentPage(1);
        window.scrollTo(0, 0);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
        window.scrollTo(0, 0);
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => {
            if (prev < totalPages) {
                window.scrollTo(0, 0);
                return prev + 1;
            }
            return prev;
        });
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => {
            if (prev > 1) {
                window.scrollTo(0, 0);
                return prev - 1;
            }
            return prev;
        });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    return (
        <UserLayout>
            <div className={styles["container"]}>
                <section className={styles["content"]}>
                    <h1 className={styles["title"]}>TUTORIAL</h1>
                    <div className={styles["search"]}>
                        <form
                            action="#"
                            method="get"
                            className={styles["search-form"]}
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                id="search"
                                className={styles["search-input"]}
                            />
                            <Button
                                type="button"
                                value="search"
                                id="btn-search"
                                title="Search"
                                className={styles["search-button"]}
                            >
                                <box-icon
                                    name="search"
                                    color="#ffffff"
                                ></box-icon>
                            </Button>
                        </form>
                    </div>
                    <Row className={styles["card-container"]}>
                        {currentTutorials.map((tutorial) => (
                            <Col
                                md={3}
                                key={tutorial.id}
                                style={{ marginBottom: "20px" }}
                            >
                                <Card
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                    }}
                                >
                                    <Card.Header
                                        style={{ padding: 0 }}
                                        className={styles["card-header"]}
                                    >
                                        <iframe
                                            src={tutorial.video}
                                            title={tutorial.title}
                                            frameBorder={0}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            width="100%"
                                            className={styles["video"]}
                                        ></iframe>
                                    </Card.Header>
                                    <Card.Body className={styles["card-body"]}>
                                        <Card.Title
                                            className={styles["card-title"]}
                                        >
                                            {tutorial.title}
                                        </Card.Title>
                                        <Card.Text
                                            className={styles["card-text"]}
                                        >
                                            {tutorial.description}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>
            </div>

            <div className={styles["pagination-container"]}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToFirstPage();
                    }}
                    className={styles["page-item"]}
                >
                    <span className={styles["page-link"]}>&lt;&lt;</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToPreviousPage();
                    }}
                    className={styles["page-item"]}
                >
                    <span className={styles["page-link"]}>&lt;</span>
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`${styles["page-item"]} ${
                            currentPage === number + 1 ? styles["active"] : ""
                        }`}
                    >
                        <span className={styles["page-link"]}>
                            {number + 1}
                        </span>
                    </button>
                ))}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToNextPage();
                    }}
                    className={styles["page-item"]}
                >
                    <span className={styles["page-link"]}>&gt;</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToLastPage();
                    }}
                    className={styles["page-item"]}
                >
                    <span className={styles["page-link"]}>&gt;&gt;</span>
                </button>
            </div>
        </UserLayout>
    );
}
