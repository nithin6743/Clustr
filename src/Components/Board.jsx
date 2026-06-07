import styles from './Board.module.css';
import glass from './GlassUI.module.css';

export default function Board() {
  return (
    <div className={`${styles.board} ${glass.glass}`}>
      <h3 className={styles.boardTitle}>Board</h3>
      <div className={styles.links}>
        <a href='#' className={styles.link}>
          Link 1
        </a>
        <a href='#' className={styles.link}>
          Link 2
        </a>
        <a href='#' className={styles.link}>
          Link 3
        </a>
        <a href='#' className={styles.link}>
          Link 4{' '}
        </a>
      </div>
    </div>
  );
}
