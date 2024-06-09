import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col } from "react-bootstrap";
import styles from "../../../css/Admin/EditUser.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link, usePage, useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function EditUser({ user }) {
    const errMessage = usePage().props.errors;
    const { props } = usePage();
    // const user = props.user;

    const { data, setData, post, errors } = useForm({
        id: user?.id || "",
        nama: user?.nama || "",
        username: user?.username || "",
        email: user?.email || "",
        tanggal_lahir: user?.tanggal_lahir || "",
        no_telepon: user?.no_telepon || "",
        jenis_kelamin: user?.jenis_kelamin || "",
        role: user?.role || "",
        foto: user?.foto || "",
    });

    useEffect(() => {
        if (errMessage) {
            setErrorMessages(errMessage);
        }
    }, [errMessage]);

    const [previewImage, setPreviewImage] = useState(null);
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    useEffect(() => {
        if (user) {
            setData({
                id: user?.id || "",
                nama: user?.nama || "",
                username: user?.username || "",
                email: user?.email || "",
                tanggal_lahir: user?.tanggal_lahir || "",
                no_telepon: user?.no_telepon || "",
                jenis_kelamin: user?.jenis_kelamin || "",
                role: user?.role || "",
                foto: user?.foto || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });

        if (name === "jenis_kelamin") {
            setData({ ...data, jenis_kelamin: value });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setData({ ...data, foto: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Buat objek data yang akan dikirim
        const dataToSend = {
            id: data.id,
            nama: data.nama,
            username: data.username,
            email: data.email,
            tanggal_lahir: data.tanggal_lahir,
            no_telepon: data.no_telepon,
            jenis_kelamin: data.jenis_kelamin,
            role: data.role,
            // Jika ada foto yang di-upload, sertakan juga dalam formData
            foto: data.foto,
        };

        router.post(route("admin.user.update", { user: user.id }), {
            method: "put",
            _method: "PUT",
            data: dataToSend,
            preserveScroll: true,
            onSuccess: () => {
                console.log("User updated successfully");
            },
            onError: (err) => {
                console.log(err);
                console.log(errors);
            },
        });

        setErrorMessages({}); // Clear errors if no validation errors
    };
    const [errorMessages, setErrorMessages] = useState({});

    useEffect(() => {
        // Hanya membersihkan errorMessages jika form berhasil disubmit dan tidak ada error
        setErrorMessages(errors);
    }, [errors]);

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordType(
            confirmPasswordType === "password" ? "text" : "password"
        );
    };

    return (
        <AdminLayout title="MANAJEMEN USER">
            <div className={styles["form-wrapper"]}>
                <h1 className={styles["title-form"] + " my-3"}>
                    Form Edit User
                </h1>
                <form
                    onSubmit={handleSubmit}
                    id="form"
                    className={styles["form"]}
                >
                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="name">
                                Nama
                            </label>
                            <input
                                type="text"
                                name="nama"
                                id="nama"
                                value={data.nama}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
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
                                value={data.username}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
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
                                type="text"
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
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
                                value={data.tanggal_lahir}
                                onChange={handleChange}
                                className={styles["input"]}
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
                                value={data.no_telepon}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
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
                                value={data.jenis_kelamin}
                                onChange={handleChange}
                                className={styles["select"]}
                            >
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
                                Password <small>(opsional)</small>
                            </label>
                            <div className={styles["input-with-icon"]}>
                                <input
                                    type={passwordType}
                                    name="password"
                                    id="password"
                                    autoComplete="off"
                                    className={styles["input"]}
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
                                htmlFor="konfirmasi_password"
                            >
                                Konfirmasi Password
                            </label>
                            <div className={styles["input-with-icon"]}>
                                <input
                                    type={confirmPasswordType}
                                    name="konfirmasi_password"
                                    id="konfirmasi_password"
                                    autoComplete="off"
                                    className={styles["input"]}
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
                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="role">
                                Role User
                            </label>
                            <select
                                name="role"
                                id="role"
                                value={data.role}
                                onChange={handleChange}
                                className={styles["select"]}
                            >
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
                                            width="100px"
                                        />
                                    ) : (
                                        <img
                                            src="/images/avatar.png"
                                            id="img-preview"
                                            alt=""
                                            width="100px"
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
