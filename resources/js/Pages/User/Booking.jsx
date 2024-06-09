import UserLayout from "@/Layouts/UserLayout"; // Pastikan penamaan file dan path sesuai dengan casing yang benar
import styles from "../../../css/User/Booking.module.css";
import React, { useEffect, useState } from "react"; // Import React agar dapat menggunakan JSX
import { Col, Row } from "react-bootstrap";
import { data } from "autoprefixer";
import { Head, useForm, router } from "@inertiajs/react";
import ReactSelect from "react-select";

export default function Booking({ users, katalogs, auth }) {
    const [selectedJenisLayanan, setSelectedJenisLayanan] = useState("");
    const [selectedUser, setSelectedUser] = useState(
        users && users.length > 0 ? users[0].id : null
    );

    const [selectedKatalog, setSelectedKatalog] = useState("");
    const [errorMessages, setErrorMessages] = useState({});
    const [reload, setReload] = useState(false); // Define state to manage reload
    const { data, setData, post, processing, errors } = useForm({
        id: "",
        user_id: auth?.user?.id || null,
        jenis_layanan: selectedJenisLayanan,
        katalog_id: selectedKatalog,
        tahun_pembuatan: "",
        nomor_polisi: "",
        km_kendaraan: "",
        jadwal_booking: "",
        catatan: "",
    });

    const [katalogList, setKatalogList] = useState(katalogs);

    const dataSelectKatalog = katalogList.map((katalog) => ({
        value: katalog.id,
        label: katalog.merk + " " + katalog.model,
    }));

    // handleSubmit untuk tambah booking
    const handleSubmit = (e) => {
        e.preventDefault();
        if (auth.user) {
            const routeName = "user.booking.store";
            post(route(routeName), {
                preserveScroll: true,
                data: data,
                onSuccess: () => {
                    setReload((prev) => !prev); // Perbaiki toggle state
                    alert("Data berhasil di submit."); // Alert on successful submission
                    setData({
                        id: "",
                        user_id: auth?.user?.id || selectedUser,
                        jenis_layanan: "",
                        katalog_id: selectedKatalog,
                        tahun_pembuatan: "",
                        nomor_polisi: "",
                        km_kendaraan: "",
                        jadwal_booking: "",
                        catatan: "",
                    });
                },
                onError: (error) => {
                    console.log(error);
                    setErrorMessages(error); // Menampilkan error di UI
                },
            });
        } else {
            router.visit(route("auth"), {
                method: "GET",
                headers: {
                    "Content-type": "Application/json",
                },
            });
        }
    };

    useEffect(() => {
        // Hanya membersihkan errorMessages jika form berhasil disubmit dan tidak ada error
        setErrorMessages(errors);
    }, [errors]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    return (
        <UserLayout auth={auth}>
            <main>
                <article>
                    <div className={styles["container"]}>
                        <h1 className={styles["title"]}>BOOKING</h1>
                        <form onSubmit={handleSubmit}>
                            <section className={styles["form-booking"]}>
                                <Row className="form-container-row">
                                    <Col className="form-container-col">
                                        <h3 className={styles["jenis-layanan"]}>
                                            Jenis Layanan
                                        </h3>
                                        <table className={styles["form-table"]}>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name="jenis_layanan"
                                                            value="Service Rutin"
                                                            checked={
                                                                data.jenis_layanan ===
                                                                "Service Rutin"
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                        Service Rutin
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name="jenis_layanan"
                                                            value="Perbaikan Khusus"
                                                            checked={
                                                                data.jenis_layanan ===
                                                                "Perbaikan Khusus"
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                        Perbaikan Khusus
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name="jenis_layanan"
                                                            value="Tune Up/Bore Up"
                                                            checked={
                                                                data.jenis_layanan ===
                                                                "Tune Up/Bore Up"
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                        Tune Up/Bore Up
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td>
                                                        <input
                                                            type="radio"
                                                            name="jenis_layanan"
                                                            value="Cek Kendaraan"
                                                            checked={
                                                                data.jenis_layanan ===
                                                                "Cek Kendaraan"
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                        Cek Kendaraan
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {errorMessages.jenis_layanan && (
                                            <p className={styles.error}>
                                                {errorMessages.jenis_layanan}
                                            </p>
                                        )}
                                    </Col>

                                    <Col className="form-container-col">
                                        <h3>Informasi Motor</h3>
                                        <table className={styles["form-table"]}>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <ReactSelect
                                                            id="katalog"
                                                            options={
                                                                dataSelectKatalog
                                                            }
                                                            value={dataSelectKatalog.find(
                                                                (option) =>
                                                                    option.value ===
                                                                    selectedKatalog
                                                            )}
                                                            onChange={(
                                                                selectedOption
                                                            ) => {
                                                                setSelectedKatalog(
                                                                    selectedOption.value
                                                                );
                                                                setData(
                                                                    (
                                                                        prevData
                                                                    ) => ({
                                                                        ...prevData,
                                                                        katalog_id:
                                                                            selectedOption.value,
                                                                    })
                                                                );
                                                            }}
                                                            placeholder="Pilih Katalog"
                                                        />
                                                    </td>
                                                </tr>
                                                {errorMessages.katalog_id && (
                                                    <p className={styles.error}>
                                                        Katalog is required
                                                    </p>
                                                )}
                                                <tr>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            id="th-pembuatan"
                                                            name="tahun_pembuatan"
                                                            placeholder="Tahun Pembuatan"
                                                            value={
                                                                data.tahun_pembuatan
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                {errorMessages.tahun_pembuatan && (
                                                    <p className={styles.error}>
                                                        {
                                                            errorMessages.tahun_pembuatan
                                                        }
                                                    </p>
                                                )}

                                                <tr>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            id="no-plat"
                                                            name="nomor_polisi"
                                                            placeholder="Nomor Polisi/Nomor Plat"
                                                            required
                                                            value={
                                                                data.nomor_polisi
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                {errorMessages.nomor_polisi && (
                                                    <p className={styles.error}>
                                                        {
                                                            errorMessages.nomor_polisi
                                                        }
                                                    </p>
                                                )}

                                                <tr>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            id="km-kendaraan"
                                                            name="km_kendaraan"
                                                            placeholder="Kilometer Kendaraan"
                                                            value={
                                                                data.km_kendaraan
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                    </td>
                                                </tr>
                                                {errorMessages.km_kendaraan && (
                                                    <p className={styles.error}>
                                                        {
                                                            errorMessages.km_kendaraan
                                                        }
                                                    </p>
                                                )}
                                            </tbody>
                                        </table>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col style={{ marginTop: "10px" }}>
                                        <h3>Jadwal Booking</h3>
                                        <input
                                            type="date"
                                            id="tanggal"
                                            name="jadwal_booking"
                                            required
                                            value={data.jadwal_booking}
                                            onChange={handleInputChange}
                                        />
                                        {errorMessages.jadwal_booking && (
                                            <p className={styles.error}>
                                                {errorMessages.jadwal_booking}
                                            </p>
                                        )}
                                    </Col>

                                    <Col className="form-container-col">
                                        <h3>Catatan</h3>
                                        <textarea
                                            id="catatan"
                                            name="catatan"
                                            value={data.catatan}
                                            onChange={handleInputChange}
                                        ></textarea>
                                        {errorMessages.catatan && (
                                            <p className={styles.error}>
                                                {errorMessages.catatan}
                                            </p>
                                        )}
                                    </Col>
                                </Row>
                                <Row className="form-container-row">
                                    <Col className="form-container-col">
                                        <div
                                            className={styles["tombol-submit"]}
                                        >
                                            <input
                                                type="submit"
                                                value="SUBMIT"
                                            />
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
