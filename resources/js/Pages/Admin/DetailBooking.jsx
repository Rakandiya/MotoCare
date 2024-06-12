import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/DetailBooking.module.css";
import DataTable from "react-data-table-component";
import { Row, Col, Table } from "react-bootstrap";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link, useForm, Head, router } from "@inertiajs/react";

export default function DetailBooking({ dataBooking, totalPrice }) {
    const [booking, setBooking] = useState(dataBooking);

    console.log(dataBooking);

    console.log(totalPrice);

    const [produkData, setProdukData] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [reload, setReload] = useState(false);

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
        setProdukData([
            {
                nama_produk: booking.jenis_layanan.jenis_layanan,
                jumlah: 1,
                harga: booking.jenis_layanan.harga,
                totalHarga: booking.jenis_layanan.harga,
            },
        ]);
        addDataToProdukData(booking);
    }, [booking]);

    return (
        <AdminLayout title="MANAJEMEN BOOKING">
            <h1 className={styles["title-page"] + " my-3"}>
                Detail Booking {booking.user.nama}
            </h1>
            <Table
                className={styles["table"]}
                style={{ borderBottom: "1px solid #000" }}
            >
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Nama</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.user.nama}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>No Telepon</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.user.no_telepon}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Email</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.user.email}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Jenis Layanan</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>
                        {booking.jenis_layanan.jenis_layanan}
                    </td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Merk Motor</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>
                        {booking.katalog.merk + " " + booking.katalog.model}
                    </td>
                </tr>

                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Tahun pembuatan</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.tahun_pembuatan}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Nomor Polisi / Nomor Plat</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.nomor_polisi}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Kilometer Kendaraan</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.km_kendaraan}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Jadwal Booking</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>
                        {new Date(booking.jadwal_booking).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" }
                        )}
                    </td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Status</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.status}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Catatan</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.catatan}</td>
                </tr>
            </Table>

            <h1 className={styles["title-page"] + " my-3"}>Data Invoice</h1>

            <Table
                className={styles["table"]}
                style={{ borderTop: "1px solid #000" }}
            >
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Status Pembayaran</th>
                    <td style={{ width: "15px" }}>:</td>
                    <td>{booking.invoice.status}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Tanggal Pembayaran</th>
                    <td style={{ width: "15px" }}>:</td>
                    <td>
                        {new Date(booking.invoice.tanggal).toLocaleDateString(
                            "id-ID",
                            { day: "numeric", month: "long", year: "numeric" }
                        )}
                    </td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Catatan Tambahan</th>
                    <td style={{ width: "15px" }}>:</td>
                    <td>{booking.invoice.catatan}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Total Pembayaran</th>
                    <td style={{ width: "15px" }}>:</td>
                    <td>
                        Rp. {parseInt(totalPrice) + booking.jenis_layanan.harga}
                    </td>
                </tr>
            </Table>

            <Table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama Produk</th>
                        <th>Harga</th>
                        <th>Jumlah</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {produkData.map((item, index) => (
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.nama_produk}</td>
                            <td>{item.harga}</td>
                            <td>{item.jumlah}</td>
                            <td>{item.harga * item.jumlah}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

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
                            <box-icon name="arrow-back" color="#fff"></box-icon>{" "}
                            <span style={{ marginLeft: "10px" }}>KEMBALI</span>
                        </Link>
                    </ButtonAdmin>
                </Col>
                <Col md={{ span: 3, offset: 3 }}>
                    <ButtonAdmin
                        style={{
                            background:
                                "linear-gradient(90deg, #f16211 -14.33%, #e59a6f 85.67%)",
                            fontSize: "20px",
                        }}
                    >
                        <Link
                            href={route("admin.booking.edit", {
                                booking: booking.id,
                            })}
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <box-icon
                                name="edit"
                                type="solid"
                                color="#fff"
                            ></box-icon>{" "}
                            <span style={{ marginLeft: "10px" }}>
                                EDIT BOOKING
                            </span>
                        </Link>
                    </ButtonAdmin>
                </Col>
            </Row>
        </AdminLayout>
    );
}
