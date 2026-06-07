import styles from './Boards.module.css';
import Board from './Board';

export default function Boards() {
  return (
    <div className={`${styles.boards}`}>
      <div className={`${styles.col1}`}>
        <Board />
        <Board />
      </div>
      <div className={`${styles.col2}`}>
        <Board />
        <Board />
        <Board />
      </div>
      <div className={`${styles.col3}`}>
        <Board />
      </div>
      <div className={`${styles.col4}`}>
        <Board />
        <Board/>
      </div>
    </div>
  );
}
