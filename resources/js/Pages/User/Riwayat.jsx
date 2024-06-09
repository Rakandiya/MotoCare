import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Riwayat.module.css";
import React, { useState, useEffect } from "react";
import { Link, useForm, Head, router } from "@inertiajs/react";
import { Button, Col, Row } from "react-bootstrap";

export default function Riwayat({ bookings, users, invoices, auth }) {
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [bookingList, setBookingList] = useState(bookings);

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
        <UserLayout>
            <main>
                <article>
                    {/* <h1 className={styles["user"]}>
            <i className="bx bxs-user" style={{ color: '#ffffff' }}></i> Hi 
          </h1> */}
                    <div className={styles["container"]}>
                        <section className={styles["history-booking"]}>
                            <Row>
                                <Col
                                    md={{ span: 4, offset: 1 }}
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
                                                    Booking {booking.id}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Col>

                                <Col
                                    md={{ span: 4, offset: 1 }}
                                    id={styles["info-booking-pemilik"]}
                                >
                                    <h3>Booking {selectedBookingId}</h3>
                                    <table className={styles["info-pemilik"]}>
                                        <tbody>
                                            <tr>
                                                <td>Nama Pemilik</td>
                                                {/* AMBIL DARI TABEL USERS */}
                                                <td>
                                                    {
                                                        bookings.find(
                                                            (booking) =>
                                                                booking.id ===
                                                                selectedBookingId
                                                        )?.user.name
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>No. Polisi</td>
                                                <td>
                                                    {
                                                        bookings.find(
                                                            (booking) =>
                                                                booking.id ===
                                                                selectedBookingId
                                                        )?.nomor_polisi
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Merk</td>
                                                {/* AMBIL DARI TABEL KATALOG */}
                                                <td>
                                                    {
                                                        bookings.find(
                                                            (booking) =>
                                                                booking.id ===
                                                                selectedBookingId
                                                        )?.katalog.merk
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Jenis Layanan</td>
                                                <td>
                                                    {
                                                        bookings.find(
                                                            (booking) =>
                                                                booking.id ===
                                                                selectedBookingId
                                                        )?.jenis_layanan
                                                    }
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Status</td>
                                                {/* AMBIL DARI TABEL INVOICES */}
                                                <td>
                                                    {
                                                        // status booking kalau kosong akan default menjadi "Diproses"
                                                        bookings.find(
                                                            (booking) =>
                                                                booking.id ===
                                                                selectedBookingId
                                                        )?.invoice?.status ??
                                                            (selectedBookingId
                                                                ? "Diproses"
                                                                : "")
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
                                                <tr>
                                                    <td>
                                                        {selectedBookingId &&
                                                            (bookings.find(
                                                                (booking) =>
                                                                    booking.id ===
                                                                    selectedBookingId
                                                            )?.invoice ? (
                                                                <div>
                                                                    {bookings
                                                                        .find(
                                                                            (
                                                                                booking
                                                                            ) =>
                                                                                booking.id ===
                                                                                selectedBookingId
                                                                        )
                                                                        .invoice.items.map(
                                                                            (
                                                                                item
                                                                            ) => (
                                                                                <div
                                                                                    key={
                                                                                        item.id
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        item
                                                                                            .produk
                                                                                            .nama_produk
                                                                                    }{" "}
                                                                                    -{" "}
                                                                                    {item.harga.toLocaleString(
                                                                                        "id-ID",
                                                                                        {
                                                                                            style: "currency",
                                                                                            currency:
                                                                                                "IDR",
                                                                                        }
                                                                                    )}

                                                                                    x{" "}
                                                                                    {
                                                                                        item.jumlah
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        )}
                                                                </div>
                                                            ) : (
                                                                <div>
                                                                    Invoice
                                                                    belum
                                                                    tersedia
                                                                </div>
                                                            ))}
                                                    </td>
                                                </tr>
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
                                                        {selectedBookingId &&
                                                            (bookings.find(
                                                                (booking) =>
                                                                    booking.id ===
                                                                    selectedBookingId
                                                            )?.invoice ? (
                                                                <div>
                                                                    {/* hitung total harga */}
                                                                    {bookings
                                                                        .find(
                                                                            (
                                                                                booking
                                                                            ) =>
                                                                                booking.id ===
                                                                                selectedBookingId
                                                                        )
                                                                        .invoice.items.reduce(
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
                                                            ))}
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
