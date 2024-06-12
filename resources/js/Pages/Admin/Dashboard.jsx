import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col, Card } from "react-bootstrap";
// import PropTypes from "prop-types";
import styles from "../../../css/Admin/Dashboard.module.css";
import { useState, useEffect, useRef } from "react";

export default function Dashboard({
    totalUserMale,
    totalUserFemale,
    ulasans,
    totalBooking,
}) {
    const [averageRating, setAverageRating] = useState(0);
    const textRefs = useRef([]);

    // Calculate average rating
    useEffect(() => {
        const totalRating = ulasans.reduce(
            (acc, ulasan) => acc + parseInt(ulasan.rating),
            0
        );
        const avgRating = totalRating / ulasans.length;
        setAverageRating(avgRating);
    }, [ulasans]);

    const [isMultilineText, setIsMultilineText] = useState([]);

    // Check if text is multiline
    useEffect(() => {
        const checkMultiline = () => {
            const results = textRefs.current.map((ref) => {
                if (ref) {
                    const element = ref;
                    const initialHeight = element.offsetHeight;
                    element.style.whiteSpace = "nowrap"; // Temporarily set to nowrap to measure original height
                    const newHeight = element.scrollHeight;
                    element.style.whiteSpace = ""; // Reset to default
                    return newHeight > initialHeight;
                }
                return false;
            });
            setIsMultilineText(results);
        };
        checkMultiline();
    }, [averageRating, totalUserMale, totalUserFemale, totalBooking]);

    const cardData = [
        {
            background: "#f28c85",
            title: averageRating ? averageRating.toFixed(2) : "0",
            text: "Rating Pengguna",
            icon: (
                <box-icon
                    type="solid"
                    name="star"
                    color="#fffafa"
                    size="3.5rem"
                ></box-icon>
            ),
        },
        {
            background: "#8597f2",
            title: totalUserMale,
            text: "Total Pengguna Laki-laki",
            icon: (
                <box-icon
                    name="male-sign"
                    color="#fffafa"
                    size="3.5rem"
                ></box-icon>
            ),
        },
        {
            background: "#f285ba",
            title: totalUserFemale,
            text: "Total Pengguna Perempuan",
            icon: (
                <box-icon
                    name="female-sign"
                    color="#fffafa"
                    size="3.5rem"
                ></box-icon>
            ),
        },
        {
            background: "#f16211",
            title: totalBooking,
            text: "Total Booking",
            icon: (
                <box-icon
                    name="report"
                    type="solid"
                    color="#fffafa"
                    size="3.5rem"
                ></box-icon>
            ),
        },
    ];

    return (
        <AdminLayout title="Dashboard">
            <h1 className={styles["title-content"]}>Statistik Website</h1>
            <Row className="mb-3">
                {cardData.map((data, index) => (
                    <Col key={index} md={3}>
                        <Card
                            className="h-100 border-0"
                            style={{
                                background: data.background,
                                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                            }}
                        >
                            <Card.Body className="text-white d-flex justify-content-between align-items-start">
                                <div>
                                    <Card.Title className="mb-0 fw-bold fs-4">
                                        <span
                                            ref={(el) =>
                                                (textRefs.current[index] = el)
                                            }
                                        >
                                            {data.title}
                                        </span>
                                    </Card.Title>
                                    <Card.Text
                                        className={styles["card-text"]}
                                        style={{
                                            marginTop: isMultilineText[index]
                                                ? "auto"
                                                : "10px",
                                        }}
                                    >
                                        {data.text}
                                    </Card.Text>
                                </div>
                                {data.icon}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </AdminLayout>
    );
}
