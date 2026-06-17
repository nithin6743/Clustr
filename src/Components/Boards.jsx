import styles from './Boards.module.css';
import Board from './Board';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';

export default function Boards({
  boards,
  settings,
  setModal,
  addLink,
  editBoardTitle,
  editLink,
  setToast,
  reOrderLinks,
  moveLink,
}) {
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

  const [activeLink, setActiveLink] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 8,
      },
    })
  );

  function handleDragEnd({ active, over }) {
    if (!over) {
      setActiveLink(null);
      return;
    }

    const sourceBoardId = active.data.current.boardId;

    const targetBoardId = over.data?.current?.boardId || over.id;

    if (sourceBoardId === targetBoardId) {
      reOrderLinks(sourceBoardId, active.id, over.id);

      setActiveLink(null);
      return;
    }

    moveLink(sourceBoardId, targetBoardId, active.id);

    setActiveLink(null);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActiveLink(active.data.current.link);
      }}
      onDragCancel={() => {
        setActiveLink(null);
      }}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.boards}>
        {Object.entries(columns).map(([columnId, columnBoards]) => (
          <div key={columnId} className={styles.column}>
            {columnBoards.map((board) => (
              <Board
                key={board.id}
                board={board}
                settings={settings}
                setModal={setModal}
                addLink={addLink}
                editBoardTitle={editBoardTitle}
                editLink={editLink}
                setToast={setToast}
                reOrderLinks={reOrderLinks}
                moveLink={moveLink}
              />
            ))}
          </div>
        ))}
      </div>
      <DragOverlay>
        {activeLink ? (
          <div className={styles.dragPreview}>{activeLink.title}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
