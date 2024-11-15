import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { timerState } from "./atom";
import { useEffect } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a2a6c, #b21f1f, #fdbb2d);
  flex-direction: column;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 150%;
    height: 150%;
    background: radial-gradient(circle, transparent 20%, black 100%);
    opacity: 0.7;
  }
`;

const Container = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 30px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 1;
`;

const TimerDisplay = styled.div`
  font-size: 120px;
  color: white;
  font-weight: 700;
  display: flex;
  gap: 20px;
  font-family: "Montserrat", sans-serif;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const Number = styled(motion.span)`
  display: inline-block;
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 20px;
  min-width: 120px;
  text-align: center;
`;

const Separator = styled.span`
  animation: blink 1s infinite;
  opacity: 1;
  color: rgba(255, 255, 255, 0.8);

  @keyframes blink {
    50% {
      opacity: 0;
    }
  }
`;

const Button = styled(motion.button)`
  padding: 15px 40px;
  border-radius: 50px;
  border: none;
  background: linear-gradient(45deg, #ff512f, #dd2476);
  color: white;
  font-size: 20px;
  margin-top: 30px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 1px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;
const Stats = styled.div`
  color: white;
  margin-top: 30px;
  font-size: 20px;
  display: flex;
  gap: 30px;
`;

const StatItem = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  padding: 15px 25px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;

  span:first-child {
    font-size: 14px;
    opacity: 0.8;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  span:last-child {
    font-size: 24px;
    font-weight: 600;
  }
`;
function App() {
  const [timer, setTimer] = useRecoilState(timerState);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleTimer = () => {
    setTimer((prev) => ({ ...prev, isRunning: !prev.isRunning }));
  };

  useEffect(() => {
    let interval: number; // NodeJS.Timeout 대신 number 사용

    if (timer.isRunning && timer.timeRemaining > 0) {
      interval = window.setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          timeRemaining: prev.timeRemaining - 1,
        }));
      }, 1000);
    } else if (timer.timeRemaining === 0) {
      // Timer completed
      const newRounds = timer.rounds + 1;
      const newGoals = newRounds >= 4 ? timer.goals + 1 : timer.goals;

      setTimer((prev) => ({
        ...prev,
        isRunning: false,
        timeRemaining: 25 * 60,
        rounds: newRounds >= 4 ? 0 : newRounds,
        goals: newGoals,
      }));
    }

    return () => window.clearInterval(interval);
  }, [timer.isRunning, timer.timeRemaining]);

  const timeString = formatTime(timer.timeRemaining);
  const [minutes, seconds] = timeString.split(":");

  const containerVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
    },
    tap: {
      scale: 0.95,
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
    },
  };

  const numberVariants = {
    initial: { y: 30, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const statVariants = {
    hover: {
      y: -5,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)",
    },
  };
  return (
    <Wrapper>
      <Container
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <TimerDisplay>
          <Number
            key={minutes}
            variants={numberVariants}
            initial="initial"
            animate="animate"
          >
            {minutes}
          </Number>
          <Separator>:</Separator>
          <Number
            key={seconds}
            variants={numberVariants}
            initial="initial"
            animate="animate"
          >
            {seconds}
          </Number>
        </TimerDisplay>

        <Button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={toggleTimer}
        >
          {timer.isRunning ? "PAUSE" : "START"}
        </Button>

        <Stats>
          <StatItem
            variants={statVariants}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span>Rounds</span>
            <span>{timer.rounds}/4</span>
          </StatItem>
          <StatItem
            variants={statVariants}
            whileHover="hover"
            transition={{ type: "spring", stiffness: 300 }}
          >
            <span>Goals</span>
            <span>{timer.goals}</span>
          </StatItem>
        </Stats>
      </Container>
    </Wrapper>
  );
}

export default App;
