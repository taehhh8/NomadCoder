import styled, { keyframes } from "styled-components";

const Tittle = styled.h1`
  color: tomato;
  &:hover {
    color: teal;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${Tittle}:hover {
    font-size: 99px;
  }
  // pseudo selector state. state selector
  /* h1 {
    color: tomato;
    // same h1:hover
    &:hover {
      color: teal;
    }
  } */
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  color: tomato;
`;

const Input = styled.input.attrs({ required: true, maxLength: 15 })`
  background-color: tomato;
`;

export const anim = keyframes`
from {
  color: tomato;
}
to {
  color:teal;
}
`;

const Btn1 = styled.button`
  animation: ${anim} 0.5 infinite;
`;

function App() {
  return (
    <Wrapper>
      <Box bgColor='teal' />
      <Circle bgColor='tomato' />
      <Btn>Log in</Btn>
      <Btn as='a' href='https://www.google.com' target='_blank'>
        Go Home
      </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
      <Btn1>Login</Btn1>
      <Tittle>Hello</Tittle>
      <h1>Hello</h1>
    </Wrapper>
  );
}

export default App;
