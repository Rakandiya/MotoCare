import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col } from "react-bootstrap";
import styles from "../../../css/Admin/TambahBooking.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ReactSelect from "react-select";
import { Head, useForm, router } from "@inertiajs/react";

export default function TambahBooking({ katalogs, users, jenisLayanans }) {
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedKatalog, setSelectedKatalog] = useState("");
    const [selectedJenisLayanan, setSelectedJenisLayanan] = useState("");

    // DROP DOWN: ambil nama dari tabel users
    const [userList, setUserList] = useState(users);

    // DROP DOWN: ambil merk motor dari tabel katalogs
    const [katalogList, setKatalogList] = useState(katalogs);

    const [jenisLayananList, setJenisLayananList] = useState(jenisLayanans);

    const dataSelectJenisLayanan = jenisLayananList.map((layanan) => ({
        value: layanan.id,
        label: layanan.jenis_layanan,
    }));

    const dataSelectUser = userList.map((user) => ({
        value: user.id,
        label: user.nama,
    }));

    const dataSelectKatalog = katalogList.map((katalog) => ({
        value: katalog.id,
        label: katalog.merk + " " + katalog.model,
    }));

    const { data, setData, post, processing, errors } = useForm({
        id: "",
        user_id: selectedUser.id,
        jenis_layanan_id: selectedJenisLayanan.id,
        katalog_id: selectedKatalog.id,
        tahun_pembuatan: "",
        nomor_polisi: "",
        km_kendaraan: "",
        jadwal_booking: "",
        catatan: "",
    });

    // useEffect(() => {
    //     setData({
    //         ...data,
    //         jenis_layanan_id: selectedJenisLayanan.id,
    //     });
    // }, [selectedJenisLayanan]);

    const [errorMessages, setErrorMessages] = useState({});

    // handleSubmit untuk tambah booking
    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = "admin.booking.store";

        console.log(data);

        const action = post;
        action(route(routeName), {
            preserveScroll: true,
            data: data,
            onSuccess: () => {
                setReload(!reload); // Toggle state untuk memicu reload
            },
            onError: () => {
                console.log(errors);
            },
        });
    };

    useEffect(() => {
        // Hanya membersihkan errorMessages jika form berhasil disubmit dan tidak ada error
        setErrorMessages(errors);
    }, [errors]);

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
                                onChange={(selectedOption) => {
                                    setSelectedUser(selectedOption.value);
                                    setData((prevData) => ({
                                        ...prevData,
                                        user_id: selectedOption.value,
                                    }));
                                }}
                                placeholder="Pilih User"
                            />
                            {errorMessages.user_id && (
                                <small className="text-danger">
                                    {errorMessages.user_id}
                                </small>
                            )}
                        </Col>
                        <Col md={4}>
                            <label
                                className={styles["label"]}
                                htmlFor="jenis_layanan"
                            >
                                Jenis Layanan
                            </label>
                            <ReactSelect
                                id="jenisLayanan"
                                options={dataSelectJenisLayanan}
                                value={dataSelectJenisLayanan.find(
                                    (option) =>
                                        option.value === selectedJenisLayanan
                                )}
                                onChange={(selectedOption) => {
                                    setSelectedJenisLayanan(
                                        selectedOption.value
                                    );
                                    setData((prevData) => ({
                                        ...prevData,
                                        jenis_layanan_id: selectedOption.value,
                                    }));
                                }}
                                placeholder="Pilih Jenis Layanan"
                            />
                            {errorMessages.jenis_layanan && (
                                <small className="text-danger">
                                    {errorMessages.jenis_layanan}
                                </small>
                            )}
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
                                onChange={(selectedOption) => {
                                    setSelectedKatalog(selectedOption.value);
                                    setData((prevData) => ({
                                        ...prevData,
                                        katalog_id: selectedOption.value,
                                    }));
                                }}
                                placeholder="Pilih Katalog"
                            />
                            {errorMessages.katalog_id && (
                                <small className="text-danger">
                                    {errorMessages.katalog_id}
                                </small>
                            )}
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
                                onChange={handleInputChange}
                                value={data.tahun_pembuatan}
                            />
                            {errorMessages.tahun_pembuatan && (
                                <small className="text-danger">
                                    {errorMessages.tahun_pembuatan}
                                </small>
                            )}
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
                                placeholder="B 1234 ABC"
                                autoComplete="off"
                                required
                                className={styles["input"]}
                                onChange={handleInputChange}
                                value={data.nomor_polisi}
                            />
                            {errorMessages.nomor_polisi && (
                                <small className="text-danger">
                                    {errorMessages.nomor_polisi}
                                </small>
                            )}
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
                                placeholder="10000"
                                autoComplete="off"
                                required
                                className={styles["input"]}
                                onChange={handleInputChange}
                                value={data.km_kendaraan}
                            />
                            {errorMessages.km_kendaraan && (
                                <small className="text-danger">
                                    {errorMessages.km_kendaraan}
                                </small>
                            )}
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
                                onChange={handleInputChange}
                                value={data.jadwal_booking}
                            />
                            {errorMessages.jadwal_booking && (
                                <small className="text-danger">
                                    {errorMessages.jadwal_booking}
                                </small>
                            )}
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
                                onChange={handleInputChange}
                                value={data.catatan}
                            ></textarea>
                            {errorMessages.catatan && (
                                <small className="text-danger">
                                    {errorMessages.catatan}
                                </small>
                            )}
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
