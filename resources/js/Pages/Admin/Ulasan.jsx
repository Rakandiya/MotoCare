import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { Modal, Button, Table } from "react-bootstrap";
import styles from "../../../css/Admin/Ulasan.module.css";

export default function Ulasan() {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedUlasan, setSelectedUlasan] = useState(false);

    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (katalog) => {
        setShowDetail(true);
        setSelectedUlasan(katalog);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (katalog) => {
        setShowDelete(true);
        setSelectedUlasan(katalog);
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
            selector: (row) => row.nama,
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
            selector: (row) => row.tanggal,
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <Link href="#" onClick={() => handleShowDetail(row)}>
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

    const data = [
        {
            id: 1,
            jenis_layanan: "Pelayanan Motor",
            rating: 5,
            nama: "Olivia Hall",
            tanggal: "12 Januari 2022",
            reviewDesc: "Pelayanan motor yang sangat bagus",
            foto: [
                "/images/aerox.png",
                "/images/beat.jpeg",
                "/images/aerox.png",
            ],
        },

        {
            id: 2,
            jenis_layanan: "Service Motor",
            rating: 4,
            nama: "James Taylor",
            tanggal: "15 Februari 2022",
            reviewDesc: "Hasil service motor sangat bagus",
            foto: ["/images/beat.jpeg"],
        },

        {
            id: 3,
            jenis_layanan: "Ganti Oli Mesin",
            rating: 3,
            nama: "John Doe",
            tanggal: "18 Maret 2022",
            reviewDesc: "Ganti oli mesin sangat cepat",
            foto: ["beat.jpeg"],
        },

        {
            id: 4,
            jenis_layanan: "Penggantian Ban",
            rating: 5,
            nama: "Jane Doe",
            tanggal: "21 April 2022",
            reviewDesc: "Penggantian ban sangat cepat dan bagus",
            foto: ["cbr.png"],
        },

        {
            id: 5,
            jenis_layanan: "Penggantian Lampu Depan dan Belakang",
            rating: 4,
            nama: "Smith Doe",
            tanggal: "24 Mei 2022",
            reviewDesc:
                "Penggantian lampu depan dan belakang sangat cepat dan bagus",
            foto: ["nmax.png"],
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
                            <td>{selectedUlasan && selectedUlasan.nama}</td>
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
                            <td>{selectedUlasan && selectedUlasan.tanggal}</td>
                        </tr>
                        <tr className={styles["tr"]}>
                            <th className={styles["th"]}>Review</th>
                            <td className={styles["td"]}>:</td>
                            <td>
                                {selectedUlasan && selectedUlasan.reviewDesc}
                            </td>
                        </tr>
                        <tr className={styles["tr"]}>
                            <th className={styles["th"]}>Foto</th>
                            <td className={styles["td"]}>:</td>
                            <td>
                                {selectedUlasan &&
                                    selectedUlasan.foto.map((foto) => (
                                        <img
                                            key={foto}
                                            src={foto}
                                            alt={foto}
                                            className={styles["img"]}
                                            width={150}
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
