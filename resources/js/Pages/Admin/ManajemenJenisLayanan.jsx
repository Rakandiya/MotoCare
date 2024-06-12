import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenJenisLayanan.module.css";
import { Row, Col, Modal, Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import ButtonAdmin from "@/Components/ButtonAdmin";
import "../../../css/Admin/AdminGlobal.css";
import { Head, useForm, router } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";
// import { route } from "ziggy-js";
import axios from "axios";

export default function ManajemenJenisLayanan({ jenisLayanans }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredJenisLayanans, setFilteredJenisLayanans] =
        useState(jenisLayanans);

    const [selectedJenisLayanan, setSelectedJenisLayanan] = useState(false);

    // const [formData, setFormData] = useState({
    //     id: "",
    //     judul: "",
    //     link: "",
    //     deskripsi: "",
    // });

    const {
        data,
        setData,
        put,
        post,
        delete: deleteRoute,
        processing,
        errors,
    } = useForm({
        id: "",
        jenis_layanan: "",
        harga: "",
    });
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (e, jenisLayanan) => {
        e.preventDefault();
        setShowDetail(true);
        setSelectedJenisLayanan(jenisLayanan);
        console.log(jenisLayanan);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (e, jenisLayanan) => {
        e.preventDefault();
        setShowDelete(true);
        setSelectedJenisLayanan(jenisLayanan);
    };

    const handleEditJenisLayanan = (jenisLayanan) => {
        setData({
            id: jenisLayanan.id,
            jenis_layanan: jenisLayanan.jenis_layanan,
            harga: jenisLayanan.harga,
        });
    };

    const columns = [
        {
            name: "Jenis Layanan",
            selector: (row) => row.jenis_layanan,
        },
        {
            name: "Harga",
            selector: (row) => row.harga,
        },
        {
            name: "Action",
            selector: (row) => (
                <>
                    <button
                        onClick={(e) => handleShowDetail(e, row)}
                        style={{ color: "#f16211" }}
                    >
                        <box-icon
                            name="info-circle"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </button>
                    <button
                        onClick={() => handleEditJenisLayanan(row)}
                        className="mx-2"
                    >
                        <box-icon
                            name="edit"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </button>
                    <button
                        onClick={(e) => handleShowDelete(e, row)}
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

    function handleInputChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    }

    const [errorMessages, setErrorMessages] = useState({});
    const [reload, setReload] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = data.id
            ? "admin.jenisLayanan.update"
            : "admin.jenisLayanan.store";

        const action = data.id ? put : post;
        action(route(routeName, data.id), {
            preserveScroll: true,
            data: data,
            onSuccess: () => {
                setReload(true); // Ubah state reload setelah sukses submit
            },
        });
    };

    const handleDelete = async () => {
        try {
            await axios.delete(
                route("admin.jenisLayanan.delete", {
                    jenisLayanan: selectedJenisLayanan.id,
                }),
                {
                    method: "DELETE",
                    data: {
                        _method: "DELETE",
                        _token: document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                    headers: {
                        "X-CSRF-TOKEN": document
                            .querySelector('meta[name="csrf-token"]')
                            .getAttribute("content"),
                    },
                }
            );

            setShowDelete(false); // Menutup modal setelah berhasil
            setReload(true); // Ubah state reload setelah sukses delete
            console.log("OK");

            setTimeout(() => {
                setReload(false);
                router.visit(route("admin.jenisLayanan.index"));
            }, 1000);
        } catch (error) {
            console.error("Error deleting Jenis layanan", error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);

        const filtered = jenisLayanans.filter((jenisLayanan) => {
            return (
                jenisLayanan.jenis_layanan
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                jenisLayanan.harga
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
        });

        console.log(filtered);

        setFilteredJenisLayanans(filtered);
    };

    useEffect(() => {
        setFilteredJenisLayanans(jenisLayanans);
    }, [jenisLayanans]);

    useEffect(() => {
        // Hanya membersihkan errorMessages jika form berhasil disubmit dan tidak ada error
        console.log(errors);
        setErrorMessages(errors);
    }, [errors]);

    useEffect(() => {
        if (reload) {
            // Fungsi untuk memuat ulang data atau komponen
            setFilteredJenisLayanans(jenisLayanans); // Misalnya fungsi untuk memuat ulang data tutorial
            setData({
                id: "",
                jenis_layanan: "",
                harga: "",
                deskripsi: "",
            });
            setReload(false); // Setelah memuat ulang, kembalikan state reload ke false
        }
    }, [reload, jenisLayanans]);

    return (
        <AdminLayout title="Manajemen Jenis Layanan">
            <Row>
                <Col md={6} style={{ borderRight: "2px solid #f16211" }}>
                    <h1 className={styles["title-table"]}>
                        Daftar Jenis Layanan
                    </h1>

                    <form
                        id="form-search"
                        className={
                            styles["form-search"] +
                            " d-flex justify-content-md-start"
                        }
                        style={{ width: "60%" }}
                    >
                        <span className={styles["icon-search"]}>
                            <box-icon name="search" color="#f16211"></box-icon>
                        </span>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Cari Jenis Layanan"
                            autoComplete="off"
                            className={styles["search"]}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </form>
                    <DataTable
                        columns={columns}
                        data={filteredJenisLayanans}
                        pagination
                        responsive
                        striped
                        className="table-striped"
                    />
                </Col>
                <Col md={6}>
                    <div className="form-merk-motor">
                        <h1 className={styles["title-form"]}>
                            Form Jenis Layanan
                        </h1>
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
                            value={data.id}
                        />
                        <Row className="mb-3">
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="text"
                                    name="jenis_layanan"
                                    id="jenis_layanan"
                                    placeholder="Jenis Layanan"
                                    autoComplete="off"
                                    required
                                    value={data.jenis_layanan}
                                    onChange={handleInputChange}
                                    className={styles["jenis-layanan"]}
                                />
                                {errorMessages.jenis_layanan && (
                                    <small className="text-danger">
                                        {errorMessages.jenis_layanan}
                                    </small>
                                )}
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="text"
                                    name="link"
                                    id="harga"
                                    placeholder="Harga"
                                    autoComplete="off"
                                    required
                                    value={data.harga}
                                    onChange={handleInputChange}
                                    className={styles["harga"]}
                                />
                                {errorMessages.harga && (
                                    <small className="text-danger">
                                        {errorMessages.harga}
                                    </small>
                                )}
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 8, offset: 4 }}>
                                <ButtonAdmin
                                    disabled={processing}
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
                    <Modal.Title>
                        Detail Jenis Layanan{" "}
                        <span className="title">
                            {selectedJenisLayanan &&
                                selectedJenisLayanan.jenis_layanan}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table borderless className={styles["table"]}>
                        <tbody>
                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Jenis Layanan</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedJenisLayanan &&
                                        selectedJenisLayanan.jenis_layanan}
                                </td>
                            </tr>

                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Harga</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedJenisLayanan &&
                                        selectedJenisLayanan.harga}
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
                    <Modal.Title>Hapus Jenis Layanan</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus Jenis Layanan:{" "}
                        <b>
                            {selectedJenisLayanan &&
                                selectedJenisLayanan.jenis_layanan}
                        </b>
                        ?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        Close
                    </Button>
                    <form onSubmit={handleDelete} method="post">
                        <ButtonAdmin
                            type="submit"
                            variant="primary"
                            onClick={handleCloseDelete}
                            style={{
                                backgroundColor: "#f16211",
                                borderColor: "#f16211",
                            }}
                        >
                            Ya, Hapus
                        </ButtonAdmin>
                    </form>
                </Modal.Footer>
            </Modal>
        </AdminLayout>
    );
}
