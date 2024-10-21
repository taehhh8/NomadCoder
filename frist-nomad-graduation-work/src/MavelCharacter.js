// movie component

import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./style.module.css"

function MavelCharacter({ id, thumbnail, title }) {
    return (
        <div className={styles.characterCard}>
            <img alt={title} src={thumbnail.path + "." + thumbnail.extension} className={styles.characterImage}/>
            <h2  className={styles.characterTitle}>
                <Link to={`/character/${id}`} className={styles.characterLink}  >
                    {title}
                </Link>
            </h2>
        </div>
    )
}

MavelCharacter.propTypes = {
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.shape({
        path: PropTypes.string.isRequired,
        extension: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
}

export default MavelCharacter;
