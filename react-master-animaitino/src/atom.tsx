import { atom } from "recoil";

export interface TimerState {
  isRunning: boolean;
  timeRemaining: number;
  rounds: number;
  goals: number;
}

export const timerState = atom<TimerState>({
  key: "timerState",
  default: {
    isRunning: false,
    timeRemaining: 25 * 60, // 25 minutes in seconds
    rounds: 0,
    goals: 0,
  },
});
