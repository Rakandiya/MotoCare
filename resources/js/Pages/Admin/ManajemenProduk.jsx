import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenProduk.module.css";
import { Row, Col, Modal, Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ButtonAdmin from "@/Components/ButtonAdmin";
import "../../../css/Admin/AdminGlobal.css";
import { Head, useForm, router } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";

export default function ManajemenProduk({ produks }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedProduk, setselectedProduk] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        nama_produk: "",
        harga: "",
        stok: "",
        deskripsi: "",
    });

    // const { data, setData, put, post, processing, errors } = useForm({
    //     id: "",
    //     judul: "",
    //     link: "",
    //     deskripsi: "",
    // });
    const [produkList, setProdukList] = useState([
        {
            nama_produk: "Oli 150ml",
            harga: 50000,
            stok: 50,
            deskripsi: "Oli 150ml sebanyak 50 buah dengan harga Rp. 50.000",
        },
    ]);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (produk) => {
        setShowDetail(true);
        setselectedProduk(produk);
        console.log(produk);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (produk) => {
        setShowDelete(true);
        setselectedProduk(produk);
    };
    const columns = [
        {
            name: "Nama Produk",
            selector: (row) => row.nama_produk,
        },
        {
            name: "Harga",
            selector: (row) => row.harga,
        },
        {
            name: "Stok",
            selector: (row) => row.stok,
        },
        {
            name: "Action",
            selector: (row) => (
                <>
                    <button
                        onClick={() => handleShowDetail(row)}
                        style={{ color: "#f16211" }}
                    >
                        <box-icon
                            name="info-circle"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </button>
                    <button
                        onClick={() => handleEditProduk(row)}
                        className="mx-2"
                    >
                        <box-icon
                            name="edit"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </button>
                    <button
                        onClick={() => handleShowDelete(row)}
                        style={{ color: "#f16211" }}
                    >
                        <box-icon
                            name="trash"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </button>
                </>
            ),
        },
    ];

    const handleEditProduk = (produk) => {
        setFormData({
            id: produk.id,
            nama_produk: produk.nama_produk,
            harga: produk.harga,
            stok: produk.stok,
            deskripsi: produk.deskripsi,
        });
    };

    function handleInputChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setFormData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.id) {
            router.visit(route("admin.produk.update", formData.id), {
                method: "PUT",
                preserveScroll: true,
                data: formData,
                headers: {
                    // "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "application/json",
                },
                onSuccess: () => {
                    console.log("Data berhasil diubah");
                },
                onError: (error) => {
                    console.log("Error:", error);
                },
            });
        } else {
            router.visit(route("admin.produk.store"), {
                method: "POST",
                preserveScroll: true,
                data: formData,
                headers: {
                    // "X-CSRF-TOKEN": csrfToken,
                    "Content-Type": "application/json",
                },
                onSuccess: () => {
                    console.log("Data berhasil disimpan");
                },
                onError: (error) => {
                    console.log("Error:", error);
                },
            });
        }
    };

    return (
        <AdminLayout title="Manajemen Produk">
            <Row>
                <Col
                    md={7}
                    style={{
                        borderRight: "2px solid #f16211",
                        paddingRight: 0,
                    }}
                >
                    <h1 className={styles["title-table"]}>Daftar Produk</h1>

                    <form
                        action="#"
                        id="form-search"
                        className={
                            styles["form-search"] +
                            " d-flex justify-content-md-start"
                        }
                        style={{ width: "50%" }}
                    >
                        <span className={styles["icon-search"]}>
                            <box-icon name="search" color="#f16211"></box-icon>
                        </span>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Cari Produk"
                            autoComplete="off"
                            className={styles["search"]}
                        />
                    </form>
                    <DataTable
                        columns={columns}
                        data={produkList}
                        pagination
                        responsive
                        striped
                        className="table-striped"
                    />
                </Col>
                <Col md={5}>
                    <div className="form-merk-motor">
                        <h1 className={styles["title-form"]}>Form Produk</h1>
                    </div>
                    <form
                        id="form"
                        onSubmit={handleSubmit}
                        className={styles["form"]}
                    >
                        <input
                            type="hidden"
                            name="id"
                            id="id"
                            value={formData.id}
                        />
                        <Row className="mb-3">
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="text"
                                    name="nama_produk"
                                    id="nama_produk"
                                    placeholder="Nama Produk"
                                    autoComplete="off"
                                    required
                                    value={formData.nama_produk}
                                    onChange={handleInputChange}
                                    className={styles["judul"]}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="number"
                                    name="harga"
                                    id="harga"
                                    placeholder="Harga"
                                    autoComplete="off"
                                    required
                                    value={formData.harga}
                                    onChange={handleInputChange}
                                    className={styles["link"]}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="number"
                                    name="stok"
                                    id="stok"
                                    placeholder="Stok"
                                    autoComplete="off"
                                    required
                                    value={formData.stok}
                                    onChange={handleInputChange}
                                    className={styles["link"]}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={{ span: 12 }}>
                                <textarea
                                    name="deskripsi"
                                    id="deskripsi"
                                    rows="6"
                                    placeholder="Deskripsi"
                                    autoComplete="off"
                                    required
                                    value={formData.deskripsi}
                                    onChange={handleInputChange}
                                    className={styles["deskripsi"]}
                                >
                                    {formData.deskripsi}
                                </textarea>
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 8, offset: 4 }}>
                                <ButtonAdmin
                                    type="submit"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, #f16211 -14.33%, #e59a6f 85.67%)",
                                        fontSize: "20px",
                                        fontStyle: "normal",
                                        fontWeight: "700",
                                        textAlign: "center",
                                    }}
                                >
                                    <box-icon
                                        name="save"
                                        type="solid"
                                        color="#fff"
                                    ></box-icon>{" "}
                                    <span className="ms-2">SUBMIT</span>
                                </ButtonAdmin>
                            </Col>
                        </Row>
                    </form>
                </Col>
            </Row>

            {/* Modal Show Detail */}
            <Modal size="lg" show={showDetail} onHide={handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title>Detail Produk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>
                        Detail Data Produk{" "}
                        <span className="title">
                            {selectedProduk && selectedProduk.nama_produk}
                        </span>
                    </h4>
                    <Table borderless className={styles["table"]}>
                        <tbody>
                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Nama Produk</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedProduk &&
                                        selectedProduk.nama_produk}
                                </td>
                            </tr>

                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Harga</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedProduk &&
                                        "Rp. " + selectedProduk.nama_produk}
                                </td>
                            </tr>

                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Stok</th>
                                <td className={styles["td"]}>:</td>
                                <td>{selectedProduk && selectedProduk.stok}</td>
                            </tr>

                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Deskripsi</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedProduk && selectedProduk.deskripsi}
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDetail}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal Show Delete */}
            <Modal show={showDelete} onHide={handleCloseDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Produk</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus Produk:{" "}
                        <b>{selectedProduk && selectedProduk.nama_produk}</b>?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <ButtonAdmin
                        variant="primary"
                        onClick={handleCloseDelete}
                        style={{
                            backgroundColor: "#f16211",
                            borderColor: "#f16211",
                        }}
                    >
                        Ya, Hapus
                    </ButtonAdmin>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
}
