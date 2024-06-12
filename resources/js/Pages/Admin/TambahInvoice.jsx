import { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col, Button, Table } from "react-bootstrap";
import styles from "../../../css/Admin/EditBooking.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link, useForm } from "@inertiajs/react";
import DataTable from "react-data-table-component";
import ReactSelect from "react-select";

export default function AddInvoice({ booking, produks }) {
    // const { id } = useParams();
    // console.log(booking);

    const [bookingData, setBookingData] = useState(booking);
    const [produkData, setProdukData] = useState([]);
    const [selectedProduk, setSelectedProduk] = useState("");
    const [jumlah, setJumlah] = useState(1);
    const [harga, setHarga] = useState(0);

    const [produkList, setProdukList] = useState(produks);

    const { data, setData, post, put, processing, errors } = useForm({
        id: booking.invoice.id,
        user_id: booking.invoice.user_id,
        booking_id: booking.id,
        tanggal: booking.invoice.tanggal,
        status: booking.invoice.status || "Unpaid",
        catatan: booking.invoice.catatan || "",
        produk: produkData,
    });

    // console.log("Data: ", data);

    const addDataToProdukData = (newData) => {
        // console.log(newData);
        if (
            newData.invoice &&
            newData.invoice.items &&
            newData.invoice.items.length > 0
        ) {
            const newItems = newData.invoice.items.map((item) => ({
                id: item.produk.id,
                nama_produk: item.produk.nama_produk,
                jumlah: item.jumlah,
                harga: item.produk.harga,
                totalHarga: item.jumlah * item.produk.harga,
            }));
            console.log(newItems);
            setProdukData((prevData) => [...prevData, ...newItems]);
        } else {
            console.error("No items found in the invoice");
        }
    };

    useEffect(() => {
        // This will run after the component is mounted
        addDataToProdukData(booking);
    }, [booking]);

    const dataSelect = produkList.map((produk) => ({
        value: produk.nama_produk,
        label: produk.nama_produk,
    }));

    const colums = [
        {
            name: "Nama Produk",
            selector: (row) => row.nama_produk,
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
                <>
                    <Button
                        variant="warning"
                        onClick={() => handleKurangiProduk(index)}
                        size="sm"
                        style={{
                            fontSize: "5px",
                            padding: "2px 5px",
                        }}
                    >
                        <box-icon
                            name="minus"
                            type="solid"
                            color="#fff"
                            size="18px"
                        ></box-icon>
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleHapusProduk(index)}
                        size="sm"
                        style={{
                            fontSize: "5px",
                            padding: "2px 5px",
                            marginLeft: "10px",
                        }}
                    >
                        <box-icon
                            name="trash"
                            type="solid"
                            color="#fff"
                            size="18px"
                        ></box-icon>
                    </Button>
                </>
            ),
            // width: "10%",
        },
    ];

    // useEffect(() => {
    //     setProdukData(invoice.items);
    // }, [invoice.items]);

    useEffect(() => {
        const produk = produkList.find((p) => p.nama_produk === selectedProduk);
        if (produk) {
            setHarga(produk.harga * jumlah);
        } else {
            setHarga(0); // Reset harga jika tidak ada produk yang dipilih
        }
    }, [selectedProduk, jumlah]);

    useEffect(() => {
        // console.log("Produk data updated:", produkData);
        setData((data) => ({
            ...data,
            produk: produkData,
        }));
    }, [produkData]);

    const handleTambahProduk = () => {
        const produk = produkList.find((p) => p.nama_produk === selectedProduk);
        if (produk) {
            // Cari apakah produk sudah ada dalam array
            const existingProdukIndex = produkData.findIndex(
                (p) => p.id === produk.id
            );
            if (existingProdukIndex !== -1) {
                // Jika produk sudah ada, tingkatkan jumlahnya
                const updatedProdukData = produkData.map((item, index) => {
                    if (index === existingProdukIndex) {
                        return {
                            ...item,
                            jumlah: item.jumlah + jumlah,
                            totalHarga: (item.jumlah + jumlah) * item.harga,
                        };
                    }
                    return item;
                });
                setProdukData(updatedProdukData);
            } else {
                // Jika produk belum ada, tambahkan sebagai entri baru
                const newData = {
                    id: produk.id,
                    nama_produk: produk.nama_produk,
                    jumlah: jumlah,
                    harga: produk.harga,
                    totalHarga: produk.harga * jumlah,
                };
                setProdukData([...produkData, newData]);
            }
            // Reset input
            setSelectedProduk("");
            setJumlah(1);
            setHarga(0);
        }
    };

    const handleKurangiProduk = (index) => {
        const updatedProdukData = produkData
            .map((item, idx) => {
                if (idx === index) {
                    // Kurangi jumlah, jika setelah dikurangi jumlahnya 0, akan dihapus oleh filter di bawah
                    return {
                        ...item,
                        jumlah: item.jumlah - 1,
                        totalHarga: (item.jumlah - 1) * item.harga,
                    };
                }
                return item;
            })
            .filter((item) => item.jumlah > 0); // Hapus item jika jumlahnya 0

        setProdukData(updatedProdukData);
        console.log("Produk dikurangi atau dihapus pada index:", index);
    };

    const handleHapusProduk = (index) => {
        setProdukData((prevData) => {
            const newData = [...prevData];
            newData.splice(index, 1);
            console.log("Produk dihapus pada index:", index);
            return newData;
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route("admin.booking.updateInvoice", { booking: booking.id }), {
            preserveScroll: true,
            data: data,
            onSuccess: () => {
                console.log("Invoice updated");
            },
        });

        // Submit updated booking data
        console.log("Updated booking data:", data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
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
                                value={bookingData.user.nama}
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
                            <input
                                type="text"
                                value={bookingData.jenis_layanan.jenis_layanan}
                                autoComplete="off"
                                required
                                disabled
                                className={styles["input"]}
                            />
                        </Col>
                        <Col md={4}>
                            <label className={styles["label"]} htmlFor="merk">
                                Merk Motor
                            </label>
                            <input
                                type="text"
                                value={
                                    bookingData.katalog.merk +
                                    " " +
                                    bookingData.katalog.model
                                }
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
                        <Col md={4}>
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

                        <Col md={4}>
                            <label className={styles["label"]} htmlFor="status">
                                Status
                            </label>
                            <input
                                type="text"
                                value={bookingData.status}
                                autoComplete="off"
                                required
                                disabled
                                className={styles["input"]}
                            />
                        </Col>

                        <Col md={4}>
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
                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="jenis_layanan"
                            >
                                Status Pembayaran
                            </label>
                            <select
                                value={data.status}
                                className={styles["select"]}
                                name="status"
                                id="status"
                                onChange={handleInputChange}
                            >
                                <option disabled value="">
                                    Pilih Status Pembayaran
                                </option>
                                <option value="Unpaid">Unpaid</option>
                                <option value="Paid">Paid</option>
                            </select>
                        </Col>

                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="tanggal"
                            >
                                Tanggal
                            </label>
                            <input
                                type="date"
                                name="tanggal"
                                id="tanggal"
                                className={styles["input"]}
                                value={data.tanggal}
                                onChange={(e) =>
                                    setData({
                                        ...data,
                                        tanggal: e.target.value,
                                    })
                                }
                            />
                        </Col>

                        <Col md={4}>
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
                                value={data.catatan}
                                autoComplete="off"
                                className={styles["catatan"]}
                                onChange={handleInputChange}
                            ></textarea>
                        </Col>
                    </Row>

                    <h2 className={styles["title-form"] + " my-3"}>
                        Tambah Produk
                    </h2>

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
