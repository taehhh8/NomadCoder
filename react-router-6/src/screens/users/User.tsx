import { Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import { users } from "../../db";

function User() {
  const { userId } = useParams();
  console.log(useOutletContext());
  return (
    <div>
      <h1>
        User with id {userId} is name: {users[Number(userId) - 1].name}
      </h1>
      <hr />
      {/* /followers를 쓰면 절대경로라 루트에서 시작하는 경로가 된다.  */}
      <Link to='followers'>See followers</Link>
      <Outlet
        context={{
          nameOfMyUser: users[Number(userId) - 1].name,
        }}
      />
      {/* 이 Route, 즉 스크린에 자식이 있다면, 그경우가 Outlet이 사용되는 경우이다. */}
    </div>
  );
}

export default User;
