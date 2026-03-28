import { useState } from 'react';
import styles from './Board.module.css';
import Link from './Link';
import { useDroppable } from '@dnd-kit/core';

function Board({
  board,
  addLink,
  triggerResize,
  deleteLink,
  setModal,
  updateBoardTitle,
}) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const { setNodeRef } = useDroppable({
    id: board.id,
  });

  function handleAddLink() {
    if (!title || !url) return;

    const newLink = {
      id: Date.now(),
      title: title,
      url: url,
      favicon: `https://www.google.com/s2/favicons?domain=${url}`,
    };

    addLink(board.id, newLink);
    setTitle('');
    setUrl('');
    setShowForm(false);
  }

  return (
    <div ref={setNodeRef} className={styles.board}>
      <div className={styles.boardContent}>
        <div className={styles.boardHeader}>
          {isEditing ? (
            <input
              className={styles.editInput}
              value={newTitle}
              autoFocus
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={() => {
                updateBoardTitle(board.id, newTitle.trim());
                setIsEditing(false);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  updateBoardTitle(board.id, newTitle.trim());
                  setIsEditing(false);
                }
                if (e.key === 'Escape') {
                  setNewTitle(board.title);
                  setIsEditing(false);
                }
              }}
            />
          ) : (
            <h3 className={styles.boardTitle}>{board.title}</h3>
          )}

          <div className={styles.titleActions}>
            {!isEditing && board.id !== 'imported' && (
              <button
                className={styles.boardEdit}
                onClick={() => {
                  setNewTitle(board.title);
                  setIsEditing(true);
                }}
              >
                <img src='/icons/edit.svg' />
              </button>
            )}
            <button
              className={styles.addLink}
              onClick={() => {
                setShowForm((prev) => !prev);

                setTimeout(() => {
                  triggerResize();
                }, 0);
              }}
            >
              <img src='/icons/link.svg' />
            </button>
            {board.id !== 'imported' && (
              <button
                className={styles.boardDelete}
                onClick={() => {
                  setModal({
                    type: 'deleteBoard',
                    data: { boardId: board.id },
                  });
                }}
              >
                <img src='/icons/delete.svg' />
              </button>
            )}
          </div>
        </div>

        {board.links.map((link) => (
          <Link
            link={link}
            key={link.id}
            deleteLink={deleteLink}
            boardId={board.id}
            setModal={setModal}
          />
        ))}
      </div>
      {showForm && (
        <form
          className={styles.addLinkForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleAddLink();
          }}
        >
          <input
            className={styles.addLinkTitle}
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className={styles.addLinkUrl}
            placeholder='URL'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button type='submit'>Add</button>
        </form>
      )}
    </div>
  );
}

export default Board;
