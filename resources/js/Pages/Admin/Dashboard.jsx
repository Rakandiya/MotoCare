import AdminLayout from "@/Layouts/AdminLayout";
import { Row, Col, Card } from "react-bootstrap";
// import PropTypes from "prop-types";
import styles from "../../../css/Admin/Dashboard.module.css";

export default function Dashboard() {
    const cardData = [
        {
            background: "#f28c85",
            title: "1000",
            text: "Total Pengguna",
            icon: (
                <box-icon
                    type="solid"
                    name="user-plus"
                    color="#fffafa"
                    size="3.5rem"
                ></box-icon>
            ),
        },
        {
            background: "#8597f2",
            title: "1000",
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
            title: "1000",
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
            title: "1000",
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
                                        {data.title}
                                    </Card.Title>
                                    <Card.Text className={styles["card-text"]}>
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
