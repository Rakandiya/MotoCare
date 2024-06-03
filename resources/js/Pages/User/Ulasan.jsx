import React, { useState, useRef } from "react";
import UserLayout from "@/Layouts/UserLayout";
import styles from "../../../css/User/Ulasan.module.css";
import { Row, Col, Modal, Button } from "react-bootstrap";
export default function Ulasan() {
    const [selectedRating, setSelectedRating] = useState(0);
    const [ulasan, setUlasan] = useState([
        {
            id: 1,
            reviewTitle: "Pelayanan Motor",
            bintang: 5,
            reviewName: "Olivia Hall",
            reviewDate: "12 Januari 2022",
            reviewDesc: "Pelayanan motor yang sangat bagus",
            foto: ["/images/aerox.png", "/images/beat.jpeg"],
        },

        {
            id: 2,
            reviewTitle: "Service Motor",
            bintang: 4,
            reviewName: "James Taylor",
            reviewDate: "15 Februari 2022",
            reviewDesc: "Hasil service motor sangat bagus",
            foto: ["klx.png"],
        },

        {
            id: 3,
            reviewTitle: "Ganti Oli Mesin",
            bintang: 3,
            reviewName: "John Doe",
            reviewDate: "18 Maret 2022",
            reviewDesc: "Ganti oli mesin sangat cepat",
            foto: ["beat.jpeg"],
        },

        {
            id: 4,
            reviewTitle: "Penggantian Ban",
            bintang: 5,
            reviewName: "Jane Doe",
            reviewDate: "21 April 2022",
            reviewDesc: "Penggantian ban sangat cepat dan bagus",
            foto: ["cbr.png"],
        },

        {
            id: 5,
            reviewTitle: "Penggantian Lampu Depan dan Belakang",
            bintang: 4,
            reviewName: "Smith Doe",
            reviewDate: "24 Mei 2022",
            reviewDesc:
                "Penggantian lampu depan dan belakang sangat cepat dan bagus",
            foto: ["nmax.png"],
        },
    ]);

    const [show, setShow] = useState(false);
    const [modalImage, setModalImage] = useState("");

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [reviewImages, setReviewImages] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [reviewsPerPage] = useState(1);
    const reviewListRef = useRef(null);

    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = ulasan.slice(indexOfFirstReview, indexOfLastReview);

    const totalPages = Math.ceil(ulasan.length / reviewsPerPage);

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
        setTimeout(() => {
            if (reviewListRef.current) {
                reviewListRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }, 1);
    };

    const handleShow = (images, index) => {
        setReviewImages(images);
        setCurrentImageIndex(index);
        setModalImage(images[index]);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
    };

    const handleNext = () => {
        const nextIndex = (currentImageIndex + 1) % reviewImages.length;
        setCurrentImageIndex(nextIndex);
        setModalImage(reviewImages[nextIndex]);
    };

    const handlePrev = () => {
        const prevIndex =
            (currentImageIndex - 1 + reviewImages.length) % reviewImages.length;
        setCurrentImageIndex(prevIndex);
        setModalImage(reviewImages[prevIndex]);
    };

    const stars = [
        { id: 1, color: selectedRating >= 1 ? "#ffdd00" : "#dddddd" },
        { id: 2, color: selectedRating >= 2 ? "#ffdd00" : "#dddddd" },
        { id: 3, color: selectedRating >= 3 ? "#ffdd00" : "#dddddd" },
        { id: 4, color: selectedRating >= 4 ? "#ffdd00" : "#dddddd" },
        { id: 5, color: selectedRating >= 5 ? "#ffdd00" : "#dddddd" },
    ];

    const ratings = [
        { id: "five", count: 50, stars: 5 },
        { id: "four", count: 25, stars: 4 },
        { id: "three", count: 15, stars: 3 },
        { id: "two", count: 10, stars: 2 },
        { id: "one", count: 0, stars: 1 },
    ];

    const renderStars = (count) => {
        let stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <box-icon
                    name="star"
                    type="solid"
                    color={i < count ? "#ffdd00" : "#ddd"}
                ></box-icon>
            );
        }
        return stars;
    };
    return (
        <UserLayout>
            <section className={styles["rating-page"]}>
                <div className={styles["container"]}>
                    <h1 className={styles["title-page"]}>RATING PAGE</h1>
                    <section className={styles["form-ulasan"]}>
                        <Row>
                            <Col md={5}>
                                <h3 className={styles["title"]}>
                                    Rating Service Kendaraan
                                </h3>
                                <h1 className={styles["rate-total"]}>
                                    Rating Keseluruhan
                                </h1>
                                <div className={styles["rate-detail"]}>
                                    <div className={styles["rating"]}>
                                        <box-icon
                                            name="star"
                                            type="solid"
                                            color="#ffdd00"
                                        ></box-icon>
                                    </div>
                                    <p className={styles["count-rate"]}>
                                        4.5 / 5.0 - 100 ratings
                                    </p>
                                </div>

                                {ratings.map((rating) => (
                                    <div
                                        className={styles["rate-detail"]}
                                        key={rating.id}
                                    >
                                        <div
                                            className={
                                                styles[`rating-${rating.id}`]
                                            }
                                        >
                                            {renderStars(rating.stars)}
                                        </div>
                                        <p className={styles["count-rate"]}>
                                            {rating.count} ratings
                                        </p>
                                    </div>
                                ))}
                            </Col>

                            <Col md={7}>
                                <h1 className={styles["title-rate-input"]}>
                                    Berikan Rating
                                </h1>
                                <form
                                    action="#"
                                    method="post"
                                    className={styles["form-input-ulasan"]}
                                >
                                    <div className={styles["service-type"]}>
                                        <h4 className={styles["title-rate"]}>
                                            Jenis Layanan
                                        </h4>
                                        <input
                                            type="text"
                                            id="jenis-layanan"
                                            name="jenis-layanan"
                                            className={styles["input-text"]}
                                            placeholder="Masukkan jenis layanan"
                                            autoComplete="off"
                                        />
                                    </div>

                                    <div className={styles["rate"]}>
                                        <h4 className={styles["title-rate"]}>
                                            Rating
                                        </h4>
                                        <div className={styles["rating-in"]}>
                                            {stars.map((star) => (
                                                <React.Fragment key={star.id}>
                                                    <input
                                                        type="radio"
                                                        id={`star${star.id}`}
                                                        name="rating"
                                                        value={star.id}
                                                        onChange={() =>
                                                            setSelectedRating(
                                                                star.id
                                                            )
                                                        }
                                                        className={
                                                            styles[
                                                                "input-rating"
                                                            ]
                                                        }
                                                    />
                                                    <label
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                        htmlFor={`star${star.id}`}
                                                    >
                                                        <box-icon
                                                            name="star"
                                                            type="solid"
                                                            color={star.color}
                                                        ></box-icon>
                                                    </label>
                                                </React.Fragment>
                                            ))}
                                        </div>
                                    </div>

                                    <div className={styles["img"]}>
                                        <h4 className={styles["title-rate"]}>
                                            Foto
                                        </h4>
                                        <label
                                            htmlFor="image"
                                            className={styles["label-gambar"]}
                                        >
                                            <div className={styles["img-box"]}>
                                                <box-icon
                                                    name="plus"
                                                    color="#f16211"
                                                ></box-icon>
                                            </div>
                                            <span
                                                className={styles["text-img"]}
                                            >
                                                Tambah Foto
                                            </span>
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className={styles["input-file"]}
                                        />
                                    </div>

                                    <div className={styles["desc"]}>
                                        <h4 className={styles["title-rate"]}>
                                            Catatan
                                        </h4>
                                        <textarea
                                            id="catatan"
                                            name="catatan"
                                            className={styles["textarea"]}
                                            autoComplete="off"
                                        ></textarea>
                                    </div>

                                    <div
                                        id="tombol-submit"
                                        className={styles["tombol-submit"]}
                                    >
                                        <button
                                            type="submit"
                                            value="SUBMIT"
                                            className={
                                                styles["tombol-submit-btn"]
                                            }
                                        >
                                            SUBMIT
                                        </button>
                                    </div>
                                </form>
                            </Col>
                        </Row>

                        <div
                            ref={reviewListRef}
                            className={styles["review-list"]}
                        >
                            <h1 className={styles["review-title-list"]}>
                                Daftar Ulasan
                            </h1>
                            <div>
                                {currentReviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className={styles.review}
                                    >
                                        <div
                                            className={styles["review-header"]}
                                        >
                                            <h3
                                                className={
                                                    styles["review-info"]
                                                }
                                            >
                                                {review.reviewTitle} -{" "}
                                                {review.reviewName}
                                            </h3>
                                            <div
                                                className={
                                                    styles["rating-value"]
                                                }
                                            >
                                                {[...Array(5)].map((_, i) => (
                                                    <span
                                                        key={i}
                                                        className={
                                                            i < review.bintang
                                                                ? `${styles.star} ${styles["active-star"]}`
                                                                : styles.star
                                                        }
                                                    >
                                                        <i className="bx bxs-star"></i>
                                                    </span>
                                                ))}
                                            </div>
                                            <p
                                                className={
                                                    styles["review-date"]
                                                }
                                            >
                                                {review.reviewDate}
                                            </p>
                                        </div>
                                        <p
                                            className={
                                                styles["review-description"]
                                            }
                                        >
                                            {review.reviewDesc}
                                        </p>
                                        {review.foto.map((image, index) => (
                                            <img
                                                key={index}
                                                className={styles["review-img"]}
                                                src={image}
                                                alt={`Review ${index}`}
                                                onClick={() =>
                                                    handleShow(
                                                        review.foto,
                                                        index
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className={styles["pagination"]}>
                            <a
                                href="#"
                                onClick={() => handlePageClick(1)}
                                className={styles["page-item"]}
                            >
                                &laquo;
                            </a>
                            <a
                                href="#"
                                onClick={() =>
                                    handlePageClick(
                                        Math.max(1, currentPage - 1)
                                    )
                                }
                                className={styles["page-item"]}
                            >
                                &lsaquo;
                            </a>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <a
                                    key={i + 1}
                                    href="#"
                                    onClick={() => handlePageClick(i + 1)}
                                    className={`${styles["page-item"]} ${
                                        currentPage === i + 1
                                            ? styles["active"]
                                            : ""
                                    }`}
                                >
                                    {i + 1}
                                </a>
                            ))}
                            <a
                                href="#"
                                onClick={() =>
                                    handlePageClick(
                                        Math.min(totalPages, currentPage + 1)
                                    )
                                }
                                className={styles["page-item"]}
                            >
                                &rsaquo;
                            </a>
                            <a
                                href="#"
                                onClick={() => handlePageClick(totalPages)}
                                className={styles["page-item"]}
                            >
                                &raquo;
                            </a>
                        </div>
                    </section>
                </div>
            </section>

            <Modal size="lg" show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body
                    style={{ display: "flex", justifyContent: "center" }}
                >
                    <img
                        src={modalImage}
                        alt="Modal Preview"
                        style={{
                            width: "65%",
                        }}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        className={styles["btn-in-modal"]}
                        onClick={handlePrev}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="secondary"
                        className={styles["btn-in-modal"]}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                    <Button
                        variant="secondary"
                        className={styles["btn-in-modal"]}
                        onClick={handleClose}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </UserLayout>
    );
}
