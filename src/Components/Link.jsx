import { useState } from 'react';
import styles from './Link.module.css';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function Link({
  link,
  settings,
  setModal,
  boardId,
  editLink,
  setToast,
}) {
  const [editingLink, setEditingLink] = useState(false);
  const [newTitle, setNewTitle] = useState(link.title);
  const [newUrl, setNewUrl] = useState(link.url);
  const [pressing, setPressing] = useState(false);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: link.id,
    data: {
      boardId,
      columnId: null,
      type: 'link',
      link,
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 250ms cubic-bezier(0.22,1,0.36,1)',
  };

  return editingLink ? (
    <div className={styles.editingLink}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = newTitle.trim();
          const url = newUrl.trim();

          if (!title || !url) {
            setTimeout(() => {
              setToast({
                id: crypto.randomUUID(),
                type: 'error',
                message: 'Title and url cannot be empty for a link',
              });
            }, 150);
            return;
          }
          editLink(boardId, link.id, title, url);
          setEditingLink(false);
        }}
        // onBlur={() => {
        //   setEditingLink(false);
        //   setNewTitle(link.title);
        //   setNewUrl(link.url);
        // }}
      >
        <input
          className={styles.newLinkTitle}
          type='text'
          value={newTitle}
          autoFocus
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setEditingLink(false);
              setNewTitle(link.title);
              setNewUrl(link.url);
            } else if (e.key === 'Enter') {
              e.currentTarget.form.requestSubmit();
            }
          }}
        />
        <input
          className={styles.newLinkUrl}
          type='url'
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setEditingLink(false);
              setNewTitle(link.title);
              setNewUrl(link.url);
            } else if (e.key === 'Enter') {
              e.currentTarget.form.requestSubmit();
            }
          }}
        />
        <div className={styles.editLinkButtons}>
          <button
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setEditingLink(false);
              setNewTitle(link.title);
              setNewUrl(link.url);
            }}
          >
            Cancel
          </button>
          <button type='submit'>Done</button>
        </div>
      </form>
    </div>
  ) : (
    <div
      ref={setNodeRef}
      style={style}
      className={`
  ${styles.link}
  ${settings.darkMode ? styles.linkDark : styles.linkLight}
  
`}
    >
      <div
        className={`${styles.dragHandle} ${
          pressing ? styles.pressingHandle : ''
        }`}
        {...attributes}
        {...listeners}
        onMouseDown={() => setPressing(true)}
        onMouseUp={() => setPressing(false)}
        onMouseLeave={() => setPressing(false)}
        style={{ color: settings.darkMode ? '#ffff' : '#000000' }}
      >
        ⋮⋮
      </div>
      <a href={link.url} className={styles.linkAddress}>
        <img src={`https://www.google.com/s2/favicons?domain=${link.url}`} />
        <span
          className={styles.linkText}
          style={
            settings.darkMode ? { color: '#ffff' } : { color: '#101010c1' }
          }
        >
          {link.title}
        </span>
      </a>
      <div className={styles.linkIcons}>
        <button
          className={styles.editIcon}
          //   title='Edit Board'
          onClick={() => {
            setEditingLink(true);
            setNewTitle(link.title);
            setNewUrl(link.url);
          }}
        >
          <svg
            // className={styles.editIcon}
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 1024 1024'
          >
            <path d='M0 0h1024v1024H0z' fill='none' />
            <path
              fill={settings.darkMode ? '#fafafa' : '#101010c1'}
              d='M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640z'
            />
            <path
              fill={settings.darkMode ? '#fafafa' : '#101010c1'}
              d='m470 554.2l52.8-7.5L847 222.4a32 32 0 1 0-45.2-45.2L477.4 501.4l-7.5 52.8zm422.4-422.4a96 96 0 0 1 0 135.8L560.5 599.5a32 32 0 0 1-18.1 9l-105.6 15.2a32 32 0 0 1-36.2-36.2l15-105.6a32 32 0 0 1 9.1-18.2l332-331.8a96 96 0 0 1 135.7 0z'
            />
          </svg>
        </button>
        <button
          className={styles.deleteIcon}
          //   title='Delete Board'
          onClick={() => {
            setModal({
              type: 'deleteLink',
              boardId,
              linkId: link.id,
              linkTitle: link.title,
            });
          }}
        >
          <svg
            // className={styles.deleteIcon}
            xmlns='http://www.w3.org/2000/svg'
            width='1em'
            height='1em'
            viewBox='0 0 24 24'
          >
            <path d='M0 0h24v24H0z' fill='none' />
            <path
              fill='#fb6d6d'
              d='M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-6.287 10.713Q11 16.425 11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17t.713-.288m4 0Q15 16.426 15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17t.713-.288M7 6v13z'
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
