import React, { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';

import styles from '../styles/components/LevelUpModal.module.css';

export const LevelUpModal: React.FC = () => {
  const { level, closeModal } = useContext(ChallengeContext);
  return <div className={styles.overlay}>
    <div className={styles.container}>
      <header>{level}</header>
      <strong>Congratulations</strong>
      <p>You have achieved a new level</p>
      <button onClick={closeModal}>
        <img src="icons/close.svg" alt="Close Modal" />
      </button>
    </div>
  </div >;
}
