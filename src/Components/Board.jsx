import { useState } from 'react';
import styles from './Board.module.css';
import glass from './GlassUI.module.css';
import Link from './Link';

export default function Board({
  board,
  settings,
  setModal,
  addLink,
  editBoardTitle,
  editLink,
}) {
  const [showAddLink, setShowAddLink] = useState(false);
  const [EditingTitle, setEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState(board.title);
  const [url, setUrl] = useState('');

  return (
    <div
      className={`${styles.board} ${settings.darkMode ? glass.glassDark : glass.glassLight}`}
    >
      <div
        className={
          settings.darkMode ? styles.boardBoxDark : styles.boardBoxLight
        }
      >
        <div className={styles.boardTop}>
          {EditingTitle ? (
            <input
              className={styles.editingtitle}
              type='text'
              value={newTitle}
              autoFocus
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={() => {
                const trimmedTitle = newTitle.trim();

                if (trimmedTitle) {
                  editBoardTitle(board.id, trimmedTitle);
                }
                setEditingTitle(false);
              }}
            />
          ) : (
            <h3
              className={styles.boardTitle}
              style={
                settings.darkMode ? { color: '#ffff' } : { color: '#101010c1' }
              }
            >
              {board.title}{' '}
            </h3>
          )}
          <div className={styles.boardIcons}>
            {!EditingTitle && (
              <button
                className={styles.editIcon}
                // title='Edit Board'
                onClick={() => {
                  setEditingTitle(true);
                  setNewTitle(board.title);
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
            )}
            <button
              className={styles.addIcon}
              // title='Add Link'
              onClick={() => setShowAddLink(true)}
            >
              <svg
                // className={styles.addIcon}
                xmlns='http://www.w3.org/2000/svg'
                width='1em'
                height='1em'
                viewBox='0 0 24 24'
              >
                <path d='M0 0h24v24H0z' fill='none' />
                <path
                  fill={settings.darkMode ? '#fff' : '#101010c1'}
                  d='M17 17h-2.025q-.425 0-.7-.288T14 16t.288-.712T15 15h2v-2q0-.425.288-.712T18 12t.713.288T19 13v2h2q.425 0 .713.288T22 16t-.288.713T21 17h-2v2q0 .425-.288.713T18 20t-.712-.288T17 19zm-7 0H7q-2.075 0-3.537-1.463T2 12t1.463-3.537T7 7h3q.425 0 .713.288T11 8t-.288.713T10 9H7q-1.25 0-2.125.875T4 12t.875 2.125T7 15h3q.425 0 .713.288T11 16t-.288.713T10 17m-1-4q-.425 0-.712-.288T8 12t.288-.712T9 11h6q.425 0 .713.288T16 12t-.288.713T15 13zm13-1h-2q0-1.25-.875-2.125T17 9h-3.025q-.425 0-.7-.288T13 8t.288-.712T14 7h3q2.075 0 3.538 1.463T22 12'
                />
              </svg>
            </button>

            {board.id === 'imported' ? (
              ''
            ) : (
              <button
                className={styles.deleteIcon}
                // title='Delete Board'
                onClick={() =>
                  setModal({
                    type: 'deleteBoard',
                    boardId: board.id,
                    boardTitle: board.title,
                  })
                }
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
            )}
          </div>
        </div>
      </div>
      <>
        <div className={styles.links}>
          {board.links.map((link) => {
            return (
              <Link
                key={link.id}
                link={link}
                settings={settings}
                setModal={setModal}
                boardId={board.id}
                editLink={editLink}
              />
            );
          })}
          {showAddLink && (
            <form
              onSubmit={(e) => {
                e.preventDefault();

                if (!url.trim()) {
                  alert('empty url');
                  return;
                }

                addLink(board.id, url);

                setUrl('');
                setShowAddLink(false);
              }}
            >
              <input
                className={styles.addLink}
                type='url'
                placeholder='Enter url...'
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />

              <div className={styles.addLinkButtons}>
                <button
                  type='button'
                  onClick={() => {
                    setUrl('');
                    setShowAddLink(false);
                  }}
                  style={{
                    color: 'rgb(255, 216, 162)',
                    backgroundColor: 'transparent',
                    border: '1.5px solid rgb(252, 169, 53)',
                  }}
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  style={{
                    color: 'rgb(255, 255, 255)',
                    backgroundColor: 'rgb(252, 169, 53',
                    border: '1.5px solid rgb(252, 169, 53)',
                  }}
                >
                  Add
                </button>
              </div>
            </form>
          )}
        </div>
      </>
    </div>
  );
}
