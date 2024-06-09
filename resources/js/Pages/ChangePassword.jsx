import React, { useEffect, useRef } from "react";
import UserLayout from "@/Layouts/UserLayout";
import styles from "../../css/changePassword.module.css";
import { useForm } from "@inertiajs/react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function ChangePassword({ auth, user }) {
    const { data, setData, post, put, errors } = useForm({
        user_id: "",
        password: "",
        konfirmasi_password: "",
    });

    useEffect(() => {
        if (user) {
            setData("user_id", user.id);
        } else {
            router.visit("/", { method: "get" });
        }
    }, [user]);

    const handleUbahPassword = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleUbahPasswordSubmit = (e) => {
        e.preventDefault();
        put("/change-password", data, {
            onSuccess: () => {
                console.log("success");
            },
        });
    };

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    return (
        <UserLayout auth={auth}>
            <main>
                <article>
                    <section
                        className={`${styles.section} ${styles["login-register"]}`}
                    >
                        <div className={styles.container}>
                            <div className={styles.wrapper}>
                                <div
                                    className={`${styles["form-box"]} ${styles["change-password"]}`}
                                >
                                    <h2>Ubah Password</h2>
                                    <form onSubmit={handleUbahPasswordSubmit}>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <box-icon
                                                    name="lock-alt"
                                                    type="solid"
                                                    color="#f16211"
                                                ></box-icon>
                                            </span>
                                            <input
                                                type="password"
                                                name="password"
                                                value={data.password}
                                                onChange={handleUbahPassword}
                                                required
                                            />
                                            <label>Password</label>
                                            {errors.password && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{ color: "red" }}
                                                >
                                                    {errors.password}
                                                </small>
                                            )}
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <box-icon
                                                    name="lock-alt"
                                                    type="solid"
                                                    color="#f16211"
                                                ></box-icon>
                                            </span>
                                            <input
                                                type="password"
                                                name="konfirmasi_password"
                                                value={data.konfirmasi_password}
                                                onChange={handleUbahPassword}
                                                required
                                            />
                                            <label>Konfirmasi Password</label>
                                            {errors.konfirmasi_password && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{ color: "red" }}
                                                >
                                                    {errors.konfirmasi_password}
                                                </small>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className={styles["btn-login"]}
                                        >
                                            Ubah Password
                                        </button>
                                        <div
                                            className={styles["login-register"]}
                                        >
                                            <p>
                                                Remember Password?
                                                <Link
                                                    href={route("auth")}
                                                    className={
                                                        styles["register-link"]
                                                    }
                                                >
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </article>
            </main>
        </UserLayout>
    );
}
