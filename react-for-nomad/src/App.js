import { useEffect, useState } from "react";

function Hello() {
  function byFn() {
    console.log("bye :(");
  }
  function hiFn() {
    console.log("created :)");
    return byFn();
  }

  useEffect(() => {
    console.log("hi :)");
    return () => console.log("bye :(");
  }, []);
  useEffect(function () {
    console.log("hi :)");
    return () => console.log("bye :(");
  }, []);
  // useEffect(() => {
  //   console.log("created :)");
  //   return () => console.log("destroyed :("); // Clean up function 컴포넌트가 없어지거나 사라질때 console에 무언갈 보여주는 함수
  // }, []);
  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);

  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
