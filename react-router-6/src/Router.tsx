import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Root from "./Root";
import NotFound from "./screens/NotFound";
import ErrorComponent from "./components/ErrorComponent";
import User from "./screens/users/User";
import Followers from "./screens/users/Followers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        // route를 만들떄 loader 함수를 넣으면 데이터를 제공받아서 useLoaderData에서 data를 가져올수 있다. fetching을 안써도된다.
        // loader : rootLoader,
        errorElement: <ErrorComponent />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        // 이방법으로 이용하는게 좋음
        path: "users/:userId",
        element: <User />,
        children: [
          {
            path: "followers",
            element: <Followers />,
          },
        ],
      },
      //   {
      //     // 만약에 유저가 /users로 가서 뭔가를 볼수 있다면 밑에 처럼 해야하나다. 왜냐면 element 하나를 render 할수있어서
      //     path: "users",
      //     children: [
      //       {
      //         path: ":userId",
      //         element: <User />,
      //       },
      //     ],
      //   },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
