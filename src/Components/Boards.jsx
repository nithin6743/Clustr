import styles from './Boards.module.css';
import Board from './Board';

export default function Boards({ boards }) {
  const columns = {
    col1: [],
    col2: [],
    col3: [],
    col4: [],
  };

  boards.forEach((board) => {
    columns[board.column].push(board);
  });

  Object.values(columns).forEach((column) => {
    column.sort((a, b) => a.position - b.position);
  });

  return (
    <div className={styles.boards}>
      {Object.entries(columns).map(([columnId, columnBoards]) => (
        <div key={columnId} className={styles.column}>
          {columnBoards.map((board) => (
            <Board key={board.id} board={board} />
          ))}
        </div>
      ))}
    </div>
  );
}
