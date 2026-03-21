import { useState } from 'react';
import styles from './Board.module.css';
import Link from './Link';

function Board({ board, addLink, triggerResize }) {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

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
    <div className={styles.board}>
      <div className={styles.boardContent}>
        <div className={styles.boardHeader}>
          <h3 className={styles.boardTitle}>{board.title}</h3>
          <div className={styles.titleActions}>
            <button className={styles.boardEdit}>
              <img src='/icons/edit.svg' />
            </button>
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
            <button className={styles.boardDelete}>
              <img src='/icons/delete.svg' />
            </button>
          </div>
        </div>

        {board.links.map((link) => (
          <Link link={link} key={link.id} />
        ))}
      </div>
      {showForm && (
        <div className={styles.addLinkForm}>
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
          <button onClick={handleAddLink}>Add</button>
        </div>
      )}
    </div>
  );
}

export default Board;
