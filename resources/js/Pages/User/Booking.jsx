import UserLayout from "@/Layouts/UserLayout"; // Pastikan penamaan file dan path sesuai dengan casing yang benar
import styles from "../../../css/User/Booking.module.css";
import React from "react"; // Import React agar dapat menggunakan JSX
import { Col, Row } from "react-bootstrap";

export default function Booking() {
  return (
    <UserLayout>
    <main>
        <article>
            <div className={styles["container"]}>
            <form action="" method="post">
                <section className={styles["form-booking"]}>
                <Row className="form-container-row">
                    {/* <Col className="form-container-col"> */}
                    {/* <h3>Informasi Pemilik Motor</h3>
                    <table className={styles["form-table"]}>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="nama-lengkap"
                              placeholder="Nama Lengkap"
                              required
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type="text"
                              name="no-telpon"
                              placeholder="+62 | Telpon"
                              required
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              required
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table> */}
                    {/* </Col> */}
                    <Col className="form-container-col">
                    <h3 className={styles["jenis-layanan"]}>Jenis Layanan</h3>
                    <table className={styles["form-table"]}>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              type="radio"
                              name="layanan"
                              value="Service Rutin"
                            />
                            Service Rutin
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type="radio"
                              name="layanan"
                              value="Perbaikan Khusus"
                            />
                            Perbaikan Khusus
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type="radio"
                              name="layanan"
                              value="Tune Up/Bore Up"
                            />
                            Tune Up/Bore Up
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type="radio"
                              name="layanan"
                              value="Cek Kendaraan"
                            />
                            Cek Kendaraan
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    </Col>

                    <Col className="form-container-col">
                    <h3>Informasi Motor</h3>
                    <table className={styles["form-table"]}>
                      <tbody>
                        {/* <tr>
                          <td>
                            <input
                              type="text"
                              id="merk-motor"
                              name="merk-motor"
                              placeholder="Merk Motor"
                              required
                            />
                          </td>
                        </tr> */}

                        {/* <tr>
                          <td>
                            <input
                              type="text"
                              id="model-motor"
                              name="model-motor"
                              placeholder="Model Motor"
                            />
                          </td>
                        </tr> */}

                        <tr>
                          <td>
                            <input
                              type="text"
                              id="th-pembuatan"
                              name="th-pembuatan"
                              placeholder="Tahun Pembuatan"
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type="text"
                              id="no-plat"
                              name="no-plat"
                              placeholder="Nomor Polisi/Nomor Plat"
                              required
                            />
                          </td>
                        </tr>

                        <tr>
                          <td>
                            <input
                              type="text"
                              id="km-kendaraan"
                              name="km-kendaraan"
                              placeholder="Kilometer Kendaraan"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </Col>
                </Row>
                
                <Row className="form-container-row">
                  <Col className="form-container-col">
                    <h3>Jadwal Booking</h3>
                    <input type="date" id="tanggal" name="tanggal" required />
                  </Col>
                  
                  <Col className="form-container-col">
                    <h3>Catatan</h3>
                    <textarea id="catatan" name="catatan"></textarea>
                  </Col>
                </Row>
                <Row className="form-container-row">
                <Col className="form-container-col">
                    <div className={styles["tombol-submit"]}>
                      <input type="submit" value="SUBMIT" />
                    </div>
                  </Col>
                  
                </Row>

                        
              </section>
            </form>
          </div>
        </article>
      </main>
    </UserLayout>
  );
}

