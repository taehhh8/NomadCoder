import { useEffect, useState } from "react";
import MavelCharacter from "../MavelCharacter";
import styles from "../style.module.css"


function Home () {
    const [loading, setLoading] = useState(true);
    const [characters, setCharacters] = useState([]);
    const getCharacterList = async()=>{ 
    //    const response = await fetch(
    //         `https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year`
    //     )
    //     const json = await response.json();
        const json = await (
            await fetch(
            `https://marvel-proxy.nomadcoders.workers.dev/v1/public/characters?limit=50&orderBy=modified&series=24229,1058,2023`
        )
        ).json();
        console.log(json.data.results)
        console.log(json.data.results[0].thumbnail)
        setCharacters(json.data.results);
        setLoading(false);
    }

    useEffect(()=>{
        getCharacterList();
    },[])
    
    return (
        <div className={styles.homeContainer}>
        {loading ?         <h1 className={styles.loading}>Loading...</h1> :
            <div className={styles.characterGrid}>
         {characters.map(character => (
            <MavelCharacter 
            key={character.id}
            id={character.id}
            thumbnail={character.thumbnail} 
            title={character.name} 
            // summary={character.description}
            />
         ))}
        </div>
        }
     </div>
    )
}

export default Home;