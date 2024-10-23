import { Link, useSearchParams } from "react-router-dom";
import { users } from "../db";

function Home() {
  const [readSearchParams, setSearchParams] = useSearchParams();
  console.log(readSearchParams);
  setTimeout(() => {
    setSearchParams({
      day: "today",
      tomorrow: "123",
    });
  }, 3000);
  //Home에서 충돌해서 runtime error 낫다.
  //   const user: any = [];
  //   return <h1>{user[0].name}</h1>;
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
