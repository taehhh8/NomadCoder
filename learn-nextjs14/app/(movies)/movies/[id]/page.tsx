import { Suspense } from "react";
import MovieInfo from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

interface IParams {
  id: string;
}

// movie fetch 전에 호출됨
export async function generateMetadata({
  params: { id },
}: {
  params: IParams;
}) {
  return { title: `Movie ${id}` };
}

export default async function MovieDetail({
  params: { id },
}: {
  params: IParams;
}) {
  return (
    <div>
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
