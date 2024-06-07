import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/DetailBooking.module.css";
import DataTable from "react-data-table-component";
import { Row, Col, Table } from "react-bootstrap";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link, useForm, Head, router } from "@inertiajs/react";


export default function DetailBooking() {
    const [bookings, setBookings] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const [reload, setReload] = useState(false);

    useEffect(() => {
        // Fungsi untuk memuat data dari backend
        const fetchBookings = async () => {
            try {
                const response = await axios.get(bookings); // Ganti dengan endpoint sesuai backend Anda
                setBookings(response.data); // Memasukkan data dari response ke state bookings
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setErrorMessages({ message: 'Error fetching bookings' });
            }
        };

        fetchBookings(); // Memanggil fungsi fetchBookings saat komponen dimuat atau reload berubah
    }, [reload]);


    return (
        <AdminLayout show={showDetail} onHide={handleCloseDetail}>
            <h1 className={styles["title-page"] + " my-3"}>
                Detail Booking John Doe
            </h1>
            <Table className={styles["table"]}>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Nama</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>John Doe</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>No Telepon</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>081234567890</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Email</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>john.doe@example.com</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Jenis Layanan</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>{booking.jenis_layanan}</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Merk Motor</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>Honda</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Model Motor</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>CBR 250R</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Tahun pembuatan</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>2019</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Nomor Polisi / Nomor Plat</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>B 1234 AB</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Kilometer Kendaraan</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>10000</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Jadwal Booking</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>1 Januari 2022</td>
                </tr>
                <tr className={styles["tr"]}>
                    <th className={styles["th"]}>Catatan</th>
                    <td className={styles["td"]}>:</td>
                    <td className={styles["td"]}>
                        Pada saat servis motor, pastikan untuk memeriksa semua
                        bagian penting, termasuk sistem rem, suspensi, dan
                        sistem kelistrikan. Periksa juga kondisi oli mesin,
                        filter udara, dan sistem pendinginan untuk memastikan
                        kinerja optimal. Selain itu, lakukan pemeriksaan rutin
                        terhadap kondisi rantai, roda gigi, dan ban untuk
                        menjaga keamanan dan kenyamanan saat berkendara.
                        Pastikan untuk membersihkan dan merawat motor secara
                        menyeluruh untuk menjaga penampilan dan umur pakainya.
                        Jangan lupa untuk mencatat semua pekerjaan yang telah
                        dilakukan serta rekomendasi untuk perawatan selanjutnya.
                    </td>
                </tr>
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
                            href={route("admin.booking.edit", [1])}
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
