import styles from "./App.module.css";
import { useEffect, useState } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  console.log("i run all the time");

  useEffect(() => {
    console.log("I run only once");
  }, []);

  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("SERACH FOR", keyword);
    }
  }, [keyword]);

  useEffect(() => {
    console.log("I run when counter changes");
  }, [counter]);

  useEffect(() => {
    console.log("I run when keyword or counter changes");
  }, [keyword, counter]);

  return (
    <div>
      <input value={keyword} type='text' placeholder='Search here...' onChange={onChange}></input>
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>Click me</button>
    </div>
  );
}

export default App;
