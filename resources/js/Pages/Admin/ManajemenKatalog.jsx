import React, { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenKatalog.module.css";
import { Row, Col, Modal, Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Head, useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ManajemenKatalog({ katalogs }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedKatalog, setSelectedKatalog] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [isNewImage, setisNewImage] = useState(false);
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
        gambar: "",
        merk: "",
        model: "",
        deskripsi: "",
    });
    const [katalogList, setKatalog] = useState(katalogs);

    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (e, katalog) => {
        e.preventDefault();
        setShowDetail(true);
        setSelectedKatalog(katalog);
    };

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (e, katalog) => {
        e.preventDefault();
        setShowDelete(true);
        setSelectedKatalog(katalog);
    };

    const columns = [
        {
            name: "Merk Motor",
            selector: (row) => row.merk + " " + row.model,
        },
        {
            name: "Action",
            selector: (row) => (
                <>
                    <Link
                        href="#"
                        onClick={(e) => handleShowDetail(e, row)}
                        style={{ color: "#f16211" }}
                    >
                        <box-icon
                            name="info-circle"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        href="#"
                        onClick={(e) => handleEditKatalog(e, row)}
                        className="mx-2"
                    >
                        <box-icon
                            name="edit"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
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

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setData((prevData) => ({
                ...prevData,
                gambar: file,
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setisNewImage(true);
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditKatalog = (e, katalog) => {
        e.preventDefault();
        setData({
            id: katalog.id,
            merk: katalog.merk,
            model: katalog.model,
            deskripsi: katalog.deskripsi,
            gambar: "",
        });
        setPreviewImage(katalog.gambar);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const [errorMessages, setErrorMessages] = useState({});
    const [reload, setReload] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const routeName = data.id
            ? "admin.katalog.update"
            : "admin.katalog.store";
        // Create a FormData object

        if (data.id) {
            router.visit(route("admin.katalog.update", { katalog: data.id }), {
                data: data,
                method: "PUT",
                preserveScroll: true,
                headers: {
                    "X-HTTP-Method-Override": "PATCH",
                    "X-CSRF-TOKEN": document
                        .querySelector('meta[name="csrf-token"]')
                        .getAttribute("content"),
                    "Content-Type": "multipart/form-data",
                    "Content-Type": "application/json",
                },
                onSuccess: () => {
                    setReload(!reload); // Toggle state to trigger reload
                    console.log(data);
                },
                onError: () => {
                    console.log(errors);
                    console.log(data);
                },
            });
        } else {
            post(route(routeName), {
                data: formData,
                preserveScroll: true,
                onSuccess: () => {
                    setReload(!reload); // Toggle state to trigger reload
                    console.log(data);
                },
                onError: () => {
                    console.log(errors);
                    console.log(data);
                },
            });
        }

        console.log(data);
    };

    const handleDelete = () => {
        deleteRoute(
            route("admin.katalog.delete", { katalog: selectedKatalog.id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDelete(false); // Menutup modal setelah berhasil
                    setReload(!reload); // Memicu reload data
                    console.log("OK");
                },
                onError: () => {
                    console.log(errorMessages);
                },
            }
        );
    };

    useEffect(() => {
        // Hanya membersihkan errorMessages jika form berhasil disubmit dan tidak ada error
        setErrorMessages(errors);
    }, [errors]);

    useEffect(() => {
        // Fungsi untuk memuat ulang data atau komponen
        setKatalog(katalogs); // Misalnya fungsi untuk memuat ulang data tutorial
        setData({
            id: "",
            gambar: "",
            merk: "",
            model: "",
            deskripsi: "",
        });
        setisNewImage(false);
        setPreviewImage(null);
    }, [reload, katalogList]);

    return (
        <AdminLayout title="Manajemen Katalog">
            <Row>
                <Col md={6} style={{ borderRight: "2px solid #f16211" }}>
                    <h1 className={styles["title-table"]}>Daftar Katalog</h1>

                    <form
                        action="#"
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
                            placeholder="Cari Katalog"
                            autoComplete="off"
                            className={styles["search"]}
                        />
                    </form>
                    <DataTable
                        columns={columns}
                        data={katalogList}
                        pagination
                        responsive
                        striped
                        className="table-striped"
                    />
                </Col>
                <Col md={6}>
                    <div className="form-merk-motor">
                        <h1 className={styles["title-form"]}>Form Katalog</h1>
                    </div>
                    <form
                        action="#"
                        method="post"
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
                                    name="merk"
                                    id="merk"
                                    placeholder="Merk Motor"
                                    autoComplete="off"
                                    required
                                    value={data.merk}
                                    onChange={handleInputChange}
                                    className={styles["input-merk"]}
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="text"
                                    name="model"
                                    id="model"
                                    placeholder="Model Motor"
                                    autoComplete="off"
                                    required
                                    value={data.model}
                                    onChange={handleInputChange}
                                    className={styles["input-model"]}
                                />
                            </Col>
                        </Row>
                        <Row className="d-flex justify-content-center align-items-center my-3">
                            <Col md={6}>
                                <input
                                    type="file"
                                    name="gambar"
                                    id="gambar"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={handleFotoChange}
                                    className={
                                        styles["input-gambar"] + " gambar"
                                    }
                                />
                                <label
                                    htmlFor="gambar"
                                    className={styles["label-gambar"]}
                                >
                                    <div className={styles["label-gambar-div"]}>
                                        <box-icon
                                            name="plus"
                                            color="#f16211"
                                        ></box-icon>
                                    </div>
                                    Tambah Gambar
                                </label>
                            </Col>
                            <Col md={6}>
                                {previewImage ? (
                                    <img
                                        src={
                                            isNewImage
                                                ? previewImage
                                                : "/storage/" + previewImage
                                        }
                                        className={styles["img-preview"]}
                                        id="img-preview"
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        src="/images/preview.png"
                                        className={styles["img-preview"]}
                                        id="img-preview"
                                        alt=""
                                        width="100px"
                                    />
                                )}
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
                                    value={data.deskripsi}
                                    onChange={handleInputChange}
                                    className={styles["deskripsi"]}
                                >
                                    {data.deskripsi}
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
                    <Modal.Title>Detail Katalog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2>
                        Detail Data Katalog Motor{" "}
                        <span className="title">
                            {selectedKatalog && selectedKatalog.name}
                        </span>
                    </h2>
                    <Table borderless className={styles["table"]}>
                        <tbody>
                            <tr>
                                <th>Merk</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedKatalog && selectedKatalog.merk}
                                </td>
                            </tr>
                            <tr>
                                <th>Model</th>
                                <td className={styles["td"]}>:</td>
                                <td className="model">
                                    {selectedKatalog && selectedKatalog.model}
                                </td>
                            </tr>
                            <tr>
                                <th>Deskripsi</th>
                                <td className={styles["td"]}>:</td>
                                <td className="deskripsi">
                                    {selectedKatalog &&
                                        selectedKatalog.deskripsi}
                                </td>
                            </tr>
                            <tr>
                                <th>Gambar</th>
                                <td className={styles["td"]}>:</td>
                                <td className="gambar-modal">
                                    {selectedKatalog &&
                                    selectedKatalog.gambar ? (
                                        <img
                                            src={
                                                "/storage/" +
                                                selectedKatalog.gambar
                                            }
                                            alt="Image Preview Gambar Motor"
                                            className="img-preview-modal"
                                        />
                                    ) : (
                                        "Gambar tidak tersedia"
                                    )}
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
                    <Modal.Title>Hapus Katalog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus katalog:{" "}
                        <b>
                            {selectedKatalog &&
                                selectedKatalog.merk +
                                    " " +
                                    selectedKatalog.model}
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
