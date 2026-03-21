import styles from './Boards.module.css';
import Board from './Board';

function Boards() {
  return (
    <div className={styles.boards}>
      <Board />
      <Board />
      <Board />
      <Board />
    </div>
  );
}

export default Boards;
