import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  // 유저가 어떤 페이지로 갔는데 접근 권한이 없거나 했을 때 useNavigate를 쓰면된다.
  // location이나 location.push 같은 것을 import 해서 쓰는것보다 낫다.
  const onAboutClick = () => {
    navigate("/about");
  };
  return (
    <header>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <button onClick={onAboutClick}>About</button>
        </li>
        {/* <li>
          <Link to={"/about"}>About</Link>
        </li> */}
      </ul>
    </header>
  );
}

export default Header;
