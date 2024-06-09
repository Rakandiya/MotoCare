import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col } from "react-bootstrap";
import styles from "../../../css/Admin/TambahUser.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { route } from "ziggy-js";
import { Head, useForm, router, usePage } from "@inertiajs/react";

export default function TambahUser() {
    const errMessage = usePage().props.errors;
    const [previewImage, setPreviewImage] = useState(null);

    const { data, setData, post, errors } = useForm({
        nama: "",
        username: "",
        email: "",
        tanggal_lahir: "",
        no_telepon: "",
        jenis_kelamin: "Pilih Jenis Kelamin", // Set default sesuai ENUM
        password: "",
        password_confirmation: "",
        role: "Pilih Role",
        foto: null,
    });

    useEffect(() => {
        if (errMessage) {
            setErrorMessages(errMessage);
        }
    }, [errMessage]);

    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        setData({ ...data, foto: file });
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "jenis_kelamin") {
            setData({ ...data, jenis_kelamin: value });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordType(
            confirmPasswordType === "password" ? "text" : "password"
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validasi
        const newErrors = {};
        if (!data.nama) newErrors.nama = "Nama tidak boleh kosong";
        if (!data.username) newErrors.username = "Username tidak boleh kosong";
        if (!data.email) newErrors.email = "Email tidak boleh kosong";
        if (!data.tanggal_lahir)
            newErrors.tanggal_lahir = "Tanggal lahir tidak boleh kosong";
        if (!data.no_telepon)
            newErrors.no_telepon = "No Telepon tidak boleh kosong";
        if (data.jenis_kelamin === "Pilih Jenis Kelamin")
            newErrors.jenis_kelamin = "Jenis kelamin tidak boleh kosong";
        if (!data.password) newErrors.password = "Password tidak boleh kosong";
        if (!data.password_confirmation)
            newErrors.password_confirmation =
                "Konfirmasi password tidak boleh kosong";
        if (data.password !== data.password_confirmation)
            newErrors.password_confirmation =
                "Konfirmasi password tidak sesuai";
        if (data.role === "Pilih Role")
            newErrors.role = "Role tidak boleh kosong";

        if (Object.keys(newErrors).length > 0) {
            setErrorMessages(newErrors);
            return;
        }

        setErrorMessages({}); // Clear errors if no validation errors

        post(route("admin.user.store"));
    };

    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        // Hanya membersihkan errorMessages jika form berhasil disubmit dan tidak ada error
        setErrorMessages(errors);
    }, [errors]);

    return (
        <AdminLayout title="MANAJEMEN USER">
            <div className={styles["form-wrapper"]}>
                <h1 className={styles["title-form"] + " my-3"}>
                    Form Tambah User
                </h1>
                <form
                    onSubmit={handleSubmit}
                    method="post"
                    id="form"
                    className={styles["form"]}
                >
                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="nama">
                                Nama
                            </label>
                            <input
                                type="text"
                                name="nama"
                                id="nama"
                                placeholder="John Doe"
                                autoComplete="off"
                                required
                                className={styles["input"]}
                                onChange={handleChange}
                                value={data.nama}
                            />
                            {errorMessages.nama && (
                                <p className={styles.error}>
                                    {errorMessages.nama}
                                </p>
                            )}
                        </Col>

                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="username"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                placeholder="johndoe"
                                autoComplete="off"
                                required
                                className={styles["input"]}
                                onChange={handleChange}
                                value={data.username}
                            />
                            {errorMessages.username && (
                                <p className={styles.error}>
                                    {errorMessages.username}
                                </p>
                            )}
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="johndoe@gmail.com"
                                autoComplete="off"
                                required
                                className={styles["input"]}
                                onChange={handleChange}
                                value={data.email}
                            />
                            {errorMessages.email && (
                                <p className={styles.error}>
                                    {errorMessages.email}
                                </p>
                            )}
                        </Col>

                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="tanggal_lahir"
                            >
                                Tanggal Lahir
                            </label>
                            <input
                                type="date"
                                name="tanggal_lahir"
                                id="tanggal_lahir"
                                className={styles["input"]}
                                onChange={handleChange}
                                value={data.tanggal_lahir}
                            />
                            {errorMessages.tanggal_lahir && (
                                <p className={styles.error}>
                                    {errorMessages.tanggal_lahir}
                                </p>
                            )}
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
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
                                placeholder="08131259455"
                                autoComplete="off"
                                required
                                className={styles["input"]}
                                onChange={handleChange}
                                value={data.no_telepon}
                            />
                            {errorMessages.no_telepon && (
                                <p className={styles.error}>
                                    {errorMessages.no_telepon}
                                </p>
                            )}
                        </Col>

                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="jenis_kelamin"
                            >
                                Jenis Kelamin
                            </label>
                            <select
                                name="jenis_kelamin"
                                id="jenis_kelamin"
                                className={styles["select"]}
                                onChange={handleChange}
                                value={data.jenis_kelamin}
                            >
                                <option value="Pilih Jenis Kelamin" disabled>
                                    Pilih Jenis Kelamin
                                </option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                            {errorMessages.jenis_kelamin && (
                                <p className={styles.error}>
                                    {errorMessages.jenis_kelamin}
                                </p>
                            )}
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="password"
                            >
                                Password
                            </label>
                            <div className={styles["input-with-icon"]}>
                                <input
                                    type={passwordType}
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    required
                                    className={styles["input"]}
                                    placeholder="********"
                                    onChange={handleChange}
                                    value={data.password}
                                />
                                <span onClick={togglePasswordVisibility}>
                                    {passwordType === "password"
                                        ? "Show"
                                        : "Hide"}
                                </span>
                            </div>
                            {errorMessages.password && (
                                <p className={styles.error}>
                                    {errorMessages.password}
                                </p>
                            )}
                        </Col>

                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="password_confirmation"
                            >
                                Konfirmasi Password
                            </label>
                            <div className={styles["input-with-icon"]}>
                                <input
                                    type={confirmPasswordType}
                                    name="password_confirmation"
                                    id="password_confirmation"
                                    autoComplete="off"
                                    required
                                    className={styles["input"]}
                                    placeholder="********"
                                    onChange={handleChange}
                                    value={data.password_confirmation}
                                />
                                <span onClick={toggleConfirmPasswordVisibility}>
                                    {confirmPasswordType === "password"
                                        ? "Show"
                                        : "Hide"}
                                </span>
                            </div>
                            {errorMessages.password_confirmation && (
                                <p className={styles.error}>
                                    {errorMessages.password_confirmation}
                                </p>
                            )}
                        </Col>
                    </Row>

                    <Row className="justify-content-md-center mb-2">
                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="role">
                                Role User
                            </label>
                            <select
                                name="role"
                                id="role"
                                className={styles["select"]}
                                onChange={handleChange}
                                value={data.role}
                            >
                                <option value="Pilih Role" disabled>
                                    Pilih Role
                                </option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            {errorMessages.role && (
                                <p className={styles.error}>
                                    {errorMessages.role}
                                </p>
                            )}
                        </Col>

                        <Col md={6}>
                            <Row>
                                <Col md={8}>
                                    <label
                                        className={styles["label"]}
                                        htmlFor="foto"
                                    >
                                        Foto Profil
                                    </label>
                                    <input
                                        type="file"
                                        name="foto"
                                        id="foto"
                                        onChange={handleFotoChange}
                                        className={styles["input"]}
                                    />
                                </Col>
                                <Col md={4}>
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            id="img-preview"
                                            alt=""
                                            width="115px"
                                        />
                                    ) : (
                                        <img
                                            src="/images/preview.png"
                                            id="img-preview"
                                            alt=""
                                            width="115px"
                                        />
                                    )}
                                </Col>
                            </Row>
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
                                    href={route("admin.user.index")}
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
