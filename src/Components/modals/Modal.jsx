import styles from './Modal.module.css';

export default function Modal({ children, setAddBoardButton }) {
  return (
    <div className={styles.backDrop} onClick={() => setAddBoardButton(false)}>
      <div className={styles.searchModal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
