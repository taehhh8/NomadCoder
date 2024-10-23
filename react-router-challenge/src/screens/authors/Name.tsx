import { Outlet, useParams, Link } from "react-router-dom";
import { testUsers } from "../../db";

function Name() {
  const { name } = useParams();
  const author = testUsers.find((user) => user.name === name);

  return (
    <div>
      <h1>{author?.name}</h1>
      <ul>
        {author?.books.map((book, index) => (
          <li key={index}>
            <Link to={`/author/${name}/${book.title}`}>{book.title}</Link>
          </li>
        ))}
      </ul>
      <Outlet /> {/* 여기서 Book 컴포넌트가 렌더링됩니다 */}
    </div>
  );
}

export default Name;
// useParams를 사용하여 URL 파라미터에서 name을 추출하고 있습니다.
// testUsers에서 해당 이름의 작가를 찾아 정보를 표시합니다.
// 작가의 책 목록을 매핑하여 각 책에 대한 링크를 생성합니다.
// Outlet을 사용하여 중첩된 라우트의 컴포넌트를 렌더링할 위치를 지정합니다.
// 개선 사항:
// author가 없을 경우에 대한 처리가 필요합니다.
// key로 index를 사용하는 것보다 고유한 식별자를 사용하는 것이 좋습니다.
