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
  invisible: { x: 500, scale: 1, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1,
    },
  },
  exit: { x: -500, opacity: 0, scale: 0 },
};

function App() {
  const [visible, setVisible] = useState(1);
  const nextPlease = () => setVisible((prev) => (prev === 10 ? 10 : prev + 1));
  const prevPlease = () => setVisible((prev) => (prev === 1 ? 10 : prev - 1));

  return (
    <Wrapper>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
          i === visible ? (
            <Box
              variants={boxVariants}
              initial="invisible"
              animate="visible"
              exit="exit"
              key={i}
            >
              {i}
            </Box>
          ) : null
        )}
      </AnimatePresence>
      <button onClick={prevPlease}>prev</button>
      <button onClick={nextPlease}>Next</button>
    </Wrapper>
  );
}

export default App;
