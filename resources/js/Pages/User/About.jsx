import styles from "../../../css/User/About.module.css";
import UserLayout from "@/Layouts/UserLayout";

export default function About({ auth }) {
    return (
        <UserLayout auth={auth}>
            <section
                className={`${styles["section"]} ${styles["about"]} ${styles["has-before"]}`}
                aria-labelledby="about-label"
            >
                <div className={`${styles["container"]}`}>
                    <figure className={`${styles["about-banner"]}`}>
                        <img
                            src="/images/about-banner.png"
                            width="540"
                            height="540"
                            loading="lazy"
                            alt="vehicle repire equipments"
                            className={`${styles["w-100"]}`}
                        />
                    </figure>

                    <div className={`${styles["about-content"]}`}>
                        <p className={`${styles["section-subtitle"]}`}>
                            Tentang Kami
                        </p>

                        <h2
                            className={`${styles["h2"]}`}
                            style={{
                                color: "white",
                            }}
                        >
                            Kami menawarkan kualitas pelayanan terbaik
                        </h2>

                        <p className={`${styles["section-text"]}`}>
                            Di MotoCare, kami mengerti bahwa motor lebih dari
                            sekedar alat transportasi, motor adalah passion,
                            gaya hidup, dan terkadang, seorang teman setia.
                            Didirikan dengan visi untuk mengubah cara pemilik
                            motor merawat kendaraan mereka, MotoCare adalah
                            solusi digital all-in-one untuk semua kebutuhan
                            perawatan motor Anda.
                        </p>

                        <ul className={`${styles["about-list"]}`}>
                            <li className={`${styles["about-item"]}`}>
                                <p>
                                    <strong
                                        className={`${styles["display-1"]} ${styles["strong"]}`}
                                    >
                                        500+
                                    </strong>{" "}
                                    Pengguna
                                </p>
                            </li>

                            <li className={`${styles["about-item"]}`}>
                                <p>
                                    <strong
                                        className={`${styles["display-1"]} ${styles["strong"]}`}
                                    >
                                        4
                                    </strong>{" "}
                                    Mekanik Andal
                                </p>
                            </li>

                            <li className={`${styles["about-item"]}`}>
                                <p>
                                    <strong
                                        className={`${styles["display-1"]} ${styles["strong"]}`}
                                    >
                                        5+
                                    </strong>{" "}
                                    Tahun Berdiri
                                </p>
                            </li>

                            <li className={`${styles["about-item"]}`}>
                                <p>
                                    <strong
                                        className={`${styles["display-1"]} ${styles["strong"]}`}
                                    >
                                        99%
                                    </strong>{" "}
                                    Proyek Diselesaikan
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="section work" aria-labelledby="work-label">
                <div className={`${styles["container"]}`}>
                    <p
                        className={`${styles["section-subtitle"]} ${styles["light"]}`}
                        style={{
                            color: "white",
                        }}
                        id="work-label"
                    >
                        OUR TEAM
                    </p>

                    <h2
                        className={`${styles["h2"]} ${styles["section-title"]}`}
                        style={{
                            color: "white",
                        }}
                    >
                        MOTOCARE WORKER
                    </h2>

                    <ul className={`${styles["has-scrollbar"]}`}>
                        <li className={`${styles["scrollbar-item"]}`}>
                            <div className={`${styles["work-card"]}`}>
                                <figure
                                    className={`${styles["card-banner"]} ${styles["img-holder"]}`}
                                    style={{
                                        width: "350px",
                                        height: "406px",
                                    }}
                                >
                                    <img
                                        src="/images/work-1.png"
                                        width="350"
                                        height="406"
                                        loading="lazy"
                                        alt="Engine Repair"
                                        className={`${styles["img-cover"]}`}
                                    />
                                </figure>

                                <div className={`${styles["card-content"]}`}>
                                    <p className={`${styles["card-subtitle"]}`}>
                                        KETUA
                                    </p>

                                    <h3
                                        className={`${styles["h3"]} ${styles["card-title"]}`}
                                    >
                                        MOCHAMMAD RAKANDIYA
                                    </h3>

                                    <a
                                        href="#"
                                        className={`${styles["card-btn"]}`}
                                    >
                                        <span
                                            className={`${styles["next-icon"]}`}
                                        >
                                            <box-icon
                                                name="right-arrow-alt"
                                                color="white"
                                            ></box-icon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </li>

                        <li className={`${styles["scrollbar-item"]}`}>
                            <div className={`${styles["work-card"]}`}>
                                <figure
                                    className={`${styles["card-banner"]} ${styles["img-holder"]}`}
                                    style={{
                                        width: "350px",
                                        height: "406px",
                                    }}
                                >
                                    <img
                                        src="/images/work-2.png"
                                        width="350"
                                        height="406"
                                        loading="lazy"
                                        alt="Car Tyre change"
                                        className={`${styles["img-cover"]}`}
                                    />
                                </figure>

                                <div className={`${styles["card-content"]}`}>
                                    <p className={`${styles["card-subtitle"]}`}>
                                        ANGGOTA
                                    </p>

                                    <h3
                                        className={`${styles["h3"]} ${styles["card-title"]}`}
                                    >
                                        IVAN JAELANI BESTI
                                    </h3>

                                    <a
                                        href="#"
                                        className={`${styles["card-btn"]}`}
                                    >
                                        <span
                                            className={`${styles["next-icon"]}`}
                                        >
                                            <box-icon
                                                name="right-arrow-alt"
                                                color="white"
                                            ></box-icon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </li>

                        <li className={`${styles["scrollbar-item"]}`}>
                            <div className={`${styles["work-card"]}`}>
                                <figure
                                    className={`${styles["card-banner"]} ${styles["img-holder"]}`}
                                    style={{
                                        width: "350px",
                                        height: "406px",
                                    }}
                                >
                                    <img
                                        src="/images/work-3.png"
                                        width="350"
                                        height="406"
                                        loading="lazy"
                                        alt="Battery Adjust"
                                        className={`${styles["img-cover"]}`}
                                    />
                                </figure>

                                <div className={`${styles["card-content"]}`}>
                                    <p className={`${styles["card-subtitle"]}`}>
                                        ANGGOTA
                                    </p>

                                    <h3
                                        className={`${styles["h3"]} ${styles["card-title"]}`}
                                    >
                                        RIFDAH HANSYA ROFIFAH
                                    </h3>

                                    <a
                                        href="#"
                                        className={`${styles["card-btn"]}`}
                                    >
                                        <span
                                            className={`${styles["next-icon"]}`}
                                        >
                                            <box-icon
                                                name="right-arrow-alt"
                                                color="white"
                                            ></box-icon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </li>

                        <li className={`${styles["scrollbar-item"]}`}>
                            <div className={`${styles["work-card"]}`}>
                                <figure
                                    className={`${styles["card-banner"]} ${styles["img-holder"]}`}
                                    style={{
                                        width: "350px",
                                        height: "406px",
                                    }}
                                >
                                    <img
                                        src="/images/work-4.png"
                                        width="350"
                                        height="406"
                                        loading="lazy"
                                        alt="Car Tyre change"
                                        className={`${styles["img-cover"]}`}
                                    />
                                </figure>

                                <div className={`${styles["card-content"]}`}>
                                    <p className={`${styles["card-subtitle"]}`}>
                                        ANGGOTA
                                    </p>

                                    <h3
                                        className={`${styles["h3"]} ${styles["card-title"]}`}
                                    >
                                        RAIHAN NURAZHAR
                                    </h3>

                                    <a
                                        href="#"
                                        className={`${styles["card-btn"]}`}
                                    >
                                        <span
                                            className={`${styles["next-icon"]}`}
                                        >
                                            <box-icon
                                                name="right-arrow-alt"
                                                color="white"
                                            ></box-icon>
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </section>
        </UserLayout>
    );
}
