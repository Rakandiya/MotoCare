import { useEffect, useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col } from "react-bootstrap";
import styles from "../../../css/Admin/EditBooking.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";

export default function EditBooking() {
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

    useEffect(() => {
        // Fetch booking data based on ID
        const fetchBookingData = async () => {
            // Here you would fetch the data from your API
            // For demonstration, we'll use hardcoded data
            const booking = {
                id: id,
                nama: "John Doe",
                no_telepon: "123456789",
                email: "johndoe@gmail.com",
                jenis_layanan: "Service Rutin",
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
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit updated booking data
        console.log("Updated booking data:", bookingData);
    };

    return (
        <AdminLayout title="MANAJEMEN BOOKING">
            <div className={styles["form-wrapper"]}>
                <h1 className={styles["title-form"] + " my-3"}>
                    Form Edit Booking
                </h1>
                <form
                    action="#"
                    method="post"
                    id="form"
                    onSubmit={handleSubmit}
                    className={styles["form"]}
                >
                    <Row className="justify-content-md-center mb-3">
                        <Col md={4}>
                            <label className={styles["label"]} htmlFor="nama">
                                Nama
                            </label>
                            <input
                                type="text"
                                name="nama"
                                id="nama"
                                placeholder="John Doe"
                                value={bookingData.nama}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
                        </Col>

                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="no_telepon"
                            >
                                No Telepon
                            </label>
                            <input
                                type="text"
                                name="no_telepon"
                                id="no_telepon"
                                placeholder="123456789"
                                value={bookingData.no_telepon}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
                        </Col>
                        <Col md={4}>
                            <label className={styles["label"]} htmlFor="email">
                                Email
                            </label>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                placeholder="johndoe@gmail.com"
                                value={bookingData.email}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center mb-3">
                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="jenis_layanan"
                            >
                                Jenis Layanan
                            </label>
                            <select
                                name="jenis_layanan"
                                id="jenis_layanan"
                                value={bookingData.jenis_layanan}
                                onChange={handleChange}
                                className={styles["select"]}
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
                                name="merk"
                                id="merk"
                                placeholder="Honda"
                                value={bookingData.merk}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
                        </Col>

                        <Col md={4}>
                            <label className={styles["label"]} htmlFor="model">
                                Model Motor
                            </label>
                            <input
                                type="text"
                                name="model"
                                id="model"
                                placeholder="CBR 250R"
                                value={bookingData.model}
                                onChange={handleChange}
                                autoComplete="off"
                                required
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
                                name="tahun_pembuatan"
                                id="tahun_pembuatan"
                                placeholder="2024"
                                value={bookingData.tahun_pembuatan}
                                onChange={handleChange}
                                autoComplete="off"
                                required
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
                                name="nomor_polisi"
                                id="nomor_polisi"
                                placeholder="AB123CD"
                                value={bookingData.nomor_polisi}
                                onChange={handleChange}
                                autoComplete="off"
                                required
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
                                name="km_kendaraan"
                                id="km_kendaraan"
                                placeholder="15000"
                                value={bookingData.km_kendaraan}
                                onChange={handleChange}
                                autoComplete="off"
                                required
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
                                name="jadwal_booking"
                                id="jadwal_booking"
                                value={bookingData.jadwal_booking}
                                onChange={handleChange}
                                autoComplete="off"
                                required
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
                                name="catatan"
                                id="catatan"
                                rows="4"
                                placeholder="Catatan Tambahan"
                                value={bookingData.catatan}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["catatan"]}
                            ></textarea>
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
