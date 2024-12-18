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
  background-color: white;
  display:grid;
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
  return (
    <Wrapper>
      <Box drag  variants={boxVariants} whileHover="hover" whileDrag="drag" whileTap="click">
      </Box>
    </Wrapper>
  );
}

export default App;