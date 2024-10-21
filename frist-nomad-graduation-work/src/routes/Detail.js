import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/Detail.module.css";

const Detail = () => {
    const { id } = useParams();
    const [characterDetail, setCharacterDetail] = useState(null);

    const getCharacterDetail = async () => {
        const json = await (
            await fetch(`https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters/${id}`)
        ).json();
        
        setCharacterDetail(json.data.results[0]);
    }

    useEffect(() => {
        getCharacterDetail();
    }, [id])
    
    if (!characterDetail) return <div className={styles.loading}>Loading...</div>;

    return (
        <div className={styles.detailContainer}>
            <div className={styles.characterCard}>
                <img 
                    src={`${characterDetail.thumbnail.path}.${characterDetail.thumbnail.extension}`}
                    alt={characterDetail.name}
                    className={styles.characterImage}
                />
                <div className={styles.characterInfo}>
                    <h1 className={styles.characterName}>{characterDetail.name}</h1>
                    <p className={styles.characterDescription}>
                        {characterDetail.description || "No description available."}
                    </p>
                    <p className={styles.characterModified}>
                        Last modified: {new Date(characterDetail.modified).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Detail;
