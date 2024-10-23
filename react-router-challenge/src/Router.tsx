import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home";
import About from "./screens/About";
import Root from "./Root";
import NotFound from "./screens/NotFound";
import ErrorComponent from "./components/ErrorComponent";
import Name from "./screens/authors/Name";
import Book from "./screens/authors/Book";
import Chapthers from "./screens/authors/Chapthers";
import Characters from "./screens/authors/Characters";

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
        errorElement: <NotFound />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        // 이방법으로 이용하는게 좋음
        path: "author/:name",
        element: <Name />,
        children: [
          {
            path: ":book",
            element: <Book />,
            children: [
              {
                path: "chapters",
                element: <Chapthers />,
              },
              {
                path: "characters",
                element: <Characters />,
              },
            ],
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
