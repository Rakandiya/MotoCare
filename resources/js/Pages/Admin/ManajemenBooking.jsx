import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenBooking.module.css";
import DataTable from "react-data-table-component";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link, useForm, Head, router } from "@inertiajs/react";
import { Modal, Button } from "react-bootstrap";

export default function ManajemenBooking({ bookings, users, katalog }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBookings, setFilteredBookings] = useState(bookings);

    useEffect(() => {
        const results = bookings.filter(
            (booking) =>
                booking.user.nama
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                booking.katalog.merk
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                booking.katalog.model
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                booking.tahun_pembuatan
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                booking.nomor_polisi
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                booking.jenis_layanan
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                booking.jadwal_booking
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                booking.catatan
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase()) ||
                booking.status.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredBookings(results);
    }, [searchTerm, bookings]);

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
        user_id: "",
        jenis_layanan: "",
        katalog_id: "",
        merk_motor: "",
        tahun_pembuatan: "",
        nomor_polisi: "",
        km_kendaraan: "",
        jadwal_booking: "",
        catatan: "",
    });

    const [bookingList, setBookingList] = useState(bookings);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShowDetail = (booking) => {
        setShowDetail(true);
        setSelectedBooking(booking);
        console.log(booking);
    };

    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = (booking) => {
        setShowDelete(true);
        setSelectedBooking(booking);
    };

    const toggleStatus = (id) => {
        setBookingList((prevBookings) =>
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
        setBookingList((prevBookings) =>
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
            case "Diproses":
                return { backgroundColor: "#1fe71b" };
            case "Selesai":
                return { backgroundColor: "#1887d7" };
            case "Dibatalkan":
                return { backgroundColor: "#ff0000" };
            default:
                return {};
        }
    };

    const getPaymentStatusStyle = (status) => {
        switch (status) {
            case "Paid":
                return { backgroundColor: "#1fe71b", color: "white" }; // Hijau untuk paid
            case "Unpaid":
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
            // ambil data name dari tabel users
            selector: (row) => row.user.nama,
        },
        {
            name: "Service",
            selector: (row) => row.jenis_layanan,
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
            selector: (row) => row.jadwal_booking,
        },
        {
            name: "Status Pembayaran",
            selector: (row) => (
                <ButtonAdmin
                    style={getPaymentStatusStyle(row.invoice.status)}
                    onClick={() => togglePaymentStatus(row.id)}
                >
                    {row.invoice.status}
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
                        href={route("admin.booking.createInvoice", {
                            booking: row.id,
                        })}
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

    const [errorMessages, setErrorMessages] = useState({});
    const [reload, setReload] = useState(false);
    const handleDelete = (e) => {
        e.preventDefault();
        deleteRoute(
            route("admin.booking.delete", { booking: selectedBooking.id }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    setShowDelete(false); // Menutup modal setelah berhasil
                    setReload(!reload); // Memicu reload data
                },
                onError: () => {
                    console.error("Error deleting Booking");
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
        setBookingList(bookings); // Misalnya fungsi untuk memuat ulang data tutorial
        setData({
            id: "",
            user_id: "",
            jenis_layanan: "",
            katalog_id: "",
            merk_motor: "",
            tahun_pembuatan: "",
            nomor_polisi: "",
            km_kendaraan: "",
            jadwal_booking: "",
            catatan: "",
        });
    }, [reload, bookingList]);

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
                            placeholder="Cari Booking"
                            autoComplete="off"
                            className={styles["search"]}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </form>
                </div>
                <DataTable
                    columns={columns}
                    data={filteredBookings}
                    pagination
                />
            </div>

            <Modal show={showDelete} onHide={handleCloseDelete}>
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
