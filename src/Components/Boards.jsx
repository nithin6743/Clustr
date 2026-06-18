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

  const [activeDragItem, setActiveDragItem] = useState(null);
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
      setActiveDragItem(null);
      return;
    }

    if (active.data.current.type === 'board') {
      const sourceColumn = active.data.current.columnId;

      const overType = over.data?.current?.type;
      if (overType === 'link') {
        const targetBoardId = over.data.current.boardId;

        const targetBoard = boards.find((board) => board.id === targetBoardId);

        if (!targetBoard) {
          setActiveDragItem(null);
          return;
        }

        if (sourceColumn !== targetBoard.column) {
          moveBoard(sourceColumn, targetBoard.column, active.id);
        }

        setActiveDragItem(null);
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
      setActiveDragItem(null);
      return;
    }

    const sourceBoardId = active.data.current.boardId;

    const overType = over.data?.current?.type;

    // Don't allow dropping links on columns
    if (overType === 'column') {
      setActiveDragItem(null);
      return;
    }

    const targetBoardId = over.data?.current?.boardId || over.id;

    const targetLinkId = overType === 'board-drop' ? null : over.id;

    if (sourceBoardId === targetBoardId) {
      if (targetLinkId) {
        reOrderLinks(sourceBoardId, active.id, targetLinkId);
      }

      setActiveDragItem(null);
      return;
    }

    moveLink(sourceBoardId, targetBoardId, active.id, targetLinkId);

    setActiveDragItem(null);
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        if (active.data.current.type === 'link') {
          setActiveDragItem({
            type: 'link',
            item: active.data.current.link,
          });
        }

        if (active.data.current.type === 'board') {
          setActiveDragItem({
            type: 'board',
            item: active.data.current.board,
          });
        }
      }}
      onDragCancel={() => {
        setActiveDragItem(null);
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
              {columnBoards.length === 0 && (
                <div
                  className={
                    settings.darkMode
                      ? styles.emptyColumnDark
                      : styles.emptyColumnLight
                  }
                >
                  Drop Boards Here
                </div>
              )}
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
        {activeDragItem?.type === 'link' && (
          <div className={styles.dragPreview}>{activeDragItem.item.title}</div>
        )}

        {activeDragItem?.type === 'board' && (
          <div className={styles.boardDragPreview}>
            <h3>{activeDragItem.item.title}</h3>

            <span>{activeDragItem.item.links.length} links</span>
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
