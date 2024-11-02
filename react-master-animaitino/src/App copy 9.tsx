import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255, 0, 128, 1);
  flex-direction: column;
`;

const Box = styled(motion.div)`
  position: absolute;
  top: 10%;
  width: 200px;
  height: 80px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  font-size: 20px;
`;

const boxVariants = {
  entry: (isBack: boolean) => {
    return {
      x: isBack ? -500 : 500,
      scale: 0,
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: (isBack: boolean) => {
    return {
      x: isBack ? -500 : 500,
      scale: 0,
      opacity: 0,
    };
  },
};

function App() {
  const [visible, setVisible] = useState(1);
  const [back, setBack] = useState(false);
  const nextPlease = () => {
    setBack(false);
    setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  };
  const prevPlease = () => {
    setBack(true);
    setVisible((prev) => (prev === 1 ? 1 : prev - 1));
  };

  return (
    <Wrapper>
      <AnimatePresence mode="wait" custom={back}>
        <Box
          custom={back}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
          key={visible}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={prevPlease}>prev</button>
      <button onClick={nextPlease}>Next</button>
    </Wrapper>
  );
}

export default App;
