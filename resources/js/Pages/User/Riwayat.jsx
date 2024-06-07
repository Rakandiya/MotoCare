import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Riwayat.module.css";
import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

const dataBookings = [
  {
    id: 'Booking 1',
    namaPemilik: 'John Doe',
    noPolisi: 'AB 1234 CD',
    merk: 'Kawasaki',
    jenisLayanan: 'Service',
    status: 'Done',
    gambar: '/images/beat.jpeg',
    oli: 'Rp55000',
    kampasRem: 'Rp10000',
    oliGardan: 'Rp61000',
    komstir: 'Rp19000',
    totalBayar: 'Rp145000',
  },
  {
    id: 'Booking 2',
    namaPemilik: 'Jane Doe',
    noPolisi: 'XY 5678 ZW',
    merk: 'PCX',
    jenisLayanan: 'Tune Up',
    status: 'In Progress',
    gambar: '/images/aerox.png',
    oli: 'Rp60000',
    kampasRem: 'Rp15000',
    oliGardan: 'Rp60000',
    komstir: 'Rp20000',
    totalBayar: 'Rp155000',
  },
  {
    id: 'Booking 3',
    namaPemilik: 'Asep',
    noPolisi: 'D 1 LAN',
    merk: 'Honda - Beat',
    jenisLayanan: 'Service Rutin',
    status: 'Selesai - Lunas',
    gambar: '/images/motor-beat.png',
    oli: 'Rp45000',
    kampasRem: 'Rp20000',
    oliGardan: 'Rp51000',
    komstir: 'Rp20000',
    totalBayar: 'Rp136000',
  },
];

export default function Riwayat() {
  const [selectedBookingId, setSelectedBookingId] = useState('Booking 3');
  const [searchTerm, setSearchTerm] = useState('');

  const handleBookingClick = (id) => {
    setSelectedBookingId(id);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredBookings = dataBookings.filter((booking) =>
    booking.id.toLowerCase().includes(searchTerm)
  );

  return (
    <UserLayout>
      <main>
        <article>
          <h1 className={styles["user"]}>
            <i className="bx bxs-user" style={{ color: '#ffffff' }}></i> Hi
            Rudy!
          </h1>
          <div className={styles["container"]}>
            <section className={styles["history-booking"]}>
              <Row>
                    <Col md={4} className={styles["laporan-kondisi"]}>
                      <h3>Laporan Kondisi Motor</h3>
                        <div className={styles["search"]}>
                          <div className={styles["search-input"]}>
                            {/* button search */}
                            <Button
                              type="button"
                              value="search"
                              id="btn-search"
                              title="Search"
                              className={styles["search-button"]}
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
                                  selectedBookingId === booking.id
                                    ? 'selected'
                                    : ''
                                }
                                onClick={() => handleBookingClick(booking.id)}
                              >
                                {booking.id}
                              </li>
                            ))}
                          </ul>
                        </div>
                      
                    </Col>

                    <td className={styles["col"]} id={styles["info-booking-pemilik"]}>
                      <h3>{selectedBookingId}</h3>
                      <table className={styles["info-pemilik"]}>
                        <tbody>
                          <tr>
                            <td>Nama Pemilik</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).namaPemilik
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>No. Polisi</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).noPolisi
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>Merk</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).merk
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>Jenis Layanan</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).jenisLayanan
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>Status</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).status
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr />

                      {/* INVOICE */}
                      <div className={styles["info-booking-invoice"]}>
                      <h3>Invoice</h3>
                      <table className={styles["info-invoice"]}>
                        <tbody>
                          <tr>
                            <td>oli mpx 800ml</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).oli
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>kampas rem depan</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).kampasRem
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>oli gardan</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).oliGardan
                              }
                            </td>
                          </tr>
                          <tr>
                            <td>ganti komstir</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).komstir
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <hr />
                    </div>
                      <div className={styles["info-booking-total-bayar"]}>
                      <table className={styles["total-bayar"]}>
                        <tbody>
                          <tr>
                            <td>Total Bayar:</td>
                            <td>
                              {
                                dataBookings.find(
                                  (booking) => booking.id === selectedBookingId
                                ).totalBayar
                              }
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    </td>

                    <Col md={4} id={styles["info-booking-gambar"]}>
                      <div className={styles["img-motor"]}>
                        <img
                          src={
                            dataBookings.find(
                              (booking) => booking.id === selectedBookingId
                            ).gambar
                          }
                          alt="Gambar Motor"
                        />
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
