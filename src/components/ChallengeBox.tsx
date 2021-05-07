import React, { useContext } from 'react';
import { ChallengeContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/ChallengeBox.module.css';

export const ChallengeBox: React.FC = () => {

  const {
    currentChallenge,
    completeChallenge,
    resetChallenge
  } = useContext(ChallengeContext);

  const {
    resetCountDown
  } = useContext(CountdownContext);

  const handleChallengeCompleted = () => {
    completeChallenge();
    resetCountDown();
    resetChallenge();
  }

  const handleChallengeFailed = () => {
    resetCountDown();
    resetChallenge();
  }

  return (
    <div className={styles.challengeBoxContainer}>

      {
        currentChallenge ?
          (
            <div className={styles.challengeActive}>
              <header>Gain {currentChallenge.amount} XP</header>
              <main>
                <img src={`icons/${currentChallenge.type}.svg`} alt="Holding Halteres" />
                <strong>New challenge</strong>
                <p>{currentChallenge.description}</p>
              </main>

              <footer>
                <button
                  type="button"
                  className={styles.challengeFailedButton}
                  onClick={handleChallengeFailed}
                >
                  Failed
                </button>
                <button
                  type="button"
                  className={styles.challengeSucceededButton}
                  onClick={handleChallengeCompleted}
                >
                  Completed
                </button>
              </footer>
            </div>
          )
          :
          (
            <div className={styles.challengeNotActive}>
              <strong>
                Finish a cycle to receive a challenge              </strong>
              <p>
                <img src="icons/level-up.svg" alt="Level up" />
Level Up by Completing the challenges              </p>
            </div>
          )
      }
    </div >
  )
}