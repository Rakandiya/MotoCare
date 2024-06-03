import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenKatalog.module.css";
import { Row, Col, Modal, Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ButtonAdmin from "@/Components/ButtonAdmin";

export default function ManajemenKatalog() {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedKatalog, setSelectedKatalog] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        id: "",
        merk: "",
        model: "",
        deskripsi: "",
        gambar: "",
    });
    const [katalogList, setKatalog] = useState([
        {
            id: "1",
            merk: "Honda",
            model: "BeAT",
            deskripsi:
                'Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda Beat 2024: <br style="page-break-before: always;"> 1. Periksa dan Ganti Oli Mesin Secara Berkala: Pastikan oli mesin diganti sesuai dengan jadwal yang direkomendasikan oleh pabrikan, biasanya setiap 2.000-4.000 km, untuk menjaga mesin tetap terlubrikasi dengan baik.<br style="page-break-before: always;"> 2. Cek Tekanan Angin Ban: Ban dengan tekanan angin yang tepat tidak hanya meningkatkan efisiensi bahan bakar tetapi juga memperpanjang umur ban dan meningkatkan keamanan berkendara. Periksa tekanan ban secara berkala, idealnya sekali seminggu. <br>3. Bersihkan Filter Udara: Filter udara yang bersih memastikan aliran udara yang baik ke mesin, yang penting untuk menjaga performa motor. Bersihkan filter udara secara teratur dan ganti jika sudah terlalu kotor atau rusak.',
            gambar: "ahm-gaul-sideview-deluxe-black-7-01022023-085330.webp",
        },
        {
            id: "2",
            merk: "Honda",
            model: "PCX160",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda PCX 160: <br> 1. Perawatan Baterai: PCX 160 menggunakan sistem start-stop yang otomatis, yang membuat penggunaan baterai lebih intensif. Pastikan baterai selalu dalam kondisi terisi penuh dan periksa secara berkala untuk memastikan tidak ada kerusakan atau kebocoran. <br>  2. Cek dan Bersihkan Filter Udara: Sistem intake udara yang bersih sangat penting untuk efisiensi bahan bakar dan performa motor. Bersihkan filter udara secara berkala dan ganti jika sudah terlalu kotor atau rusak. <br> 3. Perawatan CVT (Continuous Variable Transmission): Karena menggunakan transmisi CVT, penting untuk memeriksa dan memastikan bahwa sabuk transmisi dalam kondisi baik dan tidak aus. Ganti sabuk CVT sesuai interval yang direkomendasikan oleh pabrikan atau lebih awal jika diperlukan.",
            gambar: "pcx.png",
        },
        {
            id: "3",
            merk: "Honda",
            model: "Vario 160",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda Vario 160: <br> 1. Cek Tekanan Angin Ban: Ban dengan tekanan yang tepat penting untuk menjaga kestabilan dan efisiensi bahan bakar. Periksa tekanan angin ban secara rutin dan sesuaikan sesuai spesifikasi pabrikan. <br> 2. Lubrikasi Rantai dan Sprocket: Meskipun Vario 160 adalah skuter matik, memastikan komponen transmisi seperti sprocket penggerak roda belakang terlubrikasi dengan baik dapat memperpanjang umur komponen dan mengurangi keausan. <br> 3. Periksa dan Ganti Cairan Rem: Untuk menjaga performa sistem pengereman, penting untuk memeriksa level cairan rem secara berkala dan menggantinya setiap 12.000 km atau sesuai anjuran pabrikan.",
            gambar: "vario.png",
        },

        {
            id: "4",
            merk: "Honda",
            model: "CBR150R",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda CBR 150R: <br> 1. Perawatan Sistem Pendinginan: CBR150R menggunakan sistem pendinginan cairan untuk menjaga suhu mesin. Pastikan level cairan pendingin sesuai dan ganti cairan pendingin sesuai jadwal yang direkomendasikan untuk menghindari overheating. <br> 2. Cek dan Atur Ketegangan Rantai: Rantai yang terlalu kendor atau terlalu kencang bisa mempengaruhi performa berkendara dan umur rantai. Pastikan rantai memiliki ketegangan yang tepat dan terlubrikasi dengan baik. <br> 3. Pemeliharaan Suspensi: Cek kondisi oli suspensi depan dan karet seal untuk mencegah kebocoran. Suspensi yang terawat dengan baik penting untuk kenyamanan dan stabilitas saat berkendara, terutama pada motor sport seperti CBR150R.",
            gambar: "cbr.png",
        },

        {
            id: "5",
            merk: "Yamaha",
            model: "NMAX 155",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Yamaha NMAX 155: <br> 1. Periksa dan Ganti Oli Mesin secara Berkala: Oli mesin yang berkualitas dan diganti secara berkala adalah kunci untuk menjaga mesin tetap dalam kondisi terbaik. Pastikan untuk mengganti oli mesin setiap 2.000-3.000 km atau sesuai dengan rekomendasi pabrikan. <br> 2. Cek Sistem VVA (Variable Valve Actuation): Nmax 155 dilengkapi dengan teknologi VVA yang meningkatkan performa mesin. Pastikan sistem VVA berfungsi dengan baik melalui servis berkala di bengkel resmi. <br> 3. Perawatan Sistem Pengereman ABS: Jika Nmax Anda dilengkapi dengan ABS, pastikan sistem ini diperiksa secara berkala oleh teknisi yang berkualifikasi untuk memastikan keamanan maksimal saat berkendara.",
            gambar: "nmax.png",
        },

        {
            id: "6",
            merk: "Yamaha",
            model: "Aerox",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Yamaha Aerox 155: <br> 1. Bersihkan Filter Udara secara Rutin: Aerox 155 memerlukan aliran udara yang optimal untuk performa mesin yang efisien. Bersihkan filter udara secara berkala dan ganti bila diperlukan untuk menjaga performa mesin.<br> 2.Cek dan Atur Tekanan Angin Ban: Pastikan ban selalu dalam kondisi tekanan yang ideal. Ban dengan tekanan yang tepat tidak hanya memperpanjang umur ban tetapi juga meningkatkan efisiensi bahan bakar dan kestabilan saat berkendara.<br> 3. Periksa Sabuk CVT dan Roller: Sebagai skuter matik, kondisi sabuk CVT dan roller sangat penting untuk transmisi yang halus dan efisien. Periksa dan ganti komponen-komponen ini sesuai kebutuhan atau sesuai interval yang disarankan oleh pabrikan.",
            gambar: "aerox.png",
        },

        {
            id: "7",
            merk: "Yamaha",
            model: "Xmax",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Honda CBR 150R:<br> 1. Perawatan Sistem Pendinginan: Xmax 250 menggunakan sistem pendinginan cairan yang memerlukan perhatian khusus. Pastikan untuk memeriksa level cairan pendingin secara berkala dan mengganti cairan pendingin setiap 20.000 km atau sesuai dengan petunjuk pabrikan. <br> 2. Periksa dan Ganti Filter Oli Mesin: Selain oli mesin, filter oli juga perlu diganti secara berkala untuk menjaga mesin bekerja dengan lancar. Pastikan untuk mengganti filter oli setiap kali Anda mengganti oli mesin.",
            gambar: "xmax.png",
        },

        {
            id: "8",
            merk: "Yamaha",
            model: "XSR 155",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Yamaha XSR 155:<br> 1. Ganti Oli Mesin Secara Berkala: Oli mesin berperan vital dalam menjaga mesin tetap bersih dan terlubrikasi dengan baik. Pastikan untuk mengganti oli mesin XSR 155 Anda sesuai interval yang disarankan oleh Yamaha, yaitu setiap 3.000 hingga 5.000 km, tergantung pada kondisi penggunaan.<br> 2.Periksa Level Oli: Selalu periksa level oli mesin secara rutin, minimal sekali sebulan atau sebelum melakukan perjalanan jauh, untuk memastikan mesin selalu terlubrikasi dengan baik.<br> 3. Lubrikasi Rantai: Rantai yang kering bisa menyebabkan keausan cepat dan mengurangi efisiensi transmisi. Lubrikasi rantai secara teratur, idealnya setiap 500 km atau setelah terpapar hujan, dapat membantu memperpanjang umur rantai dan sprocket.",
            gambar: "xsr.png",
        },

        {
            id: "9",
            merk: "Suzuki",
            model: "GSX-R150",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Suzuki GSX-R150: <br> 1. Lakukan perawatan rutin seperti penggantian oli dan filter sesuai jadwal.<br> 2. Jaga kebersihan motor dengan membersihkan secara teratur. 3. Pelumasan rantai secara teratur untuk menghindari keausan berlebihan.",
            gambar: "gsx-r150.webp",
        },

        {
            id: "10",
            merk: "Suzuki",
            model: "NEX II",
            deskripsi:
                "Untuk menjaga performa dan memastikan umur panjang kendaraan, berikut adalah beberapa tips perawatan untuk Suzuki NEX II: <br> 1. Lakukan perawatan rutin seperti penggantian oli, servis, dan pembersihan secara teratur.<br> 3.Perhatikan tekanan ban dan lakukan pelumasan rantai secara berkala.<br> 3. Periksa sistem rem dan suspensi secara teratur untuk menjaga kinerja optimal.",
            gambar: "next_2.webp",
        },
    ]);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (katalog) => {
        setShowDetail(true);
        setSelectedKatalog(katalog);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (katalog) => {
        setShowDelete(true);
        setSelectedKatalog(katalog);
    };
    const columns = [
        {
            name: "Merk Motor",
            selector: (row) => row.merk + " " + row.model,
        },
        {
            name: "Action",
            selector: (row) => (
                <>
                    <Link
                        href="#"
                        onClick={() => handleShowDetail(row)}
                        style={{ color: "#f16211" }}
                    >
                        <box-icon
                            name="info-circle"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        href="#"
                        onClick={() => handleEditKatalog(row)}
                        className="mx-2"
                    >
                        <box-icon
                            name="edit"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        href="#"
                        onClick={() => handleShowDelete(row)}
                        style={{ color: "#f16211" }}
                    >
                        <box-icon
                            name="trash"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                </>
            ),
        },
    ];

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditKatalog = (katalog) => {
        setFormData({
            id: katalog.id,
            merk: katalog.merk,
            model: katalog.model,
            deskripsi: katalog.deskripsi,
            gambar: katalog.gambar,
        });
        setPreviewImage(katalog.gambar);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lakukan update katalog atau operasi yang diperlukan
        console.log("Form Data:", formData);
    };

    return (
        <AdminLayout title="Manajemen Katalog">
            <Row>
                <Col md={6} style={{ borderRight: "2px solid #f16211" }}>
                    <h1 className={styles["title-table"]}>Daftar Katalog</h1>

                    <form
                        action="#"
                        id="form-search"
                        className={
                            styles["form-search"] +
                            " d-flex justify-content-md-start"
                        }
                        style={{ width: "60%" }}
                    >
                        <span className={styles["icon-search"]}>
                            <box-icon name="search" color="#f16211"></box-icon>
                        </span>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Cari Katalog"
                            autoComplete="off"
                            className={styles["search"]}
                        />
                    </form>
                    <DataTable
                        columns={columns}
                        data={katalogList}
                        pagination
                        responsive
                        striped
                        className="table-striped"
                    />
                </Col>
                <Col md={6}>
                    <div className="form-merk-motor">
                        <h1 className={styles["title-form"]}>Form Katalog</h1>
                    </div>
                    <form
                        action="#"
                        method="post"
                        id="form"
                        onSubmit={handleSubmit}
                        className={styles["form"]}
                    >
                        <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={formData.id}
                        />
                        <Row className="mb-3">
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="text"
                                    name="merk"
                                    id="merk"
                                    placeholder="Merk Motor"
                                    autoComplete="off"
                                    required
                                    value={formData.merk}
                                    onChange={handleInputChange}
                                    className={styles["input-merk"]}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="text"
                                    name="model"
                                    id="model"
                                    placeholder="Model Motor"
                                    autoComplete="off"
                                    required
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    className={styles["input-model"]}
                                />
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center my-3">
                            <Col md={6}>
                                <input
                                    type="file"
                                    name="gambar"
                                    id="gambar"
                                    required
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleFotoChange}
                                    className={
                                        styles["input-gambar"] + " gambar"
                                    }
                                />
                                <label
                                    htmlFor="gambar"
                                    className={styles["label-gambar"]}
                                >
                                    <div className={styles["label-gambar-div"]}>
                                        <box-icon
                                            name="plus"
                                            color="#f16211"
                                        ></box-icon>
                                    </div>
                                    Tambah Gambar
                                </label>
                            </Col>
                            <Col md={6}>
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        className={styles["img-preview"]}
                                        id="img-preview"
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        src="/images/preview.png"
                                        className={styles["img-preview"]}
                                        id="img-preview"
                                        alt=""
                                        width="100px"
                                    />
                                )}
                            </Col>
                        </Row>
                        <Row className="mb-4">
                            <Col md={{ span: 12 }}>
                                <textarea
                                    name="deskripsi"
                                    id="deskripsi"
                                    rows="6"
                                    placeholder="Deskripsi"
                                    autoComplete="off"
                                    required
                                    value={formData.deskripsi}
                                    onChange={handleInputChange}
                                    className={styles["deskripsi"]}
                                >
                                    {formData.deskripsi}
                                </textarea>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 8, offset: 4 }}>
                                <ButtonAdmin
                                    type="submit"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #f16211 -14.33%, #e59a6f 85.67%)",
                                        fontSize: "20px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        textAlign: "center",
                                    }}
                                >
                                    <box-icon
                                        name="save"
                                        type="solid"
                                        color="#fff"
                                    ></box-icon>{" "}
                                    <span className="ms-2">SUBMIT</span>
                                </ButtonAdmin>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>

            {/* Modal Show Detail */}
            <Modal size="lg" show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Katalog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>
                        Detail Data Katalog Motor{" "}
                        <span className="title">
                            {selectedKatalog && selectedKatalog.name}
                        </span>
                    </h2>
                    <Table borderless className={styles["table"]}>
                        <tbody>
                            <tr>
                                <th>Merk</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedKatalog && selectedKatalog.merk}
                                </td>
                            </tr>
                            <tr>
                                <th>Model</th>
                                <td className={styles["td"]}>:</td>
                                <td className="model">
                                    {selectedKatalog && selectedKatalog.model}
                                </td>
                            </tr>
                            <tr>
                                <th>Deskripsi</th>
                                <td className={styles["td"]}>:</td>
                                <td className="deskripsi">
                                    {selectedKatalog &&
                                        selectedKatalog.deskripsi}
                                </td>
                            </tr>
                            <tr>
                                <th>Gambar</th>
                                <td className={styles["td"]}>:</td>
                                <td className="gambar-modal">
                                    {selectedKatalog &&
                                    selectedKatalog.gambar ? (
                                        <img
                                            src={selectedKatalog.gambar}
                                            alt="Image Preview Gambar Motor"
                                            className="img-preview-modal"
                                        />
                                    ) : (
                                        "Gambar tidak tersedia"
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Show Delete */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Katalog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus katalog:{" "}
                        <b>
                            {selectedKatalog &&
                                selectedKatalog.merk +
                                    " " +
                                    selectedKatalog.model}
                        </b>
                        ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <ButtonAdmin
                        variant="primary"
                        onClick={handleCloseDelete}
                        style={{
                            backgroundColor: "#f16211",
                            borderColor: "#f16211",
                        }}
                    >
                        Ya, Hapus
                    </ButtonAdmin>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
}
