import styled from "styled-components";
import { motion, useMotionValue, useTransform , useViewportScroll} from "framer-motion";
import { useEffect, useRef } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, rgba(0, 212, 255, 1) 0%, rgba(255, 0, 128, 1) 100%);
  height: 500vh;

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
  
  const x = useMotionValue(0);
  const potato = useTransform(x, [-800, 800], ["-360", "360"]); // input output same arugment
  // console.log(potato);

  const linearGradient = useTransform(x, 
    [-800,0 ,800], 
    ["linear-gradient(135deg, #ff3300 0%, rgba(255, 0, 128, 1) 100%)",
     "linear-gradient(135deg, rgba(255, 0, 128, 1) 0%, #3300ff 100%)",
    "linear-gradient(135deg, #ff5500 0%, #aaff00 100%)"])

    const { scrollYProgress} = useViewportScroll();
    const scale = useTransform(scrollYProgress, [0,1], [1,5]);
   
  // useEffect(()=>{
  //   potato.onChange(()=>{
  //     console.log(potato.get());
  //   })
  // },[x])
  console.log(x);
  return (
    <Wrapper style={{background:linearGradient}}>
      <Box style={{x, scale:scale}} drag="x" dragSnapToOrigin>
        </Box>
    </Wrapper>
  );
}

export default App;