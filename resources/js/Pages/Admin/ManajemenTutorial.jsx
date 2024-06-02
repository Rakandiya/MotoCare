import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenTutorial.module.css";
import { Row, Col, Modal, Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { Link } from "@inertiajs/react";
import { useState } from "react";
import ButtonAdmin from "@/Components/ButtonAdmin";
import "../../../css/Admin/AdminGlobal.css";
import { Head, useForm, router } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";

export default function ManajemenTutorial({ tutorials }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedTutorial, setSelectedTutorial] = useState(false);

    const [formData, setFormData] = useState({
        id: "",
        judul: "",
        link: "",
        deskripsi: "",
    });

    // const { data, setData, put, post, processing, errors } = useForm({
    //     id: "",
    //     judul: "",
    //     link: "",
    //     deskripsi: "",
    // });
    const [tutorialList, setTutorialList] = useState(tutorials);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (tutorial) => {
        setShowDetail(true);
        setSelectedTutorial(tutorial);
        console.log(tutorial);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (tutorial) => {
        setShowDelete(true);
        setSelectedTutorial(tutorial);
    };
    const columns = [
        {
            name: "Judul",
            selector: (row) => row.judul,
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
                        onClick={() => handleEditTutorial(row)}
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

    const handleEditTutorial = (tutorial) => {
        setFormData({
            id: tutorial.id,
            judul: tutorial.judul,
            link: tutorial.link,
            deskripsi: tutorial.deskripsi,
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
            router.visit(route("admin.tutorial.update", formData.id), {
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
            router.visit(route("admin.tutorial.store"), {
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
        <AdminLayout title="Manajemen Tutorial">
            <Row>
                <Col md={6} style={{ borderRight: "2px solid #f16211" }}>
                    <h1 className={styles["title-table"]}>Daftar Tutorial</h1>

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
                            placeholder="Cari Tutorial"
                            autoComplete="off"
                            className={styles["search"]}
                        />
                    </form>
                    <DataTable
                        columns={columns}
                        data={tutorialList}
                        pagination
                        responsive
                        striped
                        className="table-striped"
                    />
                </Col>
                <Col md={6}>
                    <div className="form-merk-motor">
                        <h1 className={styles["title-form"]}>Form Tutorial</h1>
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
                                    name="judul"
                                    id="judul"
                                    placeholder="Judul Video"
                                    autoComplete="off"
                                    required
                                    value={formData.judul}
                                    onChange={handleInputChange}
                                    className={styles["judul"]}
                                />
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={{ span: 9, offset: 1 }}>
                                <input
                                    type="text"
                                    name="link"
                                    id="link"
                                    placeholder="Link Video"
                                    autoComplete="off"
                                    required
                                    value={formData.link}
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
                                    placeholder="Deskripsi Video"
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
                    <Modal.Title>Detail Tutorial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>
                        Detail Data Tutorial{" "}
                        <span className="title">
                            {selectedTutorial && selectedTutorial.judul}
                        </span>
                    </h4>
                    <Table borderless className={styles["table"]}>
                        <tbody>
                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Judul Video</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedTutorial && selectedTutorial.judul}
                                </td>
                            </tr>

                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Deskripsi</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedTutorial &&
                                        selectedTutorial.deskripsi}
                                </td>
                            </tr>
                            <tr className={styles["tr"]}>
                                <th className={styles["th"]}>Video</th>
                                <td className={styles["td"]}>:</td>
                                <td>
                                    {selectedTutorial &&
                                    selectedTutorial.link ? (
                                        <iframe
                                            src={
                                                selectedTutorial &&
                                                selectedTutorial.link
                                            }
                                            frameBorder="0"
                                            title="Youtube Video Player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        "Video tidak tersedia"
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
                    <Modal.Title>Hapus Tutorial</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus Tutorial:{" "}
                        <b>{selectedTutorial && selectedTutorial.judul}</b>?
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
