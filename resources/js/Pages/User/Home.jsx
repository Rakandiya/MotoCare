import React from "react";
import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Home.module.css";

const HeroSection = ({ auth, results }) => {
    console.log(auth);
    return (
        <UserLayout auth={auth}>
            <section>
                <div className="container">
                    <div className={styles.heroContent}>
                        <p className={`${styles.sectionSubtitle} :dark`}>
                            Dengan Mekanik Berpengalaman
                        </p>

                        <h1 className={`${styles.h1} ${styles.sectionTitle}`}>
                            Motocare
                        </h1>

                        <p className={styles.sectionText}>
                            Di MotoCare, kami memastikan setiap perjalanan Anda
                            lancar dan setiap motor terawat dengan baik.
                            Platform digital kami menyediakan semua yang Anda
                            butuhkan untuk perawatan motor tanpa repot.
                        </p>

                        <a href="../booking/index.html" className={styles.btn}>
                            <span className="span">Booking Sekarang</span>
                        </a>
                    </div>

                    <figure
                        className={styles.heroBanner}
                        style={{ width: "1228px", height: "789px" }}
                    >
                        <img
                            src="/images/hero-vehicle.png"
                            width="1228"
                            height="789"
                            alt="red motor vehicle"
                            className="move-anim"
                        />
                    </figure>
                </div>
            </section>

            <section
                className="section work"
                style={{ padding: "0 0 50px" }}
                aria-labelledby="work-label"
            >
                <div className={`${styles["container"]}`}>
                    {/* <p
                        className={`${styles["section-subtitle"]} ${styles["light"]}`}
                        style={{
                            color: "white",
                        }}
                        id="work-label"
                    >
                        TOTAL
                    </p> */}

                    <h2
                        className={`${styles["h2"]} ${styles["section-title"]}`}
                        style={{
                            color: "white",
                        }}
                    >
                        Customer Teratas
                    </h2>

                    <ul className={`${styles["has-scrollbar"]}`}>
                        {results.map((result) => (
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
                                            src={
                                                result.foto
                                                    ? "/storage/" + result.foto
                                                    : "/images/user.jpeg"
                                            }
                                            width="350"
                                            height="406"
                                            loading="lazy"
                                            alt="Engine Repair"
                                            className={`${styles["img-cover"]}`}
                                        />
                                    </figure>

                                    <div
                                        className={`${styles["card-content"]}`}
                                    >
                                        <p
                                            className={`${styles["card-subtitle"]}`}
                                        >
                                            Jumlah Booking{" "}
                                            {result.total_booking}
                                        </p>

                                        <h3
                                            className={`${styles["h3"]} ${styles["card-title"]}`}
                                        >
                                            {result.nama}
                                        </h3>

                                        <a
                                            href="#"
                                            className={`${styles["card-btn"]}`}
                                        >
                                            <span
                                                className={`${styles["next-icon"]}`}
                                            >
                                                {result.rank}
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </UserLayout>
    );
};

export default HeroSection;
