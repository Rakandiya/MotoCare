import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col } from "react-bootstrap";
import styles from "../../../css/Admin/TambahUser.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function TambahUser() {
    const [previewImage, setPreviewImage] = useState(null);
    const [formData, setFormData] = useState({
        nama: '',
        username: '',
        email: '',
        tanggal_lahir: '',
        no_telepon: '',
        jenis_kelamin: 'Pilih Jenis Kelamin',  // Set default sesuai ENUM
        password: '',
        password_confirmation: '',
        role: 'Pilih Role',
        foto: null
    });

    const [errors, setErrors] = useState({});
    const [passwordType, setPasswordType] = useState("password");
    const [confirmPasswordType, setConfirmPasswordType] = useState("password");

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        setFormData({ ...formData, foto: file });
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
        setFormData({ ...formData, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordType(confirmPasswordType === "password" ? "text" : "password");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        // Validasi
        const newErrors = {};
        if (!formData.nama) newErrors.nama = 'Nama tidak boleh kosong';
        if (!formData.username) newErrors.username = 'Username tidak boleh kosong';
        if (!formData.email) newErrors.email = 'Email tidak boleh kosong';
        if (!formData.tanggal_lahir) newErrors.tanggal_lahir = 'Tanggal lahir tidak boleh kosong';
        if (!formData.no_telepon) newErrors.no_telepon = 'No Telepon tidak boleh kosong';
        if (formData.jenis_kelamin === 'Pilih Jenis Kelamin') newErrors.jenis_kelamin = 'Jenis kelamin tidak boleh kosong';
        if (!formData.password) newErrors.password = 'Password tidak boleh kosong';
        if (!formData.password_confirmation) newErrors.password_confirmation = 'Konfirmasi password tidak boleh kosong';
        if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = 'Konfirmasi password tidak sesuai';
        if (formData.role === 'Pilih Role') newErrors.role = 'Role tidak boleh kosong';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});  // Clear errors if no validation errors
        
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
            formDataToSend.append(key, formData[key]);
        });

        fetch(route('admin.user.store'), {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'X-CSRF-TOKEN': csrfToken // Sertakan CSRF token di header
            },
            body: formDataToSend
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
            alert('Form telah berhasil di-submit!');
        })
        .catch((error) => {
            console.error('Error:', error.message);
            const parsedError = JSON.parse(error.message);
            if (parsedError.errors) {
                setErrors(parsedError.errors);
            }
            alert('Terjadi kesalahan: ' + parsedError.message);
        });
    };

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
                                value={formData.nama}
                            />
                            {errors.nama && <p className={styles.error}>{errors.nama}</p>}
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
                                value={formData.username}
                            />
                            {errors.username && <p className={styles.error}>{errors.username}</p>}
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
                                value={formData.email}
                            />
                            {errors.email && <p className={styles.error}>{errors.email}</p>}
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
                                value={formData.tanggal_lahir}
                            />
                            {errors.tanggal_lahir && <p className={styles.error}>{errors.tanggal_lahir}</p>}
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
                                value={formData.no_telepon}
                            />
                            {errors.no_telepon && <p className={styles.error}>{errors.no_telepon}</p>}
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
                                value={formData.jenis_kelamin}
                            >
                                <option value="Pilih Jenis Kelamin" disabled>Pilih Jenis Kelamin</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                            {errors.jenis_kelamin && <p className={styles.error}>{errors.jenis_kelamin}</p>}
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
                                    value={formData.password}
                                />
                                <span onClick={togglePasswordVisibility}>
                                    {passwordType === "password" ? "Show" : "Hide"}
                                </span>
                            </div>
                            {errors.password && <p className={styles.error}>{errors.password}</p>}
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
                                    value={formData.password_confirmation}
                                />
                                <span onClick={toggleConfirmPasswordVisibility}>
                                    {confirmPasswordType === "password" ? "Show" : "Hide"}
                                </span>
                            </div>
                            {errors.password_confirmation && <p className={styles.error}>{errors.password_confirmation}</p>}
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
                                value={formData.role}
                            >
                                <option value="Pilih Role" disabled>
                                    Pilih Role
                                </option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                            {errors.role && <p className={styles.error}>{errors.role}</p>}
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
