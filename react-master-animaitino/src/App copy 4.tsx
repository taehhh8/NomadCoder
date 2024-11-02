import styled from "styled-components";
import { motion } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BiggerBox = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(255,255,255,0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;


const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(2,1fr);
  border-radius: 40px;
  box-shadow: 0 2px 3px hsla(0, 0%, 0%, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVariants = {
  hover:{scale:1.5, rotateZ:90},
  click:{scale:1.3, borderRadius:"100px"},
  drag:{backgroundColor:"rgba(46,204,114)",transition:{duration:10}}
}



function App() {
  const biggerBoxRed = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
    <BiggerBox ref={biggerBoxRed}>
      <Box drag dragConstraints={biggerBoxRed}  
      dragSnapToOrigin
      dragElastic={0.5}
      variants={boxVariants}
       whileHover="hover" whileDrag="drag" 
      whileTap="click">
        </Box>
      </BiggerBox>
    </Wrapper>
  );
}

export default App;