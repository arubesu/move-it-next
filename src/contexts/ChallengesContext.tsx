import React, { createContext, useState } from 'react';

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  levelUp: () => void;
  startNewChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export const ChallengeContextProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState(0);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);

  const levelUp = () => {
    setLevel(level + 1);
  }

  const startNewChallenge = () => {
    console.log('New Challenge');
  }

  return (
    <ChallengeContext.Provider value={
      {
        level,
        currentExperience,
        challengesCompleted,
        levelUp,
        startNewChallenge
      }
    }>
      {children}
    </ChallengeContext.Provider>
  );
}
