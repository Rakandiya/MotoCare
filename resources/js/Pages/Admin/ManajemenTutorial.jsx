import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenTutorial.module.css";
import { Row, Col, Modal, Button, Table } from "react-bootstrap";
import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
import ButtonAdmin from "@/Components/ButtonAdmin";
import "../../../css/Admin/AdminGlobal.css";
import { Head, useForm, router } from "@inertiajs/react";
// import { Inertia } from "@inertiajs/inertia";
// import { route } from "ziggy-js";

export default function ManajemenTutorial({ tutorials }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredTutorials, setFilteredTutorials] = useState(tutorials);

    const [selectedTutorial, setSelectedTutorial] = useState(false);

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
        judul: "",
        link: "",
        deskripsi: "",
    });
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (e, tutorial) => {
        e.preventDefault();
        setShowDetail(true);
        setSelectedTutorial(tutorial);
        console.log(tutorial);
    };
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (e, tutorial) => {
        e.preventDefault();
        setShowDelete(true);
        setSelectedTutorial(tutorial);
    };

    const handleEditTutorial = (tutorial) => {
        setData({
            id: tutorial.id,
            judul: tutorial.judul,
            link: tutorial.link,
            deskripsi: tutorial.deskripsi,
        });
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
            ? "admin.tutorial.update"
            : "admin.tutorial.store";

        const action = data.id ? put : post;
        action(route(routeName, data.id), {
            preserveScroll: true,
            data: data,
            onSuccess: () => {
                setReload(true); // Ubah state reload setelah sukses submit
            },
        });
    };

    const handleDelete = () => {
        deleteRoute(
            route("admin.tutorial.delete", { tutorial: selectedTutorial.id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDelete(false); // Menutup modal setelah berhasil
                    setReload(true); // Ubah state reload setelah sukses delete
                    console.log("OK");
                },
                onError: () => {
                    console.error("Error deleting tutorial");
                },
            }
        );
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);

        const filtered = tutorials.filter((tutorial) => {
            return (
                tutorial.judul
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase()) ||
                tutorial.deskripsi
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
        });

        console.log(filtered);

        setFilteredTutorials(filtered);
    };

    useEffect(() => {
        setFilteredTutorials(tutorials);
    }, [tutorials]);

    useEffect(() => {
        // Hanya membersihkan errorMessages jika form berhasil disubmit dan tidak ada error
        setErrorMessages(errors);
    }, [errors]);

    // useEffect(() => {
    //     setTutorialList(filteredTutorials);
    // }, [searchQuery]);

    useEffect(() => {
        if (reload) {
            // Fungsi untuk memuat ulang data atau komponen
            setFilteredTutorials(tutorials); // Misalnya fungsi untuk memuat ulang data tutorial
            setData({
                id: "",
                judul: "",
                link: "",
                deskripsi: "",
            });
            setReload(false); // Setelah memuat ulang, kembalikan state reload ke false
        }
    }, [reload, tutorials]);

    return (
        <AdminLayout title="Manajemen Tutorial">
            <Row>
                <Col md={6} style={{ borderRight: "2px solid #f16211" }}>
                    <h1 className={styles["title-table"]}>Daftar Tutorial</h1>

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
                            placeholder="Cari Tutorial"
                            autoComplete="off"
                            className={styles["search"]}
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    </form>
                    <DataTable
                        columns={columns}
                        data={filteredTutorials}
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
                            value={data.id}
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
                                    value={data.judul}
                                    onChange={handleInputChange}
                                    className={styles["judul"]}
                                />
                                {errorMessages.judul && (
                                    <small className="text-danger">
                                        {errorMessages.judul}
                                    </small>
                                )}
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
                                    value={data.link}
                                    onChange={handleInputChange}
                                    className={styles["link"]}
                                />
                                {errorMessages.link && (
                                    <small className="text-danger">
                                        {errorMessages.link}
                                    </small>
                                )}
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
                                    value={data.deskripsi}
                                    onChange={handleInputChange}
                                    className={styles["deskripsi"]}
                                >
                                    {data.deskripsi}
                                </textarea>
                                {errorMessages.deskripsi && (
                                    <small className="text-danger">
                                        {errorMessages.deskripsi}
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
                        Detail Tutorial{" "}
                        <span className="title">
                            {selectedTutorial && selectedTutorial.judul}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    <form onSubmit={handleDelete} action="#" method="post">
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
