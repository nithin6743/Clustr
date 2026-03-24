import { useEffect, useState } from 'react';
import styles from './Board.module.css';

function Clock() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  );

  useEffect(function () {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <h1 className={styles.time}>{time}</h1>;
}

export default Clock;
