import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col } from "react-bootstrap";
import styles from "../../../css/Admin/EditUser.module.css";
// import previewImage from "../../assets/images/preview.png";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function EditUser() {
    // State untuk menyimpan data pengguna yang akan diedit
    const [userData, setUserData] = useState({
        id: 1, // Ganti dengan id pengguna yang sesuai
        nama: "John Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        tanggal_lahir: "1990-01-01",
        no_telepon: "08123456789",
        jenis_kelamin: "Laki-laki",
        role: "User",
    });

    const [previewImage, setPreviewImage] = useState(null);

    // Fungsi untuk mengubah data pengguna
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    // Fungsi untuk mengirimkan data pengguna yang diubah
    const handleSubmit = (e) => {
        e.preventDefault();
        // Kode untuk mengirimkan data pengguna yang diubah
    };

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
                    {/* Isi formulir dengan data pengguna */}
                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="nama">
                                Nama
                            </label>
                            <input
                                type="text"
                                name="nama"
                                id="nama"
                                value={userData.nama}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
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
                                value={userData.username}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
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
                                value={userData.email}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
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
                                value={userData.tanggal_lahir}
                                onChange={handleChange}
                                className={styles["input"]}
                            />
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
                                value={userData.no_telepon}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
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
                                value={userData.jenis_kelamin}
                                onChange={handleChange}
                                className={styles["select"]}
                            >
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </select>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mb-3">
                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="password"
                            >
                                password <small>(opsional)</small>
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
                        </Col>

                        <Col md={6}>
                            <label
                                className={styles["label"]}
                                htmlFor="konfirmasi_password"
                            >
                                Konfirmasi Password
                            </label>
                            <input
                                type="password"
                                name="konfirmasi_password"
                                id="konfirmasi_password"
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
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
                                value={userData.role}
                                onChange={handleChange}
                                className={styles["select"]}
                            >
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
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
                    {/* Tombol untuk kembali ke halaman manajemen pengguna */}
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
                        {/* Tombol untuk menyimpan perubahan */}
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
