import { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col, Button, Table } from "react-bootstrap";
import styles from "../../../css/Admin/EditBooking.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import ReactSelect from "react-select";

export default function AddInvoice({ booking }) {
    // const { id } = useParams();
    const [bookingData, setBookingData] = useState({
        nama: "",
        no_telepon: "",
        email: "",
        jenis_layanan: "",
        merk: "",
        model: "",
        tahun_pembuatan: "",
        nomor_polisi: "",
        km_kendaraan: "",
        jadwal_booking: "",
        catatan: "",
    });

    const [produkData, setProdukData] = useState([]);
    const [selectedProduk, setSelectedProduk] = useState("");
    const [jumlah, setJumlah] = useState(1);
    const [harga, setHarga] = useState(0);

    const [produkList, setProdukList] = useState([
        { namaProduk: "Oli Mesin", harga: 75000 },
        { namaProduk: "Filter Oli", harga: 30000 },
        { namaProduk: "Busi", harga: 20000 },
        { namaProduk: "Kampas Rem", harga: 50000 },
        { namaProduk: "V-Belt", harga: 150000 },
        { namaProduk: "Air Radiator", harga: 25000 },
        { namaProduk: "Ganti Ban", harga: 300000 },
    ]);

    const dataSelect = produkList.map((produk) => ({
        value: produk.namaProduk,
        label: produk.namaProduk,
    }));

    const colums = [
        {
            name: "Nama Produk",
            selector: (row) => row.namaProduk,
        },
        {
            name: "Jumlah",
            selector: (row) => row.jumlah,
        },
        {
            name: "Harga Satuan",
            selector: (row) => row.harga.toLocaleString(),
        },
        {
            name: "Total Harga",
            selector: (row) => row.totalHarga.toLocaleString(),
        },
        {
            name: "Aksi",
            selector: (row, index) => (
                <Button
                    variant="danger"
                    onClick={() => handleHapusProduk(index)}
                    size="sm"
                    style={{ fontSize: "5px", padding: "2px 5px" }}
                >
                    <box-icon
                        name="trash"
                        type="solid"
                        color="#fff"
                        size="18px"
                    ></box-icon>
                </Button>
            ),
            width: "10%",
        },
    ];

    useEffect(() => {
        const produk = produkList.find((p) => p.namaProduk === selectedProduk);
        if (produk) {
            setHarga(produk.harga * jumlah);
        } else {
            setHarga(0); // Reset harga jika tidak ada produk yang dipilih
        }
    }, [selectedProduk, jumlah]);

    const handleTambahProduk = () => {
        const produk = produkList.find((p) => p.namaProduk === selectedProduk);
        if (produk) {
            const newData = {
                namaProduk: produk.namaProduk,
                jumlah: jumlah,
                harga: produk.harga,
                totalHarga: produk.harga * jumlah,
            };
            setProdukData([...produkData, newData]);
            setSelectedProduk("");
            setJumlah(1);
            setHarga(0);
        }
    };

    const handleHapusProduk = (index) => {
        const list = [...produkData];
        list.splice(index, 1);
        setProdukData(list);
    };

    useEffect(() => {
        // Fetch booking data based on ID
        const fetchBookingData = async () => {
            // Here you would fetch the data from your API
            // For demonstration, we'll use hardcoded data
            const booking = {
                id: 101,
                nama: "John Doe",
                jenis_layanan: "Cek Kendaraan",
                merk: "Honda",
                model: "CBR 250R",
                tahun_pembuatan: "2024",
                nomor_polisi: "AB123CD",
                km_kendaraan: "15000",
                jadwal_booking: "2024-06-01",
                catatan: "Please check the brakes.",
            };
            setBookingData(booking);
        };
        fetchBookingData();
    }, [101]);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit updated booking data
        console.log("Updated booking data:", bookingData);
    };

    return (
        <AdminLayout title="MANAJEMEN BOOKING">
            <div className={styles["form-wrapper"]}>
                <h1 className={styles["title-form"] + " my-3"}>Data Booking</h1>
                <form action="#" id="form" className={styles["form"]}>
                    <Row className="justify-content-md-center mb-3">
                        <Col md={4}>
                            <label className={styles["label"]} htmlFor="nama">
                                Nama Customer
                            </label>
                            <input
                                type="text"
                                value={bookingData.nama}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                                disabled
                            />
                        </Col>

                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="jenis_layanan"
                            >
                                Jenis Layanan
                            </label>
                            <select
                                value={bookingData.jenis_layanan}
                                className={styles["select"]}
                                disabled
                            >
                                <option disabled value="">
                                    Pilih Jenis Layanan
                                </option>
                                <option value="Service Rutin">
                                    Service Rutin
                                </option>
                                <option value="Perbaikan Khusus">
                                    Perbaikan Khusus
                                </option>
                                <option value="Tune Up / Bore Up">
                                    Tune Up / Bore Up
                                </option>
                                <option value="Cek Kendaraan">
                                    Cek Kendaraan
                                </option>
                            </select>
                        </Col>
                        <Col md={4}>
                            <label className={styles["label"]} htmlFor="merk">
                                Merk Motor
                            </label>
                            <input
                                type="text"
                                value={bookingData.merk}
                                autoComplete="off"
                                required
                                disabled
                                className={styles["input"]}
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center mb-3">
                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="tahun_pembuatan"
                            >
                                Tahun Pembuatan
                            </label>
                            <input
                                type="text"
                                value={bookingData.tahun_pembuatan}
                                autoComplete="off"
                                required
                                disabled
                                className={styles["input"]}
                            />
                        </Col>

                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="nomor_polisi"
                            >
                                Nomor Polisi
                            </label>
                            <input
                                type="text"
                                value={bookingData.nomor_polisi}
                                autoComplete="off"
                                required
                                disabled
                                className={styles["input"]}
                            />
                        </Col>

                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="km_kendaraan"
                            >
                                Kilometer Kendaraan
                            </label>
                            <input
                                type="text"
                                value={bookingData.km_kendaraan}
                                autoComplete="off"
                                required
                                disabled
                                className={styles["input"]}
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="jadwal_booking"
                            >
                                Jadwal Booking
                            </label>
                            <input
                                type="date"
                                value={bookingData.jadwal_booking}
                                autoComplete="off"
                                required
                                disabled
                                className={styles["input"]}
                            />
                        </Col>

                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="catatan"
                            >
                                Catatan Tambahan
                            </label>
                            <textarea
                                rows="4"
                                value={bookingData.catatan}
                                autoComplete="off"
                                required
                                disabled
                                className={styles["catatan"]}
                            ></textarea>
                        </Col>
                    </Row>
                </form>
            </div>
            <hr
                className="my-5"
                style={{ border: "2px solid #f16211", color: "#f16211" }}
            />
            <div className={styles["form-wrapper"]}>
                <h1 className={styles["title-form"] + " my-3"}>Form Invoice</h1>
                <form
                    action="#"
                    method="post"
                    id="form"
                    onSubmit={handleSubmit}
                    className={styles["form"]}
                >
                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="produk">
                                Nama Produk
                            </label>
                            <ReactSelect
                                id="produk"
                                options={dataSelect}
                                value={dataSelect.find(
                                    (option) => option.value === selectedProduk
                                )}
                                onChange={(selectedOption) =>
                                    setSelectedProduk(selectedOption.value)
                                }
                                placeholder="Pilih Produk"
                            />
                        </Col>
                        <Col md={2}>
                            <label className={styles["label"]} htmlFor="jumlah">
                                Jumlah
                            </label>
                            <input
                                type="number"
                                className={styles["input"]}
                                value={jumlah}
                                onChange={(e) =>
                                    setJumlah(Number(e.target.value))
                                }
                                min="1"
                                required
                            />
                        </Col>
                        <Col md={2}>
                            <label className={styles["label"]} htmlFor="harga">
                                Harga
                            </label>
                            <input
                                type="text"
                                name="harga"
                                id="harga"
                                disabled
                                className={styles["input"]}
                                value={harga}
                                required
                            />
                        </Col>
                        <Col md={{ span: 2 }} className="text-center">
                            <label className={styles["label"]} htmlFor="aksi">
                                Aksi
                            </label>
                            <Button
                                title="Tambah Produk"
                                onClick={handleTambahProduk}
                                style={{
                                    backgroundColor: "#f16211",
                                    border: "none",
                                    padding: "5px 5px 2px",
                                    marginTop: "5px",
                                }}
                                size="sm"
                            >
                                <box-icon
                                    name="plus"
                                    color="#fff"
                                    size="18px"
                                ></box-icon>
                            </Button>
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="jenis_layanan"
                            >
                                Status Pembayaran
                            </label>
                            <select
                                value={bookingData.status_pembayaran}
                                className={styles["select"]}
                                name="status_pembayaran"
                                id="status_pembayaran"
                            >
                                <option disabled value="">
                                    Pilih Status Pembayaran
                                </option>
                                <option value="Unpaid">Unpaid</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </Col>

                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="catatan"
                            >
                                Catatan Tambahan
                            </label>
                            <textarea
                                rows="4"
                                name="catatan"
                                id="catatan"
                                value={bookingData.catatan}
                                autoComplete="off"
                                required
                                className={styles["catatan"]}
                            ></textarea>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <DataTable
                                columns={colums}
                                data={produkData}
                                striped
                                responsive
                                hover
                            />
                        </Col>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <ButtonAdmin
                                variant="secondary"
                                style={{
                                    backgroundColor: "rgba(183, 182, 182, 0.8)",
                                    fontSize: "20px",
                                }}
                            >
                                <Link
                                    href={route("admin.booking.index")}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                        display: "flex",
                                        alignItems: "center",
                                    }}
                                >
                                    <box-icon
                                        name="arrow-back"
                                        color="#fff"
                                    ></box-icon>{" "}
                                    <span style={{ marginLeft: "10px" }}>
                                        KEMBALI
                                    </span>
                                </Link>
                            </ButtonAdmin>
                        </Col>
                        <Col md={{ span: 2, offset: 4 }}>
                            <ButtonAdmin
                                style={{
                                    background:
                                        "linear-gradient(90deg, #f16211 -14.33%, #e59a6f 85.67%)",
                                    fontSize: "20px",
                                }}
                                type="submit"
                            >
                                <box-icon
                                    name="save"
                                    type="solid"
                                    color="#fff"
                                ></box-icon>{" "}
                                <span style={{ marginLeft: "10px" }}>
                                    SUBMIT
                                </span>
                            </ButtonAdmin>
                        </Col>
                    </Row>
                </form>
            </div>
        </AdminLayout>
    );
}
