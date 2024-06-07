import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenUser.module.css";
import DataTable from "react-data-table-component";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link, usePage } from "@inertiajs/react";
import { Modal, Button } from "react-bootstrap";
import { route } from "ziggy-js";

const ManajemenUser = () => {
    const { props } = usePage();
    const users = props.users;

    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);

    useEffect(() => {
        const results = users.filter(user =>
            user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(results);
    }, [searchTerm, users]);

    const handleClose = () => setShow(false);
    const handleShow = (user) => {
        setSelectedUser(user);
        setShow(true);
    };

    const handleDelete = () => {
        fetch(route("admin.user.destroy", selectedUser.id), {
            method: "DELETE",
            headers: {
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting user');
            }
            window.location.reload();
        })
        .catch(error => console.error('Error:', error));
        setShow(false);
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
                        <box-icon name="info-circle" type="solid" color="#f16211"></box-icon>
                    </Link>
                    <Link href={route("admin.user.edit", [row.id])} className="mx-2">
                        <box-icon name="edit" type="solid" color="#f16211"></box-icon>
                    </Link>
                    <Link onClick={() => handleShow(row)} style={{ color: "#f16211" }}>
                        <box-icon name="trash" type="solid" color="#f16211"></box-icon>
                    </Link>
                </>
            ),
        },
    ];

    return (
        <AdminLayout title="MANAJEMEN USER">
            <div className={styles["table-wrapper"]}>
                <div className={styles["sub-wrapper"]}>
                    <Link href={route("admin.user.create")} style={{ textDecoration: "none" }}>
                        <ButtonAdmin variant="danger">
                            <box-icon color="white" name="plus"></box-icon>{" "}
                            <span>Tambah User</span>
                        </ButtonAdmin>
                    </Link>
                    <form action="#" id="form-search" className={styles["form-search"]}>
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
                <DataTable columns={columns} data={filteredUsers} pagination />
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
                        onClick={handleDelete}
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
