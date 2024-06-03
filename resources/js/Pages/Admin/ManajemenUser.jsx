import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenUser.module.css";
import DataTable from "react-data-table-component";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import { Modal, Button } from "react-bootstrap";
import { route } from "ziggy-js";

const ManajemenUser = () => {
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = (user) => {
        setSelectedUser(user);
        setShow(true);
    };

    const columns = [
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Username",
            selector: (row) => row.username,
        },
        {
            name: "Email",
            selector: (row) => row.email,
        },
        {
            name: "Role",
            selector: (row) => row.role,
        },
        {
            name: "Action",
            cell: (row) => (
                <>
                    <Link href={route("admin.user.show", [row.id])}>
                        <box-icon
                            name="info-circle"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        href={route("admin.user.edit", [row.id])}
                        className="mx-2"
                    >
                        <box-icon
                            name="edit"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        onClick={() => handleShow(row)}
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
            name: "John Doe",
            username: "john_doe123",
            email: "john.doe@example.com",
            role: "User",
        },
        {
            id: 2,
            name: "Jane Smith",
            username: "jane_smith456",
            email: "jane.smith@example.com",
            role: "Admin",
        },
        {
            id: 3,
            name: "Michael Johnson",
            username: "michael_johnson789",
            email: "michael.johnson@example.com",
            role: "User",
        },
        {
            id: 4,
            name: "Alice Johnson",
            username: "alice_johnson",
            email: "alice.johnson@example.com",
            role: "User",
        },
        {
            id: 5,
            name: "Robert Brown",
            username: "robert_brown",
            email: "robert.brown@example.com",
            role: "Admin",
        },
        {
            id: 6,
            name: "Sarah Lee",
            username: "sarah_lee",
            email: "sarah.lee@example.com",
            role: "User",
        },
        {
            id: 7,
            name: "Michael Smith",
            username: "michael_smith",
            email: "michael.smith@example.com",
            role: "User",
        },
        {
            id: 8,
            name: "Emma Davis",
            username: "emma_davis",
            email: "emma.davis@example.com",
            role: "Admin",
        },
        {
            id: 9,
            name: "James Wilson",
            username: "james_wilson",
            email: "james.wilson@example.com",
            role: "User",
        },
        {
            id: 10,
            name: "Olivia Taylor",
            username: "olivia_taylor",
            email: "olivia.taylor@example.com",
            role: "Admin",
        },
    ];

    return (
        <AdminLayout title="MANAJEMEN USER">
            <div className={styles["table-wrapper"]}>
                <div className={styles["sub-wrapper"]}>
                    <Link
                        href={route("admin.user.create")}
                        style={{ textDecoration: "none" }}
                    >
                        <ButtonAdmin variant="danger">
                            <box-icon color="white" name="plus"></box-icon>{" "}
                            <span>Tambah User</span>
                        </ButtonAdmin>
                    </Link>
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
                            className={styles["input-search"]}
                            placeholder="Cari User"
                            autoComplete="off"
                        />
                    </form>
                </div>
                <DataTable columns={columns} data={data} pagination />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus user:{" "}
                        <b>{selectedUser && selectedUser.name}</b>?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Tutup
                    </Button>
                    <Button
                        variant="primary"
                        onClick={handleClose}
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
};

export default ManajemenUser;
