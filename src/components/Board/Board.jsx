import styles from './Board.module.css';

function Board() {
  return (
    <div className={styles.board}>
      <div className={styles.boardContent}>
        <div className={styles.boardHeader}>
          <h3 className={styles.boardTitle}>Bookmarks</h3>
          <div className={styles.titleActions}>
            <button className={styles.addLink}>
              <img src='/icons/link.png' />
            </button>
            <button className={styles.boardSettings}>
              <img src='/icons/options.png' />
            </button>
          </div>
        </div>

        <a href='https://google.com' className={styles.links}>
          <img src='/icons/youtube.png' />
          <span className={styles.linkText}>
            jfbndfkjbndfjfbdfbdfbdfbdfbdfbdfbdfbdf
          </span>
        </a>
      </div>
      <div className={styles.addLink}></div>
    </div>
  );
}

export default Board;
