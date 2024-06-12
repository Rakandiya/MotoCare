import "../../css/Admin/AdminGlobal.css";
import styles from "../../css/Admin/layoutStyles.module.css";
import PropTypes from "prop-types";
import { NavLink } from "@/Components/NavbarLink";
import { route } from "ziggy-js";
// import logo from "../assets/images/logo.png";
// import { useLocation } from "react-router-dom";
import { useForm, router } from "@inertiajs/react";

export default function AdminLayout({ title, children }) {
    // const location = useLocation();

    const routeList = [
        { path: "admin.dashboard", label: "Dashboard", subPaths: [] },
        {
            path: "admin.user.index",
            label: "Manajemen User",
            subPaths: [
                "admin.user.create",
                "admin.user.edit",
                "admin.user.show",
            ],
        },
        {
            path: "admin.booking.index",
            label: "Manajemen Booking",
            subPaths: [
                "admin.booking.create",
                "admin.booking.edit",
                "admin.booking.show",
                "admin.booking.createInvoice",
            ],
        },
        {
            path: "admin.katalog.index",
            label: "Manajemen Katalog",
            subPaths: [],
        },
        {
            path: "admin.tutorial.index",
            label: "Manajemen Tutorial",
            subPaths: [],
        },
        {
            path: "admin.ulasan.index",
            label: "Ulasan Pengguna",
            subPaths: [],
        },
        {
            path: "admin.produk.index",
            label: "Manajemen Produk",
            subPaths: [],
        },
        {
            path: "admin.jenisLayanan.index",
            label: "Manajemen Jenis Layanan",
            subPaths: [],
        },
        {
            path: "auth.logout",
            label: "Log Out",
            className: "logout",
            isLogout: true,
            subPaths: [],
        },
    ];

    const { data, setData, post, processing, errors, reset } = useForm();

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

    const isActive = (r) => {
        const matchExact = !!route().current(r.path); // Memastikan hasilnya adalah boolean
        const matchSubPaths = r.subPaths.some(
            (subPath) => !!route().current(subPath)
        ); // Memastikan hasilnya adalah boolean
        return matchExact || matchSubPaths;
    };

    return (
        <div className={styles["container"]}>
            <nav className={styles["nav-admin"]}>
                <img
                    className={styles["logoImg"]}
                    src="/images/logo.png"
                    alt="Logo"
                />
                <ul className={styles["nav-admin-ul"]}>
                    {routeList.map((routeData, index) => (
                        <li key={index} className={styles["nav-admin-ul-li"]}>
                            {routeData.isLogout ? (
                                <form onSubmit={handleLogout}>
                                    <button
                                        type="submit"
                                        className={styles["logout"]}
                                        isLogout={routeData.isLogout || true}
                                        isActive={isActive(routeData)}
                                    >
                                        <div className={styles["logout-text"]}>
                                            {routeData.label}{" "}
                                            <box-icon
                                                name="log-out"
                                                color="#fffafa"
                                            ></box-icon>
                                        </div>
                                    </button>
                                </form>
                            ) : (
                                <NavLink
                                    to={
                                        routeData.label !== "Log Out"
                                            ? route(routeData.path)
                                            : "#"
                                    }
                                    className={routeData.className || ""}
                                    isLogout={routeData.isLogout || false}
                                    isActive={isActive(routeData)}
                                >
                                    {routeData.label}
                                </NavLink>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            <section className={styles["content"]}>
                <h1 className={styles["title"]}>{title}</h1>

                <div className={styles["contentWrapper"]}>{children}</div>
            </section>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string.isRequired,
};
