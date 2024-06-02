import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

export default function ButtonAdmin({ style, variant, children, ...props }) {
    const baseStyle = {
        backgroundColor: "#f16211",
        border: "none",
        color: "white",
        fontFamily: "Poppins",
        fontWeight: "500",
        fontSize: "15px",
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        // padding: "5px 10px",
    };
    const styleVal = { ...baseStyle, ...style };
    return (
        <Button variant={variant} style={styleVal} {...props}>
            {children}
        </Button>
    );
}

ButtonAdmin.propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    variant: PropTypes.string,
    className: PropTypes.string,
};
