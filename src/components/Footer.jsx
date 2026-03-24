import styles from './Board.module.css';

function Footer({ setModal }) {
  return (
    <footer className={styles.footer}>
      <button className={styles.refreshBoards}>
        <img src='/icons/refresh.svg' />
      </button>
      <button
        className={styles.addBoards}
        onClick={() => setModal({ type: 'addBoard' })}
      >
        <img src='/icons/add.svg' />
      </button>
    </footer>
  );
}

export default Footer;
