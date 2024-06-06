import React, { useEffect, useRef } from "react";
// import { useForm } from "@inertiajs/inertia-react";
import UserLayout from "@/Layouts/UserLayout";
import styles from "../../css/Register.module.css";
import { Head, useForm, router } from "@inertiajs/react";

export default function Register() {
    const wrapperRef = useRef(null);
    const loginLinkRef = useRef(null);
    const registerLinkRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const loginLink = loginLinkRef.current;
        const registerLink = registerLinkRef.current;

        if (registerLink && loginLink && wrapper) {
            registerLink.addEventListener("click", () => {
                wrapper.classList.add(styles.active);
            });

            loginLink.addEventListener("click", () => {
                wrapper.classList.remove(styles.active);
            });
        }

        // Cleanup event listeners on component unmount
        return () => {
            if (registerLink && loginLink) {
                registerLink.removeEventListener("click", () => {
                    wrapper.classList.add(styles.active);
                });

                loginLink.removeEventListener("click", () => {
                    wrapper.classList.remove(styles.active);
                });
            }
        };
    }, []);

    const {
        data: registerData,
        setData: setRegisterData,
        post: postRegister,
        errors: registerErrors,
    } = useForm({
        username: "",
        email: "",
        password: "",
    });

    const {
        data: loginData,
        setData: setLoginData,
        post: postLogin,
        errors: loginErrors,
    } = useForm({
        email: "",
        password: "",
    });

    const handleRegisterChange = (e) => {
        setRegisterData(e.target.name, e.target.value);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting registration form with data:", registerData); // Tambahkan log ini untuk memastikan data yang dikirim
        postRegister("/register"); // Pastikan rute ini benar
    };

    const handleLoginChange = (e) => {
        setLoginData(e.target.name, e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting login form with data:", loginData); // Tambahkan log ini untuk memastikan data yang dikirim
        postLogin("/login"); // Pastikan rute ini benar
    };

    return (
        <UserLayout>
            <main>
                <article>
                    <section
                        className={`${styles.section} ${styles["login-register"]}`}
                    >
                        <div className={styles.container}>
                            <div className={styles.wrapper} ref={wrapperRef}>
                                <div
                                    className={`${styles["form-box"]} ${styles.login}`}
                                >
                                    <h2>Login</h2>
                                    <form onSubmit={handleLoginSubmit}>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i
                                                    className={`${styles.bx} ${styles["bxs-envelope"]}`}
                                                ></i>
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                value={loginData.email}
                                                onChange={handleLoginChange}
                                                required
                                            />
                                            <label>Email</label>
                                            {loginErrors.email && (
                                                <p className="error">
                                                    {loginErrors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i
                                                    className={`${styles.bx} ${styles["bxs-lock-alt"]}`}
                                                ></i>
                                            </span>
                                            <input
                                                type="password"
                                                name="password"
                                                value={loginData.password}
                                                onChange={handleLoginChange}
                                                required
                                            />
                                            <label>Password</label>
                                            {loginErrors.password && (
                                                <p className="error">
                                                    {loginErrors.password}
                                                </p>
                                            )}
                                        </div>
                                        <div
                                            className={
                                                styles["remember-forgot"]
                                            }
                                        >
                                            <label>
                                                <input type="checkbox" />{" "}
                                                Remember me
                                            </label>
                                            <a href="#">Forgot Password?</a>
                                        </div>
                                        <button
                                            type="submit"
                                            className={styles["btn-login"]}
                                        >
                                            Login
                                        </button>
                                        <div
                                            className={styles["login-register"]}
                                        >
                                            <p>
                                                Don't have an account?
                                                <a
                                                    href="#"
                                                    className={
                                                        styles["register-link"]
                                                    }
                                                    ref={registerLinkRef}
                                                >
                                                    Register
                                                </a>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                                <div
                                    className={`${styles["form-box"]} ${styles.register}`}
                                >
                                    <h2>Registration</h2>
                                    <form onSubmit={handleRegisterSubmit}>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i
                                                    className={`${styles.bx} ${styles["bxs-user"]}`}
                                                ></i>
                                            </span>
                                            <input
                                                type="text"
                                                name="username"
                                                value={registerData.username}
                                                onChange={handleRegisterChange}
                                                required
                                            />
                                            <label>Username</label>
                                            {registerErrors.username && (
                                                <p className="error">
                                                    {registerErrors.username}
                                                </p>
                                            )}
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i
                                                    className={`${styles.bx} ${styles["bxs-envelope"]}`}
                                                ></i>
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                value={registerData.email}
                                                onChange={handleRegisterChange}
                                                required
                                            />
                                            <label>Email</label>
                                            {registerErrors.email && (
                                                <p className="error">
                                                    {registerErrors.email}
                                                </p>
                                            )}
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <i
                                                    className={`${styles.bx} ${styles["bxs-lock-alt"]}`}
                                                ></i>
                                            </span>
                                            <input
                                                type="password"
                                                name="password"
                                                value={registerData.password}
                                                onChange={handleRegisterChange}
                                                required
                                            />
                                            <label>Password</label>
                                            {registerErrors.password && (
                                                <p className="error">
                                                    {registerErrors.password}
                                                </p>
                                            )}
                                        </div>
                                        <div
                                            className={
                                                styles["remember-forgot"]
                                            }
                                        >
                                            <label>
                                                <input type="checkbox" /> I
                                                agree to the terms & conditions
                                            </label>
                                        </div>
                                        <button
                                            type="submit"
                                            className={styles["btn-register"]}
                                        >
                                            Register
                                        </button>
                                        <div
                                            className={styles["login-register"]}
                                        >
                                            <p>
                                                Already have an account?
                                                <a
                                                    href="#"
                                                    className={
                                                        styles["login-link"]
                                                    }
                                                    ref={loginLinkRef}
                                                >
                                                    Login
                                                </a>
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
