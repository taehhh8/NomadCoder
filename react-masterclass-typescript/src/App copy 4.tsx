import { useState } from "react";
import styled from "styled-components";

function App() {
  // event 확인 사이트
  //  구 버전 https://legacy.reactjs.org/docs/events.html
  // 최신버전 https://react.dev/reference/react-dom/components/common
  // npm install --save-dev styled-components
  // npm install --save-dev @types/styled-components
  const onClick = (event: React.FormEvent<HTMLButtonElement>) => {}; // form이 없으면 FormEvent가아니라 MouseEvent가 된다.

  const Container = styled.div`
    background-color: ${(props) => props.theme.bgColor};
  `;

  const H1 = styled.h1`
    color: ${(props) => props.theme.textColor};
  `;

  interface DummyProps {
    text: string;
    active?: boolean;
  }

  function Dummy({ text, active = false }: DummyProps) {
    return <div> {text}</div>;
  }

  return (
    <Container>
      <H1>Protected</H1>
      <Dummy text='hello' active />
      {/* active는 optional이기 때문에 넣어도 되고 안넣어도 된다. active가 없으면 false가 된다. active active={true}와 같다. */}

      <form>
        <button onClick={onClick}>Click me</button>
      </form>
    </Container>
  );
}

export default App;
