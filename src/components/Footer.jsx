import styles from './Board.module.css';

function Footer({ setModal, importBookmarks }) {
  return (
    <footer className={styles.footer}>
      <button className={styles.refreshBoards} onClick={importBookmarks}>
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
