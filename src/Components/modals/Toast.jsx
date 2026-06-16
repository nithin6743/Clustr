import { useEffect } from 'react';
import styles from './Toast.module.css';

export default function Toast({ toast, setToast }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [toast, setToast]);

  return (
    <div
      className={`${styles.toast} ${toast.type === 'error' ? styles.error : styles.success}`}
    >
      {toast.message}
    </div>
  );
}
