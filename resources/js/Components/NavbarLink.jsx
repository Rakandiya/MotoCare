import { Link } from "@inertiajs/react";
import PropTypes from "prop-types";
import "../../css/Admin/navLink.css";

export const NavLink = ({
    to,
    isActive = false,
    isLogout = false,
    children,
}) => {
    return (
        <Link href={to} className={"navLink" + (isActive ? " active" : "")}>
            <span className="navItem">{children}</span>
        </Link>
    );
};

NavLink.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    isActive: PropTypes.bool,
    isLogout: PropTypes.bool,
};
