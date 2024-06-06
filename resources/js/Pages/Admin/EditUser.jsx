import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col } from "react-bootstrap";
import styles from "../../../css/Admin/EditUser.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link, usePage } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function EditUser({ userId }) {
    const { props } = usePage();
    const user = props.user;

    const [userData, setUserData] = useState({
        id: user?.id || '',
        name: user?.name || '',
        username: user?.username || '',
        email: user?.email || '',
        tanggal_lahir: user?.tanggal_lahir || '',
        no_telepon: user?.no_telepon || '',
        jenis_kelamin: user?.jenis_kelamin || '',
        role: user?.role || '',
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    useEffect(() => {
        if (user) {
            setUserData({
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                tanggal_lahir: user.tanggal_lahir,
                no_telepon: user.no_telepon,
                jenis_kelamin: user.jenis_kelamin,
                role: user.role,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
            setUserData({ ...userData, foto: file });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Buat objek data yang akan dikirim
        const dataToSend = {
            id: userData.id,
            nama: userData.name,
            username: userData.username,
            email: userData.email,
            tanggal_lahir: userData.tanggal_lahir,
            no_telepon: userData.no_telepon,
            jenis_kelamin: userData.jenis_kelamin,
            role: userData.role,
            // Jika ada foto yang di-upload, sertakan juga dalam formData
            foto: userData.foto
        };
    
        fetch(route('admin.user.update', userData.id), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
            body: JSON.stringify(dataToSend)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(JSON.stringify(errorData));
                });
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert('User berhasil diperbarui!');
            window.location.href = route('admin.user.index');
        })
        .catch((error) => {
            console.error('Error:', error.message);
            alert('Terjadi kesalahan: ' + error.message);
        });
    };
    

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordType(confirmPasswordType === "password" ? "text" : "password");
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
                                name="name"
                                id="name"
                                value={userData.name}
                                onChange={handleChange}
                                autoComplete="off"
                                required
                                className={styles["input"]}
                            />
                        </Col>
                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="username">
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
                            <label className={styles["label"]} htmlFor="tanggal_lahir">
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
                            <label className={styles["label"]} htmlFor="no_telepon">
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
                            <label className={styles["label"]} htmlFor="jenis_kelamin">
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
                            <label className={styles["label"]} htmlFor="password">
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
                                    {passwordType === "password" ? "Show" : "Hide"}
                                </span>
                            </div>
                        </Col>

                        <Col md={6}>
                            <label className={styles["label"]} htmlFor="konfirmasi_password">
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
                                    {confirmPasswordType === "password" ? "Show" : "Hide"}
                                </span>
                            </div>
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
                                    <label className={styles["label"]} htmlFor="foto">
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
                                    background: "linear-gradient(90deg, #f16211 -14.33%, #e59a6f 85.67%)",
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
