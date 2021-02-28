import React, { createContext, useState } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
  type: 'eye' | 'body';
  amount: number;
  description: string;
}

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  experienceToNextLevel: number;
  currentChallenge: Challenge;
  challengesCompleted: number;
  levelUp: () => void;
  resetChallenge: () => void;
  startNewChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export const ChallengeContextProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const resetChallenge = () => {
    setCurrentChallenge(null);
  }

  const levelUp = () => {
    setLevel(level + 1);
  }

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    setCurrentChallenge(challenges[randomChallengeIndex]);
  }

  return (
    <ChallengeContext.Provider value={
      {
        level,
        currentExperience,
        challengesCompleted,
        currentChallenge,
        experienceToNextLevel,
        resetChallenge,
        levelUp,
        startNewChallenge
      }
    }>
      {children}
    </ChallengeContext.Provider>
  );
}
