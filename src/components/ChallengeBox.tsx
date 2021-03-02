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
              <header>Ganhe {currentChallenge.amount} XP</header>
              <main>
                <img src={`icons/${currentChallenge.type}.svg`} alt="Holding Halteres" />
                <strong>Novo desafio</strong>
                <p>{currentChallenge.description}</p>
              </main>

              <footer>
                <button
                  type="button"
                  className={styles.challengeFailedButton}
                  onClick={handleChallengeFailed}
                >
                  Falhei
                </button>
                <button
                  type="button"
                  className={styles.challengeSucceededButton}
                  onClick={handleChallengeCompleted}
                >
                  Completei
                </button>
              </footer>
            </div>
          )
          :
          (
            <div className={styles.challengeNotActive}>
              <strong>
                Finalize um ciclo para receber um desafio
              </strong>
              <p>
                <img src="icons/level-up.svg" alt="Level up" />
                Avance de level completando os desafio
              </p>
            </div>
          )
      }
    </div >
  )
}