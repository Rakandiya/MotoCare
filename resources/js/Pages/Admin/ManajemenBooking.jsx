import { useState, useEffect } from "react";
import AdminLayout from "@/Layouts/AdminLayout";
import styles from "../../../css/Admin/ManajemenBooking.module.css";
import DataTable from "react-data-table-component";
import ButtonAdmin from "@/Components/ButtonAdmin";
import { Link, useForm, Head, router } from "@inertiajs/react";
import { Modal, Button } from "react-bootstrap";

export default function ManajemenBooking({ bookings }) {
    const [showDetail, setShowDetail] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

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
    /* const [bookings, setBookings] = useState([
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
    ]); */

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
            // ambil nama dari tabel user
            selector: (row) => row.nama,
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

    /* const handleEditBooking = (booking) => {
        setData({
            id: booking.id,
            name: booking.nama_booking,
            harga: booking.harga,
            stok: booking.stok,
            deskripsi: booking.deskripsi,
        });
    }; */

    /*function handleInputChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setData((values) => ({
            ...values,
            [key]: value,
        }));
    } */

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
                            placeholder="Cari Pengguna"
                            autoComplete="off"
                            className={styles["search"]}
                        />
                    </form>
                </div>
                <DataTable columns={columns} data={bookings} pagination />
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