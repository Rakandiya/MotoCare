import { usePage } from "@inertiajs/react";
import { Row, Col, Table } from "react-bootstrap";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/DetailUser.module.css";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function DetailUser({ auth, user }) {
    console.log(user);
    // const { id } = useParams();
    return (
        <AdminLayout title="MANAJEMEN USER">
            <h1 className={styles["title-page"]}>Detail User {user.name}</h1>
            <Table className={styles["table-detail"]}>
                <tr className={styles["table-detail-tr"]}>
                    <th className={styles["table-detail-th"]}>Nama</th>
                    <td>:</td>
                    <td>{user.name}</td>
                </tr>
                <tr className={styles["table-detail-tr"]}>
                    <th className={styles["table-detail-th"]}>Username</th>
                    <td>:</td>
                    <td>{user.username}</td>
                </tr>
                <tr className={styles["table-detail-tr"]}>
                    <th className={styles["table-detail-th"]}>Email</th>
                    <td>:</td>
                    <td>{user.email}</td>
                </tr>
                <tr className={styles["table-detail-tr"]}>
                    <th className={styles["table-detail-th"]}>Tanggal Lahir</th>
                    <td>:</td>
                    <td>{user.tanggal_lahir}</td>
                </tr>
                <tr className={styles["table-detail-tr"]}>
                    <th className={styles["table-detail-th"]}>No Telepon</th>
                    <td>:</td>
                    <td>{user.no_telepon}</td>
                </tr>
                <tr className={styles["table-detail-tr"]}>
                    <th className={styles["table-detail-th"]}>Jenis Kelamin</th>
                    <td>:</td>
                    <td>{user.jenis_kelamin}</td>
                </tr>
                <tr className={styles["table-detail-tr"]}>
                    <th className={styles["table-detail-th"]}>Role</th>
                    <td>:</td>
                    <td>{user.role}</td>
                </tr>
                <tr className={styles["table-detail-tr"]}>
                    <th className={styles["table-detail-th"]}>Foto Profil</th>
                    <td>:</td>
                    <td>
                        <img
                            src={user.foto || "/images/avatar.png"}
                            alt="Foto Profil"
                            className={styles["avatar"]}
                        />
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
                            href={route("admin.user.index")}
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
                            href={route("admin.user.edit", [user.id])}
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
                                EDIT PENGGUNA
                            </span>
                        </Link>
                    </ButtonAdmin>
                </Col>
            </Row>
        </AdminLayout>
    );
}
