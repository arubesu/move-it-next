import React, { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/ExperienceBar.module.css'

export const ExperienceBar: React.FC = () => {

  const {
    currentExperience,
    experienceToNextLevel
  } = useContext(ChallengeContext);

  const progressBar = Math.round((currentExperience * 100) / experienceToNextLevel);

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div style={{ width: `${progressBar}%` }}></div>
        <span
          className={styles.currentExperience}
          style={{ left: `${progressBar}%` }}>{currentExperience} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
