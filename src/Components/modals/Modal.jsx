import styles from './Modal.module.css';

export default function Modal({ children }) {
  return (
    <div className={styles.backDrop}>
      <div className={styles.searchModal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
