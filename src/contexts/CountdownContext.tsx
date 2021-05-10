import { createContext, useContext, useEffect, useState } from "react";
import { ChallengeContext } from "./ChallengesContext";

interface CountdownContextData {
  isActive: boolean;
  hasFinished: boolean;
  minutes: number;
  seconds: number;
  startCountDown: () => void;
  resetCountDown: () => void;
}

export const CountdownContext = createContext({} as CountdownContextData);

const defaultStartTime = 25 * 60;
let countDownTimeout: NodeJS.Timeout;

export const CountdownContextProvider: React.FC = ({ children }) => {
  const { startNewChallenge } = useContext(ChallengeContext);
  const [time, setTime] = useState(defaultStartTime);
  const [isActive, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const startCountDown = () => {
    setActive(true);
  }

  const resetCountDown = () => {
    clearTimeout(countDownTimeout);
    setActive(false);
    setTime(defaultStartTime);
    setHasFinished(false);
  }

  useEffect(() => {

    if (isActive && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setActive(false);
      setHasFinished(true);
      startNewChallenge();
    }

  }, [isActive, time])


  return (
    <CountdownContext.Provider value={{
      isActive,
      hasFinished,
      minutes,
      seconds,
      startCountDown,
      resetCountDown
    }}>
      {children}
    </CountdownContext.Provider>
  )
}

