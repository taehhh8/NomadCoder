import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

export default async function MovieDetail({ params: { id } }: { params: { id: string } }) {
  return (
    <div>
      <h2>Movie Detail Page</h2>
      <Suspense fallback={<h1>Loading movie info...</h1>}>
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos...</h1>}>
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}

// Page 단위 로딩 => loading.tsx
// 서버 컴포넌트 단위 로딩 => Suspense
