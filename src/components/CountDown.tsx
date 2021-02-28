import React, { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';

import styles from '../styles/components/CountDown.module.css';

export const CountDown: React.FC = () => {

  const {
    isActive,
    hasFinished,
    minutes,
    seconds,
    startCountDown,
    resetCountDown
  } = useContext(CountdownContext);

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      {
        hasFinished ? (
          <button
            disabled
            className={`${styles.countdownButton} ${styles.countdownButtonFinished} `}
          >Ciclo Finalizado
            <img src="icons/check-circle.svg" alt="Close" />
          </button>
        ) :
          (
            <>
              {
                isActive ?
                  (
                    <button
                      onClick={resetCountDown}
                      type="button"
                      className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    > Abandonar ciclo

                      <img src="icons/x.svg" alt="Close" />
                    </button>
                  ) :
                  (
                    <button
                      onClick={startCountDown}
                      type="button"
                      className={styles.countdownButton}
                    >Iniciar ciclo
                      <img src="icons/play.svg" alt="Play" />
                    </button>
                  )
              }</>
          )
      }
    </>
  );
}
