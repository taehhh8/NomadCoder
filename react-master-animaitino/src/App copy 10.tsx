import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: hsl(329.88235294117646, 100%, 50%);
  flex-direction: row;
`;

const Box = styled(motion.div)`
  margin: 50px;
  width: 200px;
  height: 200px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  font-size: 20px;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: #00a5ff;
  border-radius: 50px;
`;

function App() {
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);

  return (
    <Wrapper onClick={toggleClicked}>
      <Box>
        {clicked ? (
          <Circle layoutId="circle" style={{ borderRadius: 50 }} />
        ) : null}
      </Box>
      <Box>
        {!clicked ? (
          <Circle layoutId="circle" style={{ borderRadius: 0, scale: 2 }} />
        ) : null}
      </Box>
    </Wrapper>
  );
}

export default App;
