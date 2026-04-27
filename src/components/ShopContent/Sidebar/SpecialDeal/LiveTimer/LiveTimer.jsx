import { useState, useEffect, useRef } from 'react';
import styles from './LiveTimer.module.css';

const INITIAL_SECONDS = 3599;

const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};

const LiveTimer = () => {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_SECONDS);
  const [isActive, setIsActive] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isExpired || !isActive) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return; // Если таймер истёк или не активен – очищаем интервал
    }

    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsExpired(true);
            setIsActive(false);
            return 0;
          }
          return prev - 1; // Если активен и ещё не истёк – запускаем интервал
        });
      }, 1000);
    }

    return () => {  // Очистка при размонтировании или изменении зависимостей
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, isExpired]);

  const handleToggle = () => {
    if (!isExpired) setIsActive(prev => !prev);
  };

  const handleRestart = () => {
    if (isExpired) {
      setSecondsLeft(INITIAL_SECONDS);
      setIsExpired(false);
      setIsActive(true);
    } else {
      setSecondsLeft(INITIAL_SECONDS);
    }
  };

  return (
    <div className={styles.timerWrapper}>
      <div className={styles.timerDisplay}>
        {isExpired ? 'Time out' : formatTime(secondsLeft)}
      </div>
      <div className={styles.controls}>
        <button onClick={handleToggle} disabled={isExpired}>
          {isActive ? 'Stop' : 'Start'}
        </button>
        <button onClick={handleRestart} className={styles.controls}>
          Restart
        </button>
      </div>
    </div>
  );
};

export default LiveTimer;