import { Link } from "react-router-dom";
import { testUsers } from "../db";

function Home() {
  //Home에서 충돌해서 runtime error 낫다.
  //   const user: any = [];
  //   return <h1>{user[0].name}</h1>;
  return (
    <div>
      <h1>Best Seller Authors</h1>
      <ul>
        {testUsers.map((user) => (
          <li key={user.id}>
            <Link to={`/author/${user.name}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
// testUsers 데이터를 사용하여 작가 목록을 표시합니다.
// 각 작가에 대한 링크를 생성합니다.
// 주석 처리된 코드는 런타임 에러를 발생시키는 예시로 보입니다.
// 개선 사항:
// testUsers가 비어있을 경우에 대한 처리가 필요할 수 있습니다.
// 주석 처리된 코드는 제거하거나, 에러 처리 예시로 사용할 경우 명확한 주석을 달아야 합니다.
// 전반적으로, 이 코드들은 React Router를 효과적으로 사용하여 네비게이션과 데이터 표시를 구현하고 있습니다. 다만, 에러 처리와 엣지 케이스 관리에 조금 더 주의를 기울일 필요가 있습니다.
