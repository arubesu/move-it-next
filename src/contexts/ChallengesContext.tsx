import React, { createContext, useEffect, useState } from 'react';
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
  completeChallenge: () => void;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export const ChallengeContextProvider: React.FC = ({ children }) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [challengesCompleted, setChallengesCompleted] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  const resetChallenge = () => {
    setCurrentChallenge(null);
  }

  const completeChallenge = () => {
    if (!currentChallenge)
      return;

    let acquiredExperience = currentExperience + currentChallenge.amount;

    if (acquiredExperience >= experienceToNextLevel) {
      levelUp();
      acquiredExperience -= experienceToNextLevel;
    }
    setCurrentExperience(acquiredExperience);
    setChallengesCompleted(challengesCompleted + 1);
  }

  const levelUp = () => {
    setLevel(level + 1);
  }

  const startNewChallenge = () => {

    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    let challenge = challenges[randomChallengeIndex]
    setCurrentChallenge(challenge);

    new Audio('/notification.mp3').play();

    if (Notification.permission === 'granted') {
      new Notification(
        'Novo desafio 🎉',
        {
          body: `valendo ${challenge.amount} XP`,
          icon: '/favicon.png'
        });
    }
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
        startNewChallenge,
        completeChallenge
      }
    }>
      {children}
    </ChallengeContext.Provider>
  );
}
