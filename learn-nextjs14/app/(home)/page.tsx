// server component 에서 첫번째 fetch만 요청하고 두번째 fetch는 캐시를 사용한다.
import styles from "../../styles/home.module.css";
import Movie from "../../components/movie";

export const metadata = {
  title: "Home ",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("fetching movies...");
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          poster_path={movie.poster_path}
        />
      ))}
    </div>
  );
}
