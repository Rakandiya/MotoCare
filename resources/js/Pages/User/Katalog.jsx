import React, { useState, useEffect } from "react";
import styles from "../../../css/User/katalog.module.css";
import UserLayout from "@/Layouts/UserLayout";

export default function Katalog({ katalogs, auth }) {
    const [katalogState, setKatalogState] = useState([]);
    const [merkList, setMerkList] = useState([]);
    const [lineupList, setLineupList] = useState([]);
    const [searchMerk, setSearchMerk] = useState("");
    const [searchLineup, setSearchLineup] = useState("");
    const [currentBrand, setCurrentBrand] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        console.log("katalogs prop:", katalogs); // Pastikan data diterima dengan benar

        if (katalogs) {
            const data_katalog = katalogs;
            const list_all = data_katalog.reduce((acc, product) => {
                if (!acc[product.merk]) {
                    acc[product.merk] = [];
                }
                acc[product.merk].push(product);
                return acc;
            }, {});

            const list_merk = Object.keys(list_all);
            setMerkList(list_merk);
            setKatalogState(data_katalog);
        }
    }, [katalogs]);

    const capitalizeFirstLetterOfEachWord = (input) => {
        let words = input.split(" ");
        for (let i = 0; i < words.length; i++) {
            let firstLetter = words[i].charAt(0).toUpperCase();
            words[i] = firstLetter + words[i].slice(1);
        }
        return words.join(" ");
    };

    const handleMerkSearch = (e) => {
        setSearchMerk(e.target.value);
        if (e.target.value) {
            const searchValue = capitalizeFirstLetterOfEachWord(e.target.value);
            const filteredMerks = [
                ...new Set(katalogState.map((item) => item.merk)),
            ].filter((merk) => merk.includes(searchValue));
            setMerkList(filteredMerks);
        } else {
            setMerkList([...new Set(katalogState.map((item) => item.merk))]);
        }
    };

    const handleLineupSearch = (e) => {
        const LineupSearchValue = e.target.value;
        setSearchLineup(LineupSearchValue);
        if (LineupSearchValue) {
            const filteredLineups = katalogState
                .filter((item) =>
                    item.model
                        .toLowerCase()
                        .includes(LineupSearchValue.toLowerCase())
                )
                .map((item) => item.model);
            setLineupList(filteredLineups);
        } else {
            setLineupList(
                katalogState
                    .filter((item) => item.merk === currentBrand)
                    .map((item) => item.model)
            );
        }
    };

    const handleBrandClick = (merk, e) => {
        e.preventDefault();
        e.stopPropagation();
        setCurrentBrand(merk);
        setCurrentProduct(null);
        setLineupList(
            katalogState
                .filter((item) => item.merk === merk)
                .map((item) => item.model)
        );
    };

    const handleProductClick = (product, e) => {
        if (product) {
            setCurrentProduct(product);
            e.preventDefault();
        }
    };

    return (
        <UserLayout auth={auth}>
            <div className={styles["backgroundImage"] + "my-5"}>
                <main>
                    <article className={styles["article"]}>
                        <section>
                            <div className="mt-4">
                                <div className={styles["row"]}>
                                    <section className={styles["form-katalog"]}>
                                        <div className={styles["left-panel"]}>
                                            <div id="merk">
                                                <div
                                                    className={styles["title"]}
                                                >
                                                    <div
                                                        className={
                                                            styles["MerkMotor"]
                                                        }
                                                        id="MerkMotor"
                                                    >
                                                        Merk Motor
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control mb3"
                                                        id="cari-merk"
                                                        value={searchMerk}
                                                        onChange={
                                                            handleMerkSearch
                                                        }
                                                        placeholder="Cari merk Motor"
                                                    />
                                                </div>
                                                <div id="merk-list">
                                                    {merkList.map((merk) => (
                                                        <div
                                                            key={merk}
                                                            id={merk}
                                                            className={
                                                                styles["merk"]
                                                            }
                                                            onClick={(e) =>
                                                                handleBrandClick(
                                                                    merk,
                                                                    e
                                                                )
                                                            }
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {merk}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div id="lineup">
                                                <div
                                                    className={styles["title"]}
                                                >
                                                    <div
                                                        className={
                                                            styles[
                                                                "LineupProduk"
                                                            ]
                                                        }
                                                    >
                                                        Lineup Produk
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="form-control mb3"
                                                        id="cari-merk"
                                                        value={searchLineup}
                                                        onChange={
                                                            handleLineupSearch
                                                        }
                                                        placeholder="Cari lineup produk"
                                                    />
                                                </div>
                                                <div id="lineup-list">
                                                    {lineupList &&
                                                        lineupList.map(
                                                            (lineup) => (
                                                                <div
                                                                    key={lineup}
                                                                    id={lineup}
                                                                    className={
                                                                        styles[
                                                                            "merk"
                                                                        ]
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        handleProductClick(
                                                                            lineup,
                                                                            e
                                                                        )
                                                                    }
                                                                    style={{
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    {lineup}
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className={styles["right-panel"]}
                                            id="Konten"
                                        >
                                            {currentProduct && (
                                                <>
                                                    <img
                                                        title="Gambar"
                                                        id="gambar-produk"
                                                        src={
                                                            "/storage/" +
                                                            katalogState.find(
                                                                (item) =>
                                                                    item.model ===
                                                                    currentProduct
                                                            ).gambar
                                                        }
                                                        className={
                                                            styles[
                                                                "motor-image"
                                                            ]
                                                        }
                                                        alt={currentProduct}
                                                    />
                                                    <div
                                                        className={
                                                            styles[
                                                                "title-deskripsi"
                                                            ]
                                                        }
                                                        id="title"
                                                    >
                                                        {
                                                            katalogState.find(
                                                                (item) =>
                                                                    item.model ===
                                                                    currentProduct
                                                            ).merk
                                                        }{" "}
                                                        {currentProduct}
                                                    </div>
                                                    <p
                                                        className={
                                                            styles[
                                                                "description"
                                                            ]
                                                        }
                                                        id="description"
                                                    >
                                                        {
                                                            katalogState.find(
                                                                (item) =>
                                                                    item.model ===
                                                                    currentProduct
                                                            ).deskripsi
                                                        }
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>
                    </article>
                </main>
            </div>
        </UserLayout>
    );
}
