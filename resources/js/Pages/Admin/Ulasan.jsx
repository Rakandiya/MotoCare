import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { Modal, Button, Table } from "react-bootstrap";
import styles from "../../../css/Admin/Ulasan.module.css";
import moment from "moment";

export default function Ulasan({ ulasans }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUlasan, setSelectedUlasan] = useState(false);
    const [data, setData] = useState(ulasans);

    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (e, ulasan) => {
        e.preventDefault();
        setShowDetail(true);
        setSelectedUlasan(ulasan);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (ulasan) => {
        setShowDelete(true);
        setSelectedUlasan(ulasan);
    };

    const renderRating = (rating, large = false) => {
        let stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(
                <box-icon
                    key={i}
                    type="solid"
                    name="star"
                    color="#f16211"
                    size={large ? "lg" : "sm"}
                ></box-icon>
            );
        }
        return stars;
    };

    const columns = [
        {
            name: "Nama",
            selector: (row) => row.user.username,
        },
        {
            name: "Jenis Layanan",
            selector: (row) => row.jenis_layanan,
        },
        {
            name: "Rating",
            selector: (row) => row.rating,
            cell: (row) => <div>{renderRating(row.rating)}</div>,
        },
        {
            name: "tanggal",
            selector: (row) =>
                moment(row.created_at).format("DD-MM-YYYY HH:mm:ss"),
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <Link href="#" onClick={(e) => handleShowDetail(e, row)}>
                        <box-icon
                            name="info-circle"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        href="#"
                        onClick={() => handleShowDelete(row)}
                        style={{ color: "#f16211" }}
                    >
                        <box-icon
                            name="trash"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                </>
            ),
        },
    ];

    return (
        <AdminLayout title="Ulasan Pengguna">
            <div className="table-wrapper">
                <div className="sub-wrapper">
                    <form
                        action="#"
                        id="form-search"
                        className={styles["form-search"]}
                    >
                        <span className={styles["icon-search"]}>
                            <box-icon name="search" color="#f16211"></box-icon>
                        </span>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Cari Ulasan"
                            autoComplete="off"
                            className={styles["search"]}
                        />
                    </form>
                </div>
                <DataTable columns={columns} data={data} pagination />
            </div>

            {/* Detail Ulasan */}
            <Modal size="lg" show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Ulasan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table className={styles["table"]}>
                        <tr className={styles["tr"]}>
                            <th className={styles["th"]}>Nama</th>
                            <td>:</td>
                            <td>
                                {selectedUlasan && selectedUlasan.user.username}
                            </td>
                        </tr>
                        <tr className={styles["tr"]}>
                            <th className={styles["th"]}>Jenis Layanan</th>
                            <td className={styles["td"]}>:</td>
                            <td>
                                {selectedUlasan && selectedUlasan.jenis_layanan}
                            </td>
                        </tr>
                        <tr className={styles["tr"]}>
                            <th className={styles["th"]}>Rating</th>
                            <td className={styles["td"]}>:</td>
                            <td>
                                {selectedUlasan &&
                                    renderRating(selectedUlasan.rating, true)}
                            </td>
                        </tr>
                        <tr className={styles["tr"]}>
                            <th className={styles["th"]}>Tanggal</th>
                            <td className={styles["td"]}>:</td>
                            <td>
                                {selectedUlasan &&
                                    moment(selectedUlasan.created_at).format(
                                        "DD-MM-YYYY HH:mm:ss"
                                    )}
                            </td>
                        </tr>
                        <tr className={styles["tr"]}>
                            <th className={styles["th"]}>Review</th>
                            <td className={styles["td"]}>:</td>
                            <td>{selectedUlasan && selectedUlasan.review}</td>
                        </tr>
                        <tr className={styles["tr"]}>
                            <th className={styles["th"]}>Foto</th>
                            <td className={styles["td"]}>:</td>
                            <td>
                                {selectedUlasan &&
                                    selectedUlasan.foto_ulasans.map((foto) => (
                                        <img
                                            key={foto}
                                            src={"/storage/" + foto.foto}
                                            alt={foto}
                                            className={styles["img"]}
                                            width={150}
                                            style={{ display: "inline" }}
                                        />
                                    ))}
                            </td>
                        </tr>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Tutup
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Delete Ulasan */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Ulasan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus ulasan:{" "}
                        <b>{selectedUlasan && selectedUlasan.nama}</b>?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Tutup
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleCloseDelete}
                        style={{
                            backgroundColor: "#f16211",
                            borderColor: "#f16211",
                        }}
                    >
                        Ya, Hapus
                    </Button>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
}
