import React, { createContext, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookie from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';
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
  closeModal: () => void;
}

interface ChallengeContextProps {
  children: React.ReactNode;
  level: number;
  challengesCompleted: number;
  currentExperience: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export const ChallengeContextProvider: React.FC = ({
  children,
  ...rest
}: ChallengeContextProps) => {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [showModal, setShowModal] = useState(false);
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
  const [currentChallenge, setCurrentChallenge] = useState(null);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, [])

  useEffect(() => {
    Cookie.set('level', String(level));
    Cookie.set('currentExperience', String(currentExperience));
    Cookie.set('challengesCompleted', String(challengesCompleted));

  }, [level, currentExperience, challengesCompleted]);

  const closeModal = () => {
    setShowModal(false);
  }

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
    setShowModal(true);
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
        completeChallenge,
        closeModal
      }
    }>
      {children}

      { showModal &&
        <LevelUpModal />
      }

    </ChallengeContext.Provider>
  );
}
