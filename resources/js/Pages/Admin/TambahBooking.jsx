import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col } from "react-bootstrap";
import styles from "../../../css/Admin/TambahBooking.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ReactSelect from "react-select";

export default function TambahBooking() {
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedKatalog, setSelectedKatalog] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(false);
    const [userList, setUserList] = useState([
        {
            id: 1,
            name: "John Doe",
            username: "john_doe123",
            email: "john.doe@example.com",
            role: "User",
        },
        {
            id: 2,
            name: "Jane Smith",
            username: "jane_smith456",
            email: "jane.smith@example.com",
            role: "Admin",
        },
        {
            id: 3,
            name: "Michael Johnson",
            username: "michael_johnson789",
            email: "michael.johnson@example.com",
            role: "User",
        },
        {
            id: 4,
            name: "Alice Johnson",
            username: "alice_johnson",
            email: "alice.johnson@example.com",
            role: "User",
        },
        {
            id: 5,
            name: "Robert Brown",
            username: "robert_brown",
            email: "robert.brown@example.com",
            role: "Admin",
        },
        {
            id: 6,
            name: "Sarah Lee",
            username: "sarah_lee",
            email: "sarah.lee@example.com",
            role: "User",
        },
        {
            id: 7,
            name: "Michael Smith",
            username: "michael_smith",
            email: "michael.smith@example.com",
            role: "User",
        },
        {
            id: 8,
            name: "Emma Davis",
            username: "emma_davis",
            email: "emma.davis@example.com",
            role: "Admin",
        },
        {
            id: 9,
            name: "James Wilson",
            username: "james_wilson",
            email: "james.wilson@example.com",
            role: "User",
        },
        {
            id: 10,
            name: "Olivia Taylor",
            username: "olivia_taylor",
            email: "olivia.taylor@example.com",
            role: "Admin",
        },
    ]);

    const [katalogList, setKatalogList] = useState([
        {
            id: "1",
            merk: "Honda",
            model: "BeAT",
        },
        {
            id: "2",
            merk: "Honda",
            model: "PCX160",
        },
        {
            id: "3",
            merk: "Honda",
            model: "Vario 160",
        },

        {
            id: "4",
            merk: "Honda",
            model: "CBR150R",
        },

        {
            id: "5",
            merk: "Yamaha",
            model: "NMAX 155",
        },

        {
            id: "6",
            merk: "Yamaha",
            model: "Aerox",
        },

        {
            id: "7",
            merk: "Yamaha",
            model: "Xmax",
        },

        {
            id: "8",
            merk: "Yamaha",
            model: "XSR 155",
        },

        {
            id: "9",
            merk: "Suzuki",
            model: "GSX-R150",
        },

        {
            id: "10",
            merk: "Suzuki",
            model: "NEX II",
        },
    ]);

    const dataSelectUser = userList.map((user) => ({
        value: user.name,
        label: user.name,
    }));

    const dataSelectKatalog = katalogList.map((katalog) => ({
        value: katalog.id,
        label: katalog.merk + " " + katalog.model,
    })); 

    // const {
    //     data,
    //     setData,
    //     put,
    //     post,
    //     delete: deleteRoute,
    //     processing,
    //     errors,
    // } = useForm({
        // id: "",
        // user_id: "",
        // jenis_layanan: "",
        // merk_motor: "",
        // tahun_pembuatan: "",
        // nomor_polisi: "",
        // km_kendaraan: "",
        // jadwal_booking: "",
        // catatan: "",

    // });
    // const [BookingList, setBookingList] = useState(bookings);

    // handleSubmit untuk tambah booking
    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = data.id
            ? "admin.booking.update"
            : "admin.booking.store";

        const action = data.id ? put : post;
        action(route(routeName, data.id), {
            preserveScroll: true,
            data: data,
            onSuccess: () => {
                setReload(!reload); // Toggle state untuk memicu reload
            },
        });
    };
    return (
        <AdminLayout title="MANAJEMEN BOOKING">
            <div className={styles["form-wrapper"]}>
                <h1 className={styles["title-form"] + " my-3"}>
                    Form Tambah Booking
                </h1>
                <form
                    id="form"
                    onSubmit={handleSubmit}
                    className={styles["form"]}
                >
                    <Row className="justify-content-md-center mb-3">
                        <Col md={4}>
                            <label className={styles["label"]} htmlFor="nama">
                                Nama Customer
                            </label>
                            <ReactSelect
                                id="user"
                                options={dataSelectUser}
                                value={dataSelectUser.find(
                                    (option) => option.value === selectedUser
                                )}
                                onChange={(selectedOption) =>
                                    setSelectedUser(selectedOption.value)
                                }
                                placeholder="Pilih User"
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
                                className={styles["select"]}
                                name="jenis_layanan"
                                id="jenis_layanan"
                            >
                                <option disabled value="Pilih Jenis Layanan">
                                    Pilih Jenis Layanan
                                </option>
                                <option value="Service Rutin">
                                    Service Rutin
                                </option>
                                <option value="Perbaikan Khusu">
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
                            <ReactSelect
                                id="katalog"
                                options={dataSelectKatalog}
                                value={dataSelectKatalog.find(
                                    (option) => option.value === selectedKatalog
                                )}
                                onChange={(selectedOption) =>
                                    setSelectedKatalog(selectedOption.value)
                                }
                                placeholder="Pilih Katalog"
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
                                placeholder="Honda"
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
                                placeholder="CBR 250R"
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
                                placeholder="2024"
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
                                className={styles["catatan"]}
                                name="catatan"
                                id="catatan"
                                rows="4"
                                placeholder="catatan Tambahan"
                                autoComplete="off"
                                required
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
