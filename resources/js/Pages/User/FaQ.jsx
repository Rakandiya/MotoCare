// resources/js/Components/FaQ.js
import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../../../css/User/FaQ.module.css";

const FaQ = ({ auth }) => {
    return (
        <UserLayout auth={auth}>
            <Container className={styles.faqContainer}>
                <h1 className={styles.faqTitle}>Frequently Asked Questions</h1>
                <Row>
                    <Col md={12}>
                        <h3>Apa itu website MotoCare?</h3>
                        <p>
                            Website MotoCare adalah platform online yang
                            memungkinkan Anda untuk membuat janji temu dengan
                            bengkel mobil atau motor untuk perawatan, perbaikan,
                            atau layanan lainnya secara mudah dan cepat.
                        </p>

                        <h3>
                            Bagaimana cara melakukan booking layanan di website
                            ini?
                        </h3>
                        <p>
                            Untuk melakukan booking layanan, Anda cukup memilih
                            jenis layanan yang diinginkan, memilih bengkel yang
                            tersedia, menentukan tanggal dan waktu yang sesuai,
                            lalu mengisi informasi kendaraan dan data diri Anda.
                            Setelah itu, Anda dapat mengonfirmasi pemesanan.
                        </p>

                        <h3>
                            Apakah saya perlu membuat akun untuk melakukan
                            booking?
                        </h3>
                        <p>
                            Ya, Anda perlu membuat akun untuk melakukan booking.
                            Hal ini untuk memastikan bahwa informasi kendaraan
                            dan pemesanan Anda tercatat dengan baik, serta
                            memudahkan proses tindak lanjut.
                        </p>

                        <h3>
                            Apakah ada biaya untuk mendaftar atau menggunakan
                            layanan booking ini?
                        </h3>
                        <p>
                            Tidak, pendaftaran dan penggunaan layanan booking di
                            website ini gratis. Anda hanya akan dikenakan biaya
                            untuk layanan yang Anda pesan di bengkel.
                        </p>

                        <h3>
                            Apa saja jenis layanan yang tersedia untuk booking?
                        </h3>
                        <p>
                            Kami melayani berbagai layanan seperti ganti oli,
                            servis rutin, bore up / tune up, perbaikan khusus,
                            cek kendaraan dan lain-lain. Anda bisa melihat
                            daftar lengkap layanan di halaman "booking" di
                            website kami.
                        </p>

                        <h3>
                            Apakah saya bisa mendapatkan estimasi biaya sebelum
                            melakukan booking?
                        </h3>
                        <p>
                            {" "}
                            Ya, Anda bisa mendapatkan estimasi biaya layanan
                            sebelum melakukan booking. Silakan pilih layanan
                            yang diinginkan dan informasi estimasi biaya akan
                            ditampilkan.
                        </p>

                        <h3>Apakah data pribadi saya aman di website ini?</h3>
                        <p>
                            Kami sangat menjaga privasi dan keamanan data
                            pribadi Anda. Informasi Anda akan dienkripsi dan
                            tidak akan dibagikan kepada pihak ketiga tanpa izin
                            Anda.
                        </p>
                    </Col>
                </Row>
            </Container>
        </UserLayout>
    );
};

export default FaQ;
