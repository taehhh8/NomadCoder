// server component 에서 첫번째 fetch만 요청하고 두번째 fetch는 캐시를 사용한다.

import Link from "next/link";

export const metadata = {
  title: "Home ",
};

export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
  // 5초 뒤에 데이터를 가져오는 데 이걸 원하지는 않는다.
  // 더 빠르게 데이터를 가져오기 위해서 비동기 처리를 한다.
  // 로딩상태를 본후 데이터를 가져오는 것이 좋다.
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("fetching movies...");
  const response = await fetch(API_URL);
  const json = await response.json();
  return json;
}

// HomePage 컴포넌트에 async를 사용하는 이유는 Nextjs가 이 컴포넌트에서 awiat해야하기 때문이다.
// 사용자가 우리 웹사이트에 도달하는 순간 nextjs는 보여줄수있는 HTML을 보여주고 데이터를 가져오는 동안 로딩상태를 보여준다.
// 브라우저에게 백엔드에서 통신이 아직 마무리 되지 않았고 기다려줘야한다는 것을 알려준다.
export default async function HomePage() {
  const movies = await getMovies();

  return (
    <div>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
        </li>
      ))}
    </div>
  );
}

// ----> <Home/>
// about-us ----> <About/>
// movies/:id ----> <Movie/>

// React App <========> API <============> DB

// "use client";

// import { useEffect, useState } from "react";

// export default function Page() {
//   const [loading, setLoading] = useState(true);
//   const [movies, setMovies] = useState([]);
//   const getMovies = async () => {
//     const response = await fetch("https://nomad-movies.nomadcoders.workers.dev/movies");
//     const json = await response.json();
//     setMovies(json);
//   };

//   useEffect(() => {
//     getMovies();
//     setLoading(false);
//   }, []);
//   return <div>{loading ? "loading..." : JSON.stringify(movies)}</div>;
// }

// ----> <Home/>
// about-us ----> <About/>
// movies/:id ----> <Movie/>

// React App <========> API <============> DB

// 같은코드이지만 "use client"를 사용하지 않아도 된다.
// 왜냐하면 서버에서 데이터를 가져오기 때문이다.
// 서버에서 데이터를 가져오면 데이터를 가져오는 동안 화면에 빈화면이 나오기 때문에 사용자 경험이 좋지 않다.
// 그래서 서버에서 데이터를 가져오는 방법을 사용한다.

// <Loading/>
// const html = await HomePage()
// isLoading ? <Loading/> : html
