import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(255,255,255,0.2);
  display:grid;
  grid-template-columns: repeat(2,1fr);
  border-radius: 40px;
  box-shadow: 0 2px 3px hsla(0, 0%, 0%, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
  width: 70px;
  height: 70px;
  background-color: white;
  place-self: center;
  border-radius: 35px;
  box-shadow: 0 2px 3px hsla(0, 0%, 0%, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  start:{
    opacity:1,
    scale:0.5,
  },
  end:{
    opacity:1,
    scale:1,
    transition:{
      type:"spring",
      duration:0.5,
      bounce:0.5,
      delayChildren:0.5,
      staggerChildren:0.2,
    }
  },
}

const circleVariants = {
  start:{
    opacity:0,
    y:10
  },
  end:{
    opacity:1,
    y:0,
    transition:{
      delay:0.5
    }
  },
}

function App() {
  return (
    <Wrapper>
      <Box variants={boxVariants} initial="start" animate="end">
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </Box>
    </Wrapper>
  );
}

export default App;