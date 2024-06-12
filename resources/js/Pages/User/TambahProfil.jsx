import React, { useState, useEffect } from "react";
import { useForm, Link, router, usePage } from "@inertiajs/react";
import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/TambahProfil.module.css";

export default function TambahProfil({ auth, userId }) {
    const errMessage = usePage().props.errors;
    const { data, setData, post, errors } = useForm({
        userId,
        nama: "",
        tanggal_lahir: "",
        no_telepon: "",
        jenis_kelamin: "Pilih Jenis Kelamin",
        foto: null,
    });

    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(errMessage);
        setError(errMessage);
    }, [errMessage]);

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        setData("foto", file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData(name, value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(data);
        router.post(route("profile.store", { id: userId }), {
            _method: "PUT",
            method: "PUT",
            data: data,
            onSuccess: () => {
                console.log("Profile updated successfully");
            },
            onError: () => {
                console.log("An error occurred");
            },
        });
    };

    return (
        <UserLayout auth={auth}>
            <section className={styles.content}>
                <h1 className={styles.title}>LENGKAPI PROFIL ANDA</h1>
                <div className={styles.contentWrapper}>
                    <div className={styles.formWrapper}>
                        <form
                            onSubmit={handleSubmit}
                            method="post"
                            id={styles.form}
                        >
                            <div className={styles.row}>
                                <div>
                                    <label htmlFor="nama">Nama</label>
                                    <input
                                        type="text"
                                        name="nama"
                                        id="nama"
                                        placeholder="John Doe"
                                        autoComplete="off"
                                        required
                                        value={data.nama}
                                        onChange={handleChange}
                                    />
                                    {error && <p>{error.nama}</p>}
                                </div>
                                <div>
                                    <label htmlFor="tanggal_lahir">
                                        Tanggal Lahir
                                    </label>
                                    <input
                                        type="date"
                                        name="tanggal_lahir"
                                        id="tanggal_lahir"
                                        value={data.tanggal_lahir}
                                        onChange={handleChange}
                                    />
                                    {error && <p>{error.tanggal_lahir}</p>}
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div>
                                    <label htmlFor="no_telepon">
                                        No Telepon
                                    </label>
                                    <input
                                        type="text"
                                        name="no_telepon"
                                        id="no_telepon"
                                        placeholder="08131259455"
                                        autoComplete="off"
                                        required
                                        value={data.no_telepon}
                                        onChange={handleChange}
                                    />
                                    {error && <p>{error.no_telepon}</p>}
                                </div>

                                <div>
                                    <label htmlFor="jenis_kelamin">
                                        Jenis Kelamin
                                    </label>
                                    <select
                                        name="jenis_kelamin"
                                        id="jenis_kelamin"
                                        value={data.jenis_kelamin}
                                        onChange={handleChange}
                                    >
                                        <option
                                            disabled
                                            value="Pilih Jenis Kelamin"
                                        >
                                            Pilih Jenis Kelamin
                                        </option>
                                        <option value="Laki-laki">
                                            Laki-laki
                                        </option>
                                        <option value="Perempuan">
                                            Perempuan
                                        </option>
                                    </select>
                                    {error && <p>{error.jenis_kelamin}</p>}
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.rowImage}>
                                    <div>
                                        <label htmlFor="foto">
                                            Foto Profil
                                        </label>
                                        <input
                                            type="file"
                                            name="foto"
                                            id="foto"
                                            onChange={handleFotoChange}
                                        />
                                    </div>
                                    {previewImage ? (
                                        <img
                                            src={previewImage}
                                            className={styles.imgPreview}
                                            id="img-preview"
                                            alt="Preview"
                                            width="100px"
                                        />
                                    ) : (
                                        <img
                                            src="/images/preview.png"
                                            className={styles.imgPreview}
                                            id="img-preview"
                                            alt=""
                                            width="100px"
                                        />
                                    )}
                                </div>
                            </div>

                            <div className={styles.btnWrapper}>
                                <Link href="/" className={styles.btnBack}>
                                    <i className="bx bx-arrow-back"></i> KEMBALI
                                </Link>
                                <button
                                    type="submit"
                                    className={styles.btnSubmit}
                                >
                                    <i className="bx bxs-save"></i> SUBMIT
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </UserLayout>
    );
}
