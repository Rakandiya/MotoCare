import { useState } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenBooking.module.css";
import DataTable from "react-data-table-component";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link } from "@inertiajs/react";
import { Modal, Button } from "react-bootstrap";

const ManajemenBooking = () => {
    const [show, setShow] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [bookings, setBookings] = useState([
        {
            id: 101,
            name: "John Doe",
            service: "Service rutin",
            status: "diproses",
            tanggal: "01 Januari 2022",
            status_pembayaran: "unpaid",
        },
        {
            id: 102,
            name: "Jane Smith",
            service: "perbaikan khusus",
            status: "diproses",
            status_pembayaran: "paid",
        },
        {
            id: 103,
            name: "David Johnson",
            service: "tune up/bore up",
            status: "diproses",
            status_pembayaran: "paid",
        },
        {
            id: 104,
            name: "Alice Brown",
            service: "cek kendaraan",
            status: "diproses",
            status_pembayaran: "unpaid",
        },
        {
            id: 105,
            name: "Sarah Wilson",
            service: "Service rutin",
            status: "diproses",
            status_pembayaran: "paid",
        },
        {
            id: 106,
            name: "Michael Lee",
            service: "perbaikan khusus",
            status: "diproses",
            status_pembayaran: "unpaid",
        },
        {
            id: 107,
            name: "Emily Clark",
            service: "tune up/bore up",
            status: "diproses",
            status_pembayaran: "unpaid",
        },
        {
            id: 108,
            name: "Christopher Rodriguez",
            service: "cek kendaraan",
            status: "diproses",
            status_pembayaran: "unpaid",
        },
        {
            id: 109,
            name: "Olivia Hall",
            service: "Service rutin",
            status: "diproses",
            status_pembayaran: "unpaid",
        },
        {
            id: 110,
            name: "James Taylor",
            service: "perbaikan khusus",
            status: "diproses",
            status_pembayaran: "unpaid",
        },
    ]);

    const handleClose = () => setShow(false);
    const handleShow = (event, booking) => {
        event.preventDefault();
        setShow(true);
        setSelectedBooking(booking);
    };

    const toggleStatus = (id) => {
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.id === id
                    ? {
                          ...booking,
                          status:
                              booking.status === "diproses"
                                  ? "selesai"
                                  : booking.status === "selesai"
                                  ? "dibatalkan"
                                  : "diproses",
                      }
                    : booking
            )
        );
    };

    const togglePaymentStatus = (id) => {
        setBookings((prevBookings) =>
            prevBookings.map((booking) =>
                booking.id === id
                    ? {
                          ...booking,
                          status_pembayaran:
                              booking.status_pembayaran === "unpaid"
                                  ? "paid"
                                  : "unpaid",
                      }
                    : booking
            )
        );
    };

    const getStatusStyle = (status) => {
        switch (status) {
            case "diproses":
                return { backgroundColor: "#1fe71b" };
            case "selesai":
                return { backgroundColor: "#1887d7" };
            case "dibatalkan":
                return { backgroundColor: "#ff0000" };
            default:
                return {};
        }
    };

    const getPaymentStatusStyle = (status) => {
        switch (status) {
            case "paid":
                return { backgroundColor: "#1fe71b", color: "white" }; // Hijau untuk paid
            case "unpaid":
                return { backgroundColor: "#ff0000", color: "white" }; // Merah untuk unpaid
            default:
                return {};
        }
    };

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            width: "7%",
        },
        {
            name: "Name",
            selector: (row) => row.name,
        },
        {
            name: "Service",
            selector: (row) => row.service,
        },
        {
            name: "Status Booking",
            selector: (row) => (
                <ButtonAdmin
                    style={getStatusStyle(row.status)}
                    onClick={() => toggleStatus(row.id)}
                >
                    {row.status}
                </ButtonAdmin>
            ),
        },
        {
            name: "Tanggal",
            selector: (row) => row.tanggal,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => (
                <ButtonAdmin
                    style={getPaymentStatusStyle(row.status_pembayaran)}
                    onClick={() => togglePaymentStatus(row.id)}
                >
                    {row.status_pembayaran}
                </ButtonAdmin>
            ),
            width: "17%",
        },
        {
            name: "Action",
            selector: (row) => (
                <>
                    <Link
                        title="Invoice"
                        href={route("admin.booking.createInvoice")}
                    >
                        <box-icon
                            name="file"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        title="Detail"
                        href={route("admin.booking.show", [row.id])}
                    >
                        <box-icon
                            name="info-circle"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        title="Edit"
                        href={route("admin.booking.edit", [row.id])}
                        className="mx-2"
                    >
                        <box-icon
                            name="edit"
                            type="solid"
                            color="#f16211"
                        ></box-icon>
                    </Link>
                    <Link
                        title="Hapus"
                        href="#"
                        onClick={(e) => handleShow(e, row)}
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
        <AdminLayout title="MANAJEMEN BOOKING">
            <div className={styles["table-wrapper"]}>
                <div className={styles["sub-wrapper"]}>
                    <Link
                        href={route("admin.booking.create")}
                        style={{ textDecoration: "none" }}
                    >
                        <ButtonAdmin variant="danger">
                            <box-icon color="white" name="plus"></box-icon>{" "}
                            <span>Tambah Booking</span>
                        </ButtonAdmin>
                    </Link>
                    <form action="#" className={styles["form-search"]}>
                        <span className={styles["icon-search"]}>
                            <box-icon name="search" color="#f16211"></box-icon>
                        </span>
                        <input
                            type="text"
                            name="search"
                            id="search"
                            placeholder="Cari Pengguna"
                            autoComplete="off"
                            className={styles["search"]}
                        />
                    </form>
                </div>
                <DataTable columns={columns} data={bookings} pagination />
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Hapus Booking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Apakah anda yakin ingin menghapus booking:{" "}
                        <b>{selectedBooking && selectedBooking.name}</b>?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <ButtonAdmin
                        variant="primary"
                        onClick={handleClose}
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
};

export default ManajemenBooking;
