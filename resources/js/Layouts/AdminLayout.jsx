import "../../css/Admin/AdminGlobal.css";
import styles from "../../css/Admin/layoutStyles.module.css";
import PropTypes from "prop-types";
import { NavLink } from "@/Components/NavbarLink";
// import logo from "../assets/images/logo.png";
// import { useLocation } from "react-router-dom";

export default function AdminLayout({ title, children }) {
    // const location = useLocation();

    const routes = [
        { path: "/admin", label: "Dashboard", subPaths: [] },
        {
            path: "/admin/manajemen-pengguna",
            label: "Manajemen Pengguna",
            subPaths: [
                "/admin/tambah-pengguna",
                "/admin/edit-pengguna",
                "/admin/detail-pengguna",
            ],
        },
        {
            path: "/admin/manajemen-booking",
            label: "Manajemen Booking",
            subPaths: [
                "/admin/tambah-booking",
                "/admin/edit-booking",
                "/admin/detail-booking",
            ],
        },
        {
            path: "/admin/manajemen-katalog",
            label: "Manajemen Katalog",
            subPaths: [],
        },
        {
            path: "/admin/manajemen-tutorial",
            label: "Manajemen Tutorial",
            subPaths: [],
        },
        {
            path: "/admin/ulasan",
            label: "Ulasan Pengguna",
            subPaths: [],
        },
        {
            path: "#",
            label: "Log Out",
            className: "logout",
            isLogout: true,
            subPaths: [],
        },
        {
            path: "#",
            label: "Log Out",
            className: "logout",
            isLogout: true,
            subPaths: [],
        },
        {
            path: "#",
            label: "Log Out",
            className: "logout",
            isLogout: true,
            subPaths: [],
        },
    ];

    const isActive = (route) => {
        const matchExact = location.pathname === route.path;
        const matchSubPaths = route.subPaths.some((subPath) =>
            location.pathname.startsWith(subPath)
        );
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
                    {routes.map((route, index) => (
                        <li key={index} className={styles["nav-admin-ul-li"]}>
                            <NavLink
                                to={route.path}
                                className={route.className || ""}
                                isLogout={route.isLogout || false}
                                isActive={isActive(route)}
                            >
                                {route.label}
                            </NavLink>
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
