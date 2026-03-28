import { useState } from 'react';
import styles from './Board.module.css';
import { useDraggable, useDroppable } from '@dnd-kit/core';

function Link({ link, boardId, setModal }) {
  const [isDragging, setIsDragging] = useState(false);
  const { setNodeRef: setDropRef } = useDroppable({
    id: link.id,
    data: { boardId },
  });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: link.id,
    data: { boardId },
    onDragStart: () => setIsDragging(true),
    onDragEnd: () => setIsDragging(false),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: transform ? 999 : 'auto',
    position: transform ? 'relative' : 'static',
  };

  return (
    <div
      ref={(node) => {
        setNodeRef(node); // draggable
        setDropRef(node); // droppable
      }}
      style={style}
      className={styles.links}
    >
      <div {...listeners} {...attributes} className={styles.dragHandle}>
        ☰
      </div>

      <a
        href={link.url}
        className={styles.linkContent}
        onClick={(e) => {
          if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <img src={link.favicon} />
        <span className={styles.linkText}>{link.title}</span>
      </a>

      <button
        className={styles.deleteLink}
        onClick={(e) => {
          e.stopPropagation();
          setModal({
            type: 'deleteLink',
            data: { boardId, linkId: link.id },
          });
        }}
      >
        <img src='/icons/delete.svg' />
      </button>
    </div>
  );
}

export default Link;
