import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function Root() {
  return (
    <div>
      <Header />
      <h1>Best Seller Authors</h1>
      <Outlet context={{ drakMode: true }} />
    </div>
  );
}

export default Root;
