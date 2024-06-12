import PropTypes from "prop-types";
import "../../css/User/userGlobal.css";
import styles from "../../css/User/LayoutStyles.module.css";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { useEffect } from "react";

export default function UserLayout({ auth, children }) {
    useEffect(() => {
        const navbar = document.querySelector("[data-navbar]");
        const navToggler = document.querySelector("[data-nav-toggler]");

        navToggler.addEventListener("click", function () {
            navbar.classList.toggle("active");
            this.classList.toggle("active");
        });

        // Clean up event listener on component unmount
        return () => {
            navToggler.removeEventListener("click", function () {
                navbar.classList.toggle("active");
                this.classList.toggle("active");
            });
        };
    }, []);

    const navItems = [
        {
            path: "user.home",
            label: "Home",
            external: false,
        },
        {
            path: "user.about",
            label: "Tentang Kami",
            external: false,
        },
        {
            path: "user.booking",
            label: "Booking",
            external: false,
        },

        { path: "user.katalog", label: "Katalog", external: false },

        { path: "user.tutorial", label: "Tutorial", external: false },
        {
            path: "user.riwayat",
            label: "Riwayat Servis",
            external: false,
        },
        { path: "user.ulasan", label: "Ulasan", external: false },
        { path: "user.FaQ", label: "FaQ", external: false },
    ];

    const handleLogout = (e) => {
        e.preventDefault();
        router.visit(
            route("logout"),
            {
                method: "POST",
                headers: {
                    "Content-type": "Application/json",
                },
            },
            { preserveScroll: true }
        );
    };

    return (
        <>
            <header className={styles["header"]}>
                <div className={styles["container"]}>
                    <a href="../user/home" className={styles["logo"]}>
                        <img
                            src="/images/logo.png"
                            width="128"
                            height="63"
                            alt="autofix home"
                        />
                    </a>

                    <nav className={styles["navbar"]} data-navbar>
                        <ul className={styles["navbar-list"]}>
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    {item.external ? (
                                        <Link
                                            href={item.url}
                                            className={styles["navbar-link"]}
                                        >
                                            {item.label}
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route(item.path)}
                                            className={styles["navbar-link"]}
                                        >
                                            {item.label}
                                            {route().current(item.path) && (
                                                <div
                                                    className={
                                                        styles["active-navbar"]
                                                    }
                                                ></div>
                                            )}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {auth && !auth.user ? (
                        <Link href="/" className={styles["button-login"]}>
                            <span className="span">SIGN IN / SIGN UP</span>

                            <box-icon
                                name="right-arrow-alt"
                                color="#ffffff"
                            ></box-icon>
                        </Link>
                    ) : route().current("user.tambah-profil") ? (
                        <form onSubmit={handleLogout}>
                            <button type="submit" className={styles["logout"]}>
                                <div className={styles["logout-text"]}>
                                    {"Log Out"}{" "}
                                    <box-icon
                                        name="log-out"
                                        color="#fffafa"
                                    ></box-icon>
                                </div>
                            </button>
                        </form>
                    ) : (
                        <Link
                            href={route("user.tambah-profil", {
                                id: auth.user.id,
                            })}
                            className={styles["button-login"]}
                        >
                            <span className="span">Profile</span>
                            <box-icon
                                name="right-arrow-alt"
                                color="#ffffff"
                            ></box-icon>
                        </Link>
                    )}

                    <button
                        className={styles["nav-toggle-btn"]}
                        aria-label="toggle menu"
                        data-nav-toggler
                    >
                        <span className={styles["nav-toggle-icon"]}></span>
                        <span className={styles["nav-toggle-icon"]}></span>
                        <span className={styles["nav-toggle-icon"]}></span>
                    </button>
                </div>
            </header>

            <main>
                <article>
                    <section>{children}</section>
                </article>
            </main>

            <footer className={styles["footer"]}>
                <div className={styles["footer-top"]}>
                    <div className={styles["container"]}>
                        <div className={styles["footer-brand"]}>
                            <a href="#" className={styles["logo"]}>
                                <img
                                    src="/images/logo.png"
                                    width="128"
                                    height="63"
                                    alt="autofix home"
                                />
                            </a>

                            <p className={styles["footer-text"]}>
                                Ikuti kami di sosial media untuk berita terbaru
                                dan penawaran eksklusif dari MotoCare.
                            </p>

                            <ul className={styles["social-list"]}>
                                <li>
                                    <a
                                        href="#"
                                        className={styles["social-link"]}
                                    >
                                        <img
                                            src="/images/facebook.svg"
                                            alt="facebook"
                                        />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className={styles["social-link"]}
                                    >
                                        <img
                                            src="/images/instagram.svg"
                                            alt="instagram"
                                        />
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="#"
                                        className={styles["social-link"]}
                                    >
                                        <img
                                            src="/images/twitter.svg"
                                            alt="twitter"
                                        />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <ul className={styles["footer-list"]}>
                            <li>
                                <p className="h3">Jam Buka</p>
                            </li>

                            <li>
                                <p className="p">Senin – Kamis</p>

                                <span className="span">08.00 – 21.00</span>
                            </li>

                            <li>
                                <p className="p">Jumat</p>

                                <span className="span">13.30 – 23.00</span>
                            </li>

                            <li>
                                <p className="p">Sabtu – Minggu</p>

                                <span className="span">08.00 – 23.00</span>
                            </li>
                        </ul>

                        <ul className={styles["footer-list"]}>
                            <li>
                                <p className="h3">Info Kontak</p>
                            </li>

                            <li>
                                <a
                                    href="tel:+01234567890"
                                    className={styles["footer-link"]}
                                >
                                    <box-icon
                                        name="phone"
                                        color="#f16211"
                                    ></box-icon>

                                    <span className="span">
                                        +62 2 3456 7890
                                    </span>
                                </a>
                            </li>

                            <li>
                                <a
                                    href="mailto:info@autofix.com"
                                    className={styles["footer-link"]}
                                >
                                    <box-icon
                                        name="envelope"
                                        color="#f16211"
                                    ></box-icon>

                                    <span className="span">
                                        info@motocare.com
                                    </span>
                                </a>
                            </li>

                            <li>
                                <address
                                    className={
                                        styles["footer-link"] +
                                        " " +
                                        styles["address"]
                                    }
                                >
                                    <box-icon
                                        name="map"
                                        type="solid"
                                        color="#f16211"
                                    ></box-icon>

                                    <span className="span">
                                        22 CibUWU Street Bandung, 3100,
                                        Indonesia
                                    </span>
                                </address>
                            </li>
                        </ul>
                    </div>

                    <img
                        src="/images/footer-shape-3.png"
                        width="637"
                        height="173"
                        loading="lazy"
                        alt="Shape"
                        className={
                            styles["shape-3"] +
                            " " +
                            styles["move-anim"] +
                            " " +
                            styles["shape"]
                        }
                    />
                </div>

                <div className={styles["footer-bottom"]}>
                    <div className={styles["container"]}>
                        <p className={styles["copyright"]}>
                            Copyright 2024, motocare All Rights Reserved.
                        </p>

                        <img
                            src="/images/footer-shape-2.png"
                            width="778"
                            height="335"
                            loading="lazy"
                            alt="Shape"
                            className={
                                styles["shape-2"] + " " + styles["shape"]
                            }
                        />

                        <img
                            src="/images/footer-shape-1.png"
                            width="805"
                            height="652"
                            loading="lazy"
                            alt="Red Car"
                            className={
                                styles["shape-1"] +
                                " " +
                                styles["move-anim"] +
                                " " +
                                styles["shape"]
                            }
                        />
                    </div>
                </div>
            </footer>
        </>
    );
}

UserLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
