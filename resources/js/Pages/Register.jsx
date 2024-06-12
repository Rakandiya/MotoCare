import React, { useEffect, useRef } from "react";
import UserLayout from "@/Layouts/UserLayout";
import styles from "../../css/Register.module.css";
import { useForm, router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Register({ auth, flash }) {
    const wrapperRef = useRef(null);
    const loginLinkRefFromRegister = useRef(null);
    const loginLinkRefFromForgot = useRef(null);
    const registerLinkRef = useRef(null);
    const forgotLinkRef = useRef(null);

    // console.log(flash);

    useEffect(() => {
        if (auth.user) {
            router.visit(route("user.home"), {
                onSuccess: () => {
                    console.log("User is logged in");
                },
            });
        }
    }, []);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const loginLinkFromRegister = loginLinkRefFromRegister.current;
        const loginLinkFromForgot = loginLinkRefFromForgot.current;
        const registerLink = registerLinkRef.current;
        const forgotLink = forgotLinkRef.current;

        const showLoginFromRegister = () => {
            setLoginData({
                email: "",
                password: "",
            });

            setRegisterData({
                username: "",
                email: "",
                password: "",
                konfirmasi_password: "",
                isAgree: false,
            });

            setForgotData({
                username: "",
                email: "",
            });
            wrapper.classList.remove(styles.activeRegister);
            wrapper.classList.remove(styles.activeForgot);
            wrapper.classList.remove(styles.activeLoginFromForgot);
            wrapper.classList.add(styles.activeLoginFromRegister);
        };

        const showLoginFromForgot = () => {
            setLoginData({
                email: "",
                password: "",
            });

            setRegisterData({
                username: "",
                email: "",
                password: "",
                konfirmasi_password: "",
                isAgree: false,
            });

            setForgotData({
                username: "",
                email: "",
            });
            wrapper.classList.remove(styles.activeRegister);
            wrapper.classList.remove(styles.activeForgot);
            wrapper.classList.remove(styles.activeLoginFromRegister);
            wrapper.classList.add(styles.activeLoginFromForgot);
        };

        const showRegister = () => {
            setLoginData({
                email: "",
                password: "",
            });

            setRegisterData({
                username: "",
                email: "",
                password: "",
                konfirmasi_password: "",
                isAgree: false,
            });

            setForgotData({
                username: "",
                email: "",
            });
            wrapper.classList.remove(styles.activeLoginFromRegister);
            wrapper.classList.remove(styles.activeLoginFromForgot);
            wrapper.classList.remove(styles.activeForgot);
            wrapper.classList.add(styles.activeRegister);
        };

        const showForgot = () => {
            setLoginData({
                email: "",
                password: "",
            });

            setRegisterData({
                username: "",
                email: "",
                password: "",
                konfirmasi_password: "",
                isAgree: false,
            });

            setForgotData({
                username: "",
                email: "",
            });
            wrapper.classList.remove(styles.activeLoginFromRegister);
            wrapper.classList.remove(styles.activeLoginFromForgot);
            wrapper.classList.remove(styles.activeRegister);
            wrapper.classList.add(styles.activeForgot);
        };

        if (
            registerLink &&
            loginLinkFromRegister &&
            loginLinkFromForgot &&
            forgotLink &&
            wrapper
        ) {
            registerLink.addEventListener("click", showRegister);
            loginLinkFromRegister.addEventListener(
                "click",
                showLoginFromRegister
            );
            loginLinkFromForgot.addEventListener("click", showLoginFromForgot);
            forgotLink.addEventListener("click", showForgot);
        }

        showLoginFromRegister();
        return () => {
            if (
                registerLink &&
                loginLinkFromRegister &&
                loginLinkFromForgot &&
                forgotLink
            ) {
                registerLink.removeEventListener("click", showRegister);
                loginLinkFromRegister.removeEventListener(
                    "click",
                    showLoginFromRegister
                );
                loginLinkFromForgot.removeEventListener(
                    "click",
                    showLoginFromForgot
                );
                forgotLink.removeEventListener("click", showForgot);
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
        konfirmasi_password: "",
        isAgree: false,
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

    const {
        data: forgotData,
        setData: setForgotData,
        post: postForgot,
        errors: forgotErrors,
    } = useForm({
        username: "",
        email: "",
    });

    const handleRegisterChange = (e) => {
        setRegisterData(e.target.name, e.target.value);
    };

    const handleRegisterSubmit = (e) => {
        if (!registerData.isAgree) {
            alert("You must agree to the terms & conditions");
            return;
        }
        e.preventDefault();
        postRegister(route("register"));
    };

    const handleForgotSubmit = (e) => {
        e.preventDefault();
        postForgot("/forgot");
    };

    const handleLoginChange = (e) => {
        setLoginData(e.target.name, e.target.value);
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        postLogin("/login");
    };

    useEffect(() => {
        console.log(registerErrors);
    }, [registerErrors]);

    useEffect(() => {
        console.log(loginErrors);
    }, [loginErrors]);

    useEffect(() => {
        console.log(forgotErrors);
    }, [forgotErrors]);

    return (
        <UserLayout auth={auth}>
            <main>
                <article>
                    <section
                        className={`${styles.section} ${styles["login-register"]}`}
                    >
                        <div className={styles.container}>
                            <div className={styles.wrapper} ref={wrapperRef}>
                                <div
                                    className={`${styles["form-box"]} ${styles["login"]}`}
                                >
                                    <h2>Login</h2>
                                    {loginErrors.error && (
                                        <h3
                                            style={{
                                                color: "white",
                                                backgroundColor: "red",
                                                padding: "10px",
                                                marginTop: "10px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            {loginErrors.error}
                                        </h3>
                                    )}

                                    {/* {flash.success && (
                                        <h3
                                            style={{
                                                color: "white",
                                                backgroundColor: "green",
                                                padding: "10px",
                                                marginTop: "10px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            {flash.success}
                                        </h3>
                                    )} */}
                                    <form onSubmit={handleLoginSubmit}>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <box-icon
                                                    name="envelope"
                                                    type="solid"
                                                    color="#f16211"
                                                ></box-icon>
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
                                                <small
                                                    className={styles["error"]}
                                                    style={{ color: "red" }}
                                                >
                                                    {loginErrors.email}
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
                                                name="password"
                                                value={loginData.password}
                                                onChange={handleLoginChange}
                                                required
                                            />
                                            <label>Password</label>
                                            {loginErrors.password && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{ color: "red" }}
                                                >
                                                    {loginErrors.password}
                                                </small>
                                            )}
                                        </div>
                                        <div
                                            className={
                                                styles["remember-forgot"]
                                            }
                                            style={{ marginTop: "10px" }}
                                        >
                                            <label>
                                                <input type="checkbox" />{" "}
                                                Remember me
                                            </label>
                                            <a href="#" ref={forgotLinkRef}>
                                                Forgot Password?
                                            </a>
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
                                    className={`${styles["form-box"]} ${styles["register"]}`}
                                >
                                    <h2>Registration</h2>
                                    <form onSubmit={handleRegisterSubmit}>
                                        <div
                                            className={styles["input-box"]}
                                            style={{ marginBottom: "10px" }}
                                        >
                                            <span className={styles.icon}>
                                                <box-icon
                                                    type="solid"
                                                    name="user"
                                                    color="#f16211"
                                                ></box-icon>
                                            </span>
                                            <input
                                                type="text"
                                                name="username"
                                                value={registerData.username}
                                                onChange={handleRegisterChange}
                                                required
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <label>Username</label>
                                            {registerErrors.username && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{
                                                        color: "red",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {registerErrors.username}
                                                </small>
                                            )}
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <box-icon
                                                    name="envelope"
                                                    type="solid"
                                                    color="#f16211"
                                                ></box-icon>
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                value={registerData.email}
                                                onChange={handleRegisterChange}
                                                required
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <label>Email</label>
                                            {registerErrors.email && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{
                                                        color: "red",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {registerErrors.email}
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
                                                name="password"
                                                value={registerData.password}
                                                onChange={handleRegisterChange}
                                                required
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <label>Password</label>
                                            {registerErrors.password && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{
                                                        color: "red",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {registerErrors.password}
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
                                                value={
                                                    registerData.konfirmasi_password
                                                }
                                                onChange={handleRegisterChange}
                                                required
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <label>Konfirmasi Password</label>
                                            {registerErrors.konfirmasi_password && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{
                                                        color: "red",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {
                                                        registerErrors.konfirmasi_password
                                                    }
                                                </small>
                                            )}
                                        </div>
                                        <div
                                            className={
                                                styles["remember-forgot"]
                                            }
                                            style={{ marginTop: "10px" }}
                                        >
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    name="isAgree"
                                                    checked={
                                                        registerData.isAgree
                                                    }
                                                    onChange={(e) =>
                                                        setRegisterData(
                                                            "isAgree",
                                                            e.target.checked
                                                        )
                                                    }
                                                    required
                                                />{" "}
                                                I agree to the terms &
                                                conditions
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
                                                Remember your password?
                                                <a
                                                    href="#"
                                                    className={
                                                        styles["login-link"]
                                                    }
                                                    ref={
                                                        loginLinkRefFromRegister
                                                    }
                                                >
                                                    Login
                                                </a>
                                            </p>
                                        </div>
                                    </form>
                                </div>

                                <div
                                    className={`${styles["form-box"]} ${styles["forgot"]}`}
                                >
                                    <h2>Forgot Password</h2>
                                    {forgotErrors.user && (
                                        <h3
                                            style={{
                                                color: "white",
                                                backgroundColor: "red",
                                                padding: "10px",
                                                marginTop: "10px",
                                                borderRadius: "5px",
                                            }}
                                        >
                                            {forgotErrors.user}
                                        </h3>
                                    )}
                                    <form onSubmit={handleForgotSubmit}>
                                        <div
                                            className={styles["input-box"]}
                                            style={{ marginBottom: "10px" }}
                                        >
                                            <span className={styles.icon}>
                                                <box-icon
                                                    type="solid"
                                                    name="user"
                                                    color="#f16211"
                                                ></box-icon>
                                            </span>
                                            <input
                                                type="text"
                                                name="username"
                                                value={forgotData.username}
                                                onChange={(e) =>
                                                    setForgotData(
                                                        e.target.name,
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <label>Username</label>
                                            {forgotErrors.username && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{
                                                        color: "red",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {forgotErrors.username}
                                                </small>
                                            )}
                                        </div>
                                        <div className={styles["input-box"]}>
                                            <span className={styles.icon}>
                                                <box-icon
                                                    name="envelope"
                                                    type="solid"
                                                    color="#f16211"
                                                ></box-icon>
                                            </span>
                                            <input
                                                type="email"
                                                name="email"
                                                value={forgotData.email}
                                                onChange={(e) =>
                                                    setForgotData(
                                                        e.target.name,
                                                        e.target.value
                                                    )
                                                }
                                                required
                                                style={{ marginBottom: "10px" }}
                                            />
                                            <label>Email</label>
                                            {forgotErrors.email && (
                                                <small
                                                    className={styles["error"]}
                                                    style={{
                                                        color: "red",
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    {forgotErrors.email}
                                                </small>
                                            )}
                                        </div>

                                        <button
                                            type="submit"
                                            className={styles["btn-register"]}
                                        >
                                            Submit
                                        </button>
                                        <div
                                            className={styles["login-register"]}
                                        >
                                            <p>
                                                Remember your password?
                                                <a
                                                    href="#"
                                                    className={
                                                        styles["login-link"]
                                                    }
                                                    ref={loginLinkRefFromForgot}
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
