import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Riwayat.module.css";
import React, { useState, useEffect } from "react";
import { Link, useForm, Head, router } from "@inertiajs/react";
import { Button, Col, Row } from "react-bootstrap";

export default function Riwayat({ bookings, users, invoices, auth }) {
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [bookingList, setBookingList] = useState(bookings);
    const [number, setNumber] = useState(1);

    useEffect(() => {
        if (auth.user) {
            setBookingList(
                bookings.filter((booking) => booking.user_id === auth.user.id)
            );
        } else {
            router.visit(route("auth"), {
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                },
            });
        }
    }, [auth.user, bookings]);

    const handleBookingClick = (id) => {
        setSelectedBookingId(id);

        setSelectedBooking(bookings.find((booking) => booking.id === id));
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    const filteredBookings = bookingList.filter((booking) =>
        booking.id.toString().toLowerCase().includes(searchTerm)
    );

    useEffect(() => {
        console.log(bookings, users); // Check the initial values
        setBookingList(bookings);
    }, [bookings]);

    return (
        <UserLayout auth={auth}>
            <main>
                <article>
                    {/* <h1 className={styles["user"]}>
            <i className="bx bxs-user" style={{ color: '#ffffff' }}></i> Hi 
          </h1> */}
                    <div className={styles["container"]}>
                        <h1 className={styles["title"]}>RIWAYAT SERVICE</h1>
                        <section className={styles["history-booking"]}>
                            <Row>
                                <Col
                                    md={{ span: 6 }}
                                    className={styles["laporan-kondisi"]}
                                >
                                    <h3>Laporan Kondisi Motor</h3>
                                    <div className={styles["search"]}>
                                        <div className={styles["search-input"]}>
                                            {/* button search */}
                                            <Button
                                                type="button"
                                                value="search"
                                                id="btn-search"
                                                title="Search"
                                                className={
                                                    styles["search-button"]
                                                }
                                            >
                                                <box-icon name="search"></box-icon>
                                            </Button>
                                            {/* input search */}
                                            <input
                                                type="text"
                                                id={styles["search-input"]}
                                                placeholder="Cari Riwayat Booking"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                            />
                                        </div>
                                        <ul id={styles["booking-list"]}>
                                            {filteredBookings.map((booking) => (
                                                <li
                                                    key={booking.id}
                                                    id={`list-${booking.id}`}
                                                    className={
                                                        selectedBookingId ===
                                                        booking.id
                                                            ? `${styles.selected} ${styles.highlighted}`
                                                            : ""
                                                    }
                                                    onClick={() =>
                                                        handleBookingClick(
                                                            booking.id
                                                        )
                                                    }
                                                >
                                                    Booking {number}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>

                                <Col
                                    md={{ span: 6 }}
                                    id={styles["info-booking-pemilik"]}
                                >
                                    <h3>
                                        {selectedBooking &&
                                            selectedBooking.katalog.merk +
                                                " " +
                                                selectedBooking.katalog.model +
                                                " - " +
                                                selectedBooking.jenis_layanan}
                                    </h3>
                                    <table className={styles["info-pemilik"]}>
                                        <tbody>
                                            <tr>
                                                <td>Nama Pemilik</td>
                                                {/* AMBIL DARI TABEL USERS */}
                                                <td>
                                                    {selectedBooking &&
                                                        selectedBooking.user
                                                            .nama}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>No. Polisi</td>
                                                <td>
                                                    {selectedBooking &&
                                                        selectedBooking.nomor_polisi}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Merk</td>
                                                {/* AMBIL DARI TABEL KATALOG */}
                                                <td>
                                                    {selectedBooking &&
                                                        selectedBooking.katalog
                                                            .merk +
                                                            " " +
                                                            selectedBooking
                                                                .katalog.model}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Jenis Layanan</td>
                                                <td>
                                                    {selectedBooking &&
                                                        selectedBooking.jenis_layanan}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                {/* AMBIL DARI TABEL INVOICES */}
                                                <td>
                                                    {
                                                        // status booking kalau kosong akan default menjadi "Diproses"
                                                        (selectedBooking &&
                                                            (selectedBooking.status ??
                                                                "Diproses")) +
                                                            " - " +
                                                            (selectedBooking &&
                                                                (selectedBooking
                                                                    .invoice
                                                                    .status ??
                                                                    "Unpaid"))
                                                    }
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <hr />

                                    {/* INVOICE */}
                                    <div
                                        className={
                                            styles["info-booking-invoice"]
                                        }
                                    >
                                        <h3>Invoice</h3>
                                        <table
                                            className={styles["info-invoice"]}
                                        >
                                            <tbody>
                                                {selectedBooking &&
                                                selectedBooking.invoice
                                                    ?.items ? (
                                                    selectedBooking.invoice.items.map(
                                                        (item) => (
                                                            <tr key={item.id}>
                                                                <td>
                                                                    {
                                                                        item
                                                                            .produk
                                                                            .nama_produk
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {item.harga.toLocaleString(
                                                                        "id-ID",
                                                                        {
                                                                            style: "currency",
                                                                            currency:
                                                                                "IDR",
                                                                        }
                                                                    )}
                                                                </td>
                                                                <td
                                                                    style={{
                                                                        width: "10%",
                                                                    }}
                                                                >
                                                                    {
                                                                        item.jumlah
                                                                    }
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td colSpan="3">
                                                            Invoice belum
                                                            tersedia
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        <hr />
                                    </div>
                                    <div
                                        className={
                                            styles["info-booking-total-bayar"]
                                        }
                                    >
                                        <table
                                            className={styles["total-bayar"]}
                                        >
                                            <tbody>
                                                <tr>
                                                    <td>Total Bayar:</td>
                                                    <td>
                                                        {selectedBooking &&
                                                        selectedBooking.invoice ? (
                                                            <div>
                                                                {/* hitung total harga */}
                                                                {selectedBooking.invoice.items
                                                                    .reduce(
                                                                        (
                                                                            total,
                                                                            item
                                                                        ) => {
                                                                            return (
                                                                                total +
                                                                                item.jumlah *
                                                                                    item.harga
                                                                            );
                                                                        },
                                                                        0
                                                                    )
                                                                    .toLocaleString(
                                                                        "id-ID",
                                                                        {
                                                                            style: "currency",
                                                                            currency:
                                                                                "IDR",
                                                                        }
                                                                    )}
                                                            </div>
                                                        ) : (
                                                            <div></div>
                                                        )}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Col>
                            </Row>
                        </section>
                    </div>
                </article>
            </main>
        </UserLayout>
    );
}
//
