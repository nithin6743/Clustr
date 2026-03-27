import styles from './Board.module.css';

function Modal({ children, closeModal, modal }) {
  const isWelcome = modal?.type === 'welcome';

  return (
    <div
      className={styles.overlay}
      onClick={!isWelcome ? closeModal : undefined}
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

export default Modal;
