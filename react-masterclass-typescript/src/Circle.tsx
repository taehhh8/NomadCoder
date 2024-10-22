// Typing the Props
// defaultProps
// optionalProps
// Typescript useState
import { useState } from "react";
import styled from "styled-components";

// defaultProps
interface ContainerProps {
  bgColor: string;
  borderColor: string; // borderColor is required
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  background-color: ${(props) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

// optionalProps
interface CircleProps {
  bgColor: string;
  borderColor?: string; // same borderColor : string | undefined
  text?: string;
}

function Circle({ bgColor, borderColor, text = "default text" }: CircleProps) {
  //   const [counter, setCounter] = useState(0);
  const [value, setValue] = useState<number | string>(0); // value의 type이 number가 될수도 있고 string이 될수도 있다.
  setValue(2);
  setValue("hello");
  // setValue(true); // error

  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {text}
    </Container>
  ); // borderColor is undefined 일때
}

export default Circle;

interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playerObj: PlayerShape) => `Hello ${playerObj.name} you are ${playerObj.age} years old`;

sayHello({ name: "nico", age: 12 });
// sayHello({name:"hi",age:12, hello:})
