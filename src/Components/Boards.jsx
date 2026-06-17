import { useState } from 'react';
import styles from './Boards.module.css';
import Board from './Board';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  useDroppable,
} from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

function ColumnDropZone({ columnId, children }) {
  const { setNodeRef } = useDroppable({
    id: columnId,
    data: {
      type: 'column',
      columnId,
    },
  });

  return (
    <div ref={setNodeRef} className={styles.column}>
      {children}
    </div>
  );
}

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
  reOrderBoards,
  moveBoard,
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

    if (active.data.current.type === 'board') {
      const sourceColumn = active.data.current.columnId;

      const overType = over.data?.current?.type;
      if (overType === 'link') {
        const targetBoardId = over.data.current.boardId;

        const targetBoard = boards.find((board) => board.id === targetBoardId);

        if (!targetBoard) {
          setActiveLink(null);
          return;
        }

        if (sourceColumn !== targetBoard.column) {
          moveBoard(sourceColumn, targetBoard.column, active.id);
        }

        setActiveLink(null);
        return;
      }

      if (overType === 'board' || overType === 'board-drop') {
        const targetColumn = over.data.current.columnId;

        const targetBoardId = over.data.current.boardId || over.id;

        if (sourceColumn === targetColumn) {
          reOrderBoards(sourceColumn, active.id, targetBoardId);
        } else {
          moveBoard(sourceColumn, targetColumn, active.id);
        }
      } else if (overType === 'column') {
        moveBoard(sourceColumn, over.data.current.columnId, active.id);
      }
      console.log({
        active: active.id,
        activeType: active.data?.current?.type,
        over: over?.id,
        overType: over?.data?.current?.type,
      });
      setActiveLink(null);
      return;
    }

    const sourceBoardId = active.data.current.boardId;
    const targetBoardId = over.data?.current?.boardId || over.id;
    // const targetLinkId = over.id;
    if (sourceBoardId === targetBoardId) {
      reOrderLinks(sourceBoardId, active.id, over.id);
      setActiveLink(null);
      return;
    }
    moveLink(sourceBoardId, targetBoardId, active.id, over.id);
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
          <ColumnDropZone key={columnId} columnId={columnId}>
            <SortableContext
              items={columnBoards.map((board) => board.id)}
              strategy={verticalListSortingStrategy}
            >
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
                  reOrderBoards={reOrderBoards}
                  moveBoard={moveBoard}
                />
              ))}
            </SortableContext>
          </ColumnDropZone>
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
