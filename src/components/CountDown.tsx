import React, { useEffect, useState } from 'react';

import styles from '../styles/components/CountDown.module.css';

const defaultStartTime = 0.05 * 60;
let countDownTimeout: NodeJS.Timeout;

export const CountDown: React.FC = () => {
  const [time, setTime] = useState(defaultStartTime);
  const [active, setActive] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

  const startCountDown = () => {
    setActive(true);
  }

  const resetCountDown = () => {
    clearTimeout(countDownTimeout);
    setActive(false);
    setTime(defaultStartTime);
  }

  useEffect(() => {

    if (active && time > 0) {
      countDownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (active && time === 0) {
      setActive(false);
      setHasFinished(true);
    }

  }, [active, time])

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
            className={styles.countdownButton}
          >Ciclo Finalizado
          </button>
        ) :
          (
            <>
              {
                active ?
                  (
                    <button
                      onClick={resetCountDown}
                      type="button"
                      className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
                    > Abandonar ciclo
                    </button>
                  ) :
                  (
                    <button
                      onClick={startCountDown}
                      type="button"
                      className={styles.countdownButton}
                    >Iniciar ciclo
                    </button>
                  )
              }</>
          )
      }
    </>
  );
}
