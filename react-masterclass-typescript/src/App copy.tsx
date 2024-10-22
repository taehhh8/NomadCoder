import { useState } from "react";

function App() {
  const [value, setValue] = useState("");

  // typescript는 이 onChange 함수가 InputElement에 의해서 실행 될것을 안다.
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value);
  };

  return (
    <div>
      <form>
        <input value={value} onChange={onChange} type='text' placeholder='username'></input>
        <button>Log in</button>
      </form>
    </div>
  );
}

export default App;
