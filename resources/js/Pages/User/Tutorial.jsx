import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Tutorial.module.css";
import { Row, Col, Button, Card } from "react-bootstrap";
import { useState, useEffect, useForm } from "react";
import { router } from "@inertiajs/react";
import { route } from "ziggy-js";

export default function Tutorial({ auth, tutorials }) {
    const [tutorialData, setTutorials] = useState(tutorials);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [tutorialsPerPage, setTutorialsPerPage] = useState(12);

    const indexOfLastTutorial = currentPage * tutorialsPerPage;
    const indexOfFirstTutorial = indexOfLastTutorial - tutorialsPerPage;
    const currentTutorials = tutorialData.slice(
        indexOfFirstTutorial,
        indexOfLastTutorial
    );

    console.log(tutorials);

    const totalPages = Math.ceil(tutorialData.length / tutorialsPerPage);

    const goToFirstPage = () => {
        setCurrentPage(1);
        window.scrollTo(0, 0);
    };

    const goToLastPage = () => {
        setCurrentPage(totalPages);
        window.scrollTo(0, 0);
    };

    const goToNextPage = () => {
        setCurrentPage((prev) => {
            if (prev < totalPages) {
                window.scrollTo(0, 0);
                return prev + 1;
            }
            return prev;
        });
    };

    const goToPreviousPage = () => {
        setCurrentPage((prev) => {
            if (prev > 1) {
                window.scrollTo(0, 0);
                return prev - 1;
            }
            return prev;
        });
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 0);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (search) {
            router.visit(route("user.tutorial.search"), {
                method: "get",
                data: {
                    search,
                },
                headers: {
                    "Content-type": "Application/json",
                },
                onSuccess: (data) => {
                    setTutorials(data);
                },
                onError: (error) => {
                    console.error("Error fetching search results:", error);
                },
            });
        }
    };

    useEffect(() => {
        setTutorials(tutorials);
    }, [search]);

    return (
        <UserLayout auth={auth}>
            <div className={styles["container"]}>
                <section className={styles["content"]}>
                    <h1 className={styles["title"]}>TUTORIAL</h1>
                    <div className={styles["search"]}>
                        <form
                            onSubmit={handleSearch}
                            method="get"
                            className={styles["search-form"]}
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                id="search"
                                onChange={(e) => setSearch(e.target.value)}
                                className={styles["search-input"]}
                            />
                            <Button
                                type="submit"
                                value="search"
                                id="btn-search"
                                title="Search"
                                className={styles["search-button"]}
                            >
                                <box-icon
                                    name="search"
                                    color="#ffffff"
                                ></box-icon>
                            </Button>
                        </form>
                    </div>
                    <Row className={styles["card-container"]}>
                        {currentTutorials.map((tutorial) => (
                            <Col
                                md={3}
                                key={tutorial.id}
                                style={{ marginBottom: "20px" }}
                            >
                                <Card
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                    }}
                                >
                                    <Card.Header
                                        style={{ padding: 0 }}
                                        className={styles["card-header"]}
                                    >
                                        <iframe
                                            src={tutorial.link}
                                            title={tutorial.judul}
                                            frameBorder={0}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            referrerPolicy="strict-origin-when-cross-origin"
                                            width="100%"
                                            className={styles["video"]}
                                        ></iframe>
                                    </Card.Header>
                                    <Card.Body className={styles["card-body"]}>
                                        <Card.Title
                                            className={styles["card-title"]}
                                        >
                                            {tutorial.judul}
                                        </Card.Title>
                                        <Card.Text
                                            className={styles["card-text"]}
                                        >
                                            {tutorial.deskripsi}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </section>
            </div>

            <div className={styles["pagination-container"]}>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToFirstPage();
                    }}
                    className={styles["page-item"]}
                >
                    <span className={styles["page-link"]}>&lt;&lt;</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToPreviousPage();
                    }}
                    className={styles["page-item"]}
                >
                    <span className={styles["page-link"]}>&lt;</span>
                </button>
                {[...Array(totalPages).keys()].map((number) => (
                    <button
                        key={number + 1}
                        onClick={() => paginate(number + 1)}
                        className={`${styles["page-item"]} ${
                            currentPage === number + 1 ? styles["active"] : ""
                        }`}
                    >
                        <span className={styles["page-link"]}>
                            {number + 1}
                        </span>
                    </button>
                ))}
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToNextPage();
                    }}
                    className={styles["page-item"]}
                >
                    <span className={styles["page-link"]}>&gt;</span>
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        goToLastPage();
                    }}
                    className={styles["page-item"]}
                >
                    <span className={styles["page-link"]}>&gt;&gt;</span>
                </button>
            </div>
        </UserLayout>
    );
}
