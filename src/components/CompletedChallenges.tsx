import React, { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export const CompletedChallenges: React.FC = () => {
  const { challengesCompleted } = useContext(ChallengeContext);
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Completed challenges</span>
      <span>{challengesCompleted}</span>
    </div>
  );
}
