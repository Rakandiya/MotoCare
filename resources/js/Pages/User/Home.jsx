import React from 'react';
import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Home.module.css";

const HeroSection = () => {
    return (
        <UserLayout>
            <section>
                <div className="container">
                    <div className={styles.heroContent}>
                        <p className={`${styles.sectionSubtitle} :dark`}>Dengan Mekanik Berpengalaman</p>

                        <h1 className={`${styles.h1} ${styles.sectionTitle}`}>Motocare</h1>

                        <p className={styles.sectionText}>
                            Di MotoCare, kami memastikan setiap perjalanan Anda lancar dan
                            setiap motor terawat dengan baik. Platform digital kami
                            menyediakan semua yang Anda butuhkan untuk perawatan motor tanpa
                            repot.
                        </p>

                        <a href="../booking/index.html" className={styles.btn}>
                            <span className="span">Booking Sekarang</span>
                        </a>
                    </div>

                    <figure className={styles.heroBanner} style={{ width: "1228px", height: "789px" }}>
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
        </UserLayout>
    );
};

export default HeroSection;
