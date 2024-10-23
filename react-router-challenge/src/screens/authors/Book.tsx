import { Outlet, useParams, Link } from "react-router-dom";
import { testUsers } from "../../db";

function Book() {
  const { name, book: bookTitle } = useParams();
  const author = testUsers.find((user) => user.name === name);
  const book = author?.books.find((b) => b.title === bookTitle);

  return (
    <div>
      <h2>{book?.title}</h2>
      <nav>
        <ul>
          <li>
            <Link to={`chapters`}>Chapters</Link>
            {/* <Outlet /> */}
          </li>
          <li>
            <Link to={`characters`}>Characters</Link>
            {/* <Outlet /> */}
          </li>
        </ul>
      </nav>
      <Outlet /> {/* 여기서 Chapters 또는 Characters 컴포넌트가 렌더링됩니다 */}
    </div>
  );
}

export default Book;
// useParams를 사용하여 URL에서 name과 book 파라미터를 추출합니다.
// 작가와 책 정보를 찾아 표시합니다.
// 'Chapters'와 'Characters' 페이지로의 링크를 제공합니다.
// Outlet을 사용하여 중첩된 라우트의 컴포넌트를 렌더링합니다.
// 개선 사항:
// author나 book이 없을 경우에 대한 처리가 필요합니다.
// 상대 경로를 사용하고 있는데, 절대 경로를 사용하는 것이 더 안전할 수 있습니다.
