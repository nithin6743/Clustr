import styles from './Boards.module.css';
import Board from './Board';
import { useEffect, useRef } from 'react';

function Boards({ boards, addLink, deleteLink }) {
  const boardsRef = useRef(null);

  const resizeAll = () => {
    const grid = boardsRef.current;
    if (!grid) return;

    const rowHeight = 10;
    const rowGap = 25;

    const items = grid.children;

    Array.from(items).forEach((item) => {
      const height = item.getBoundingClientRect().height;
      const span = Math.ceil((height + rowGap) / (rowHeight + rowGap));

      item.style.gridRowEnd = `span ${span}`;
    });
  };

  useEffect(() => {
    setTimeout(resizeAll, 0);

    window.addEventListener('resize', resizeAll);
    return () => window.removeEventListener('resize', resizeAll);
  }, [boards]);

  return (
    <div ref={boardsRef} className={styles.boards}>
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          addLink={addLink}
          triggerResize={resizeAll}
          deleteLink={deleteLink}
        />
      ))}
    </div>
  );
}

export default Boards;
