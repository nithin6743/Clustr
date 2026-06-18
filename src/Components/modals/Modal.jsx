import styles from './Modal.module.css';

export default function Modal({ children, closeModal, disableClose = false }) {
  return (
    <div
      className={styles.backDrop}
      onClick={() => {
        if (!disableClose) {
          closeModal?.();
        }
      }}
    >
      <div className={styles.searchModal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
