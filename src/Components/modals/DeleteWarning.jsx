import { useEffect } from 'react';
import styles from './DeleteWarning.module.css';

export default function DeleteWarning({ title, message, onConfirm, setModal }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        setModal(null);
      }
      if (e.key === 'Enter') {
        onConfirm();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <div className={styles.deleteWarning}>
      <h3>{title}</h3>
      <p>{message}</p>
      <div className={styles.buttons}>
        <button className={styles.cancel} onClick={() => setModal(null)}>
          Cancel
        </button>
        <button className={styles.delete} onClick={onConfirm}>
          Delete
        </button>
      </div>
    </div>
  );
}
