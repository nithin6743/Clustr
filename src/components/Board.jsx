import styles from './Board.module.css';
import Links from './Links';

function Board() {
  return (
    <div className={styles.board}>
      <div className={styles.boardContent}>
        <div className={styles.boardHeader}>
          <h3 className={styles.boardTitle}>Bookmarks</h3>
          <div className={styles.titleActions}>
            <button className={styles.addLink}>
              <img src='/icons/link.svg' />
            </button>
            <button className={styles.boardDelete}>
              <img src='/icons/delete.svg' />
            </button>
          </div>
        </div>

        <Links />
      </div>
      <div className={styles.addLinkForm}></div>
    </div>
  );
}

export default Board;
