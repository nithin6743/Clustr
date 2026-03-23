import styles from './Board.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <button className={styles.refreshBoards}>
        <img src='/icons/refresh.svg' />
      </button>
      <button className={styles.addBoards}>
        <img src='/icons/add.svg' />
      </button>
    </footer>
  );
}

export default Footer;
