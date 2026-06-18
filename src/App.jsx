import { useState, useEffect } from 'react';
import './index.css';
import TopBar from './Components/TopBar.jsx';
import Boards from './Components/Boards.jsx';
import SearchModal from './Components/modals/SearchModal.jsx';
import DeleteWarning from './Components/modals/DeleteWarning.jsx';
import Modal from './Components/modals/Modal.jsx';
import AddBoard from './Components/AddBoard.jsx';
import Settings from './Components/Settings.jsx';
import Toast from './Components/modals/Toast.jsx';
import { arrayMove } from '@dnd-kit/sortable';

function App() {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem('clustr-boards');

    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [modal, setModal] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addBoardButton, setAddBoardButton] = useState(false);
  const [toast, setToast] = useState(null);
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('clustr-settings');

    return saved
      ? JSON.parse(saved)
      : {
          darkMode: true,
          showSearchBar: true,
          showQuickLinks: true,
          animatedBackground: true,
        };
  });

  // search logic
  const allLinks = (boards || []).flatMap((board) =>
    board.links.map((link) => ({
      ...link,
      boardId: board.id,
      boardTitle: board.title,
    }))
  );

  const startsWithMatches = [];
  const includesMatches = [];

  allLinks.forEach((link) => {
    const title = link.title.toLowerCase();
    const query = searchQuery.toLowerCase();

    if (title.startsWith(query)) {
      startsWithMatches.push(link);
    } else if (title.includes(query)) {
      includesMatches.push(link);
    }
  });

  const results = [...startsWithMatches, ...includesMatches];

  // add board logic
  function addboard(title, column) {
    const position = boards.filter((board) => board.column === column).length;
    const newBoard = {
      id: crypto.randomUUID(),
      title,
      column,
      position,
      links: [],
    };

    setBoards((prev) => [...prev, newBoard]);
    setToast({
      id: crypto.randomUUID(),
      type: 'success',
      message: 'Board created',
    });
  }

  // edit board title
  function editBoardTitle(boardId, newTitle) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId ? { ...board, title: newTitle } : board
      )
    );
    setTimeout(() => {
      setToast({
        id: crypto.randomUUID(),
        type: 'success',
        message: 'Board title updated',
      });
    }, 150);
  }

  // delete board logic
  function deleteBoard(boardId) {
    setBoards((prev) => prev.filter((board) => board.id !== boardId));
    setTimeout(() => {
      setToast({
        id: crypto.randomUUID(),
        type: 'success',
        message: 'Board deleted',
      });
    }, 150);
  }

  // add links logic
  function addLink(boardId, url) {
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      setTimeout(() => {
        setToast({
          id: crypto.randomUUID(),
          type: 'error',
          message: 'Failed to add link (empty url)',
        });
      }, 150);
      return;
    }
    const hostname = parsedUrl.hostname.replace(/^www\./, '');
    let title;
    const slug = parsedUrl.pathname.split('/').filter(Boolean).pop();
    if (slug && slug.length > 5 && slug.includes('-')) {
      title = slug.replace(/^\d+-/, '').replace(/-/g, ' ');
    } else {
      const parts = hostname.split('.');
      title = parts.length > 2 ? parts[parts.length - 2] : parts[0];
    }
    const displayTitle = title
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const targetBoard = boards.find((board) => board.id === boardId);

    const newLink = {
      id: crypto.randomUUID(),
      title: displayTitle,
      url,
      hostname,
      position: targetBoard.links.length,
    };
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== boardId) return board;
        const dupLinkExist = board.links.some((link) => link.url === url);
        if (dupLinkExist) {
          setTimeout(() => {
            setToast({
              id: crypto.randomUUID(),
              type: 'error',
              message: 'Link already exists in that board',
            });
          }, 150);
          return board;
        }
        return {
          ...board,
          links: [...board.links, newLink],
        };
      })
    );
    setTimeout(() => {
      setToast({
        id: crypto.randomUUID(),
        type: 'success',
        message: 'Link added',
      });
    }, 150);
  }

  // edit link
  function editLink(boardId, linkId, title, url) {
    let hostname;

    try {
      hostname = new URL(url).hostname;
    } catch {
      setTimeout(() => {
        setToast({
          id: crypto.randomUUID(),
          type: 'error',
          message: 'link edit failed (Invalid url)',
        });
      }, 150);
      return;
    }

    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              links: board.links.map((link) =>
                link.id === linkId ? { ...link, title, url, hostname } : link
              ),
            }
          : board
      )
    );
    setTimeout(() => {
      setToast({
        id: crypto.randomUUID(),
        type: 'success',
        message: 'Link updated',
      });
    }, 150);
  }

  // delete link logic
  function deleteLink(boardId, linkId) {
    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId
          ? {
              ...board,
              links: board.links.filter((link) => link.id !== linkId),
            }
          : board
      )
    );
    setTimeout(() => {
      setToast({
        id: crypto.randomUUID(),
        type: 'success',
        message: 'Link deleted',
      });
    }, 150);
  }

  // import bookmarks logic
  useEffect(() => {
    if (!chrome?.bookmarks) {
      console.error('Bookmarks API unavailable');
      return;
    }

    chrome.bookmarks.getTree((tree) => {
      const extracted = [];

      function traverse(nodes) {
        nodes.forEach((node) => {
          if (node.url) {
            extracted.push({
              id: node.id,
              title: node.title,
              url: node.url,
            });
          }

          if (node.children) {
            traverse(node.children);
          }
        });
      }

      traverse(tree);
      setBookmarks(extracted);
      setTimeout(() => {
        setToast({
          id: crypto.randomUUID(),
          type: 'success',
          message: 'Bookmarks loaded successfully',
        });
      }, 150);
    });
  }, []);

  // imported board logic
  useEffect(() => {
    if (boards.length > 0) return;
    if (!bookmarks.length) return;

    setBoards([
      {
        id: 'imported',
        title: 'Imported',
        column: 'col1',
        position: 0,
        links: bookmarks,
      },
    ]);
  }, [bookmarks]);

  // save settings logic
  useEffect(() => {
    localStorage.setItem('clustr-settings', JSON.stringify(settings));
  }, [settings]);

  // save boards
  useEffect(() => {
    localStorage.setItem('clustr-boards', JSON.stringify(boards));
  }, [boards]);

  // reorder Links
  function reOrderLinks(boardId, activeId, overId) {
    setBoards((prev) =>
      prev.map((board) => {
        if (board.id !== boardId) return board;

        const links = [...board.links];
        const oldIndex = links.findIndex((link) => link.id === activeId);
        const newIndex = links.findIndex((link) => link.id === overId);

        if (oldIndex === -1 || newIndex === -1) return board;

        const movedLink = links.splice(oldIndex, 1)[0];
        links.splice(newIndex, 0, movedLink);

        return {
          ...board,
          links: links.map((link, index) => ({
            ...link,
            position: index,
          })),
        };
      })
    );
  }

  // reorder boards
  function reOrderBoards(columnId, activeId, overId) {
    setBoards((prev) => {
      const columnBoards = prev
        .filter((board) => board.column === columnId)
        .sort((a, b) => a.position - b.position);

      const oldIndex = columnBoards.findIndex((board) => board.id === activeId);

      const newIndex = columnBoards.findIndex((board) => board.id === overId);

      const reordered = arrayMove(columnBoards, oldIndex, newIndex);

      return prev.map((board) => {
        const index = reordered.findIndex((b) => b.id === board.id);

        if (index === -1) return board;

        return {
          ...board,
          position: index,
        };
      });
    });
  }

  // move boards
  function moveBoard(sourceColumn, targetColumn, boardId) {
    setBoards((prev) => {
      const boardToMove = prev.find((board) => board.id === boardId);

      if (!boardToMove) return prev;

      const remainingBoards = prev.filter((board) => board.id !== boardId);

      const targetBoards = remainingBoards
        .filter((board) => board.column === targetColumn)
        .sort((a, b) => a.position - b.position);

      const otherBoards = remainingBoards.filter(
        (board) => board.column !== targetColumn
      );

      const movedBoard = {
        ...boardToMove,
        column: targetColumn,
        position: 0,
      };

      const updatedTargetBoards = [movedBoard, ...targetBoards].map(
        (board, index) => ({
          ...board,
          position: index,
        })
      );

      return [
        ...otherBoards.map((board) => {
          if (board.column === sourceColumn) {
            const boardsInSource = otherBoards
              .filter((b) => b.column === sourceColumn)
              .sort((a, b) => a.position - b.position);

            const position = boardsInSource.findIndex((b) => b.id === board.id);

            return {
              ...board,
              position,
            };
          }

          return board;
        }),
        ...updatedTargetBoards,
      ];
    });
  }

  // move links
  function moveLink(sourceBoardId, targetBoardId, linkId, targetLinkId) {
    setBoards((prev) => {
      const sourceBoard = prev.find((board) => board.id === sourceBoardId);

      if (!sourceBoard) return prev;

      const linkToMove = sourceBoard.links.find((link) => link.id === linkId);

      if (!linkToMove) return prev;

      return prev.map((board) => {
        // Remove from source board
        if (board.id === sourceBoardId) {
          return {
            ...board,
            links: board.links
              .filter((link) => link.id !== linkId)
              .map((link, index) => ({
                ...link,
                position: index,
              })),
          };
        }

        // Insert into target board
        if (board.id === targetBoardId) {
          const newLinks = [...board.links];

          if (!targetLinkId) {
            newLinks.push(linkToMove);
          } else {
            const targetIndex = newLinks.findIndex(
              (link) => link.id === targetLinkId
            );

            if (targetIndex === -1) {
              newLinks.push(linkToMove);
            } else {
              newLinks.splice(targetIndex, 0, linkToMove);
            }
          }

          return {
            ...board,
            links: newLinks.map((link, index) => ({
              ...link,
              position: index,
            })),
          };
        }

        return board;
      });
    });
  }

  return (
    <>
      <div className='appBackground'>
        {settings.darkMode ? (
          settings.animatedBackground ? (
            <video autoPlay loop muted key='dark-video'>
              <source src='/Dark.webm' type='video/webm' />
            </video>
          ) : (
            <img
              src='/Dark.jpg'
              alt='Background'
              style={{
                width: '100vw',
                height: '100vh',
                objectFit: 'cover',
              }}
            />
          )
        ) : settings.animatedBackground ? (
          <video autoPlay loop muted key='light-video'>
            <source src='/Light.webm' type='video/webm' />
          </video>
        ) : (
          <img
            src='/Light.jpg'
            alt='Background'
            style={{
              width: '100vw',
              height: '100vh',
              objectFit: 'cover',
            }}
          />
        )}
      </div>

      <div className='App'>
        <TopBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setSearchOpen={setSearchOpen}
          setAddBoardButton={setAddBoardButton}
          setSettingsOpen={setSettingsOpen}
          settings={settings}
        />
        <Boards
          boards={boards}
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
        {searchOpen && (
          <SearchModal
            searchQuery={searchQuery}
            results={results}
            setSearchQuery={setSearchQuery}
            setSearchOpen={setSearchOpen}
          />
        )}
        {addBoardButton && (
          <Modal setAddBoardButton={setAddBoardButton}>
            <AddBoard
              addboard={addboard}
              setAddBoardButton={setAddBoardButton}
              setToast={setToast}
            />
          </Modal>
        )}
        {settingsOpen && (
          <Modal
            setAddBoardButton={setAddBoardButton}
            setSettingsOpen={setSettingsOpen}
          >
            <Settings settings={settings} setSettings={setSettings} />
          </Modal>
        )}
        {modal && (
          <Modal closeModal={() => setModal(null)}>
            {modal.type === 'deleteBoard' && (
              <DeleteWarning
                title='Delete Board'
                message={`Sure to delete board - "${modal.boardTitle}"?`}
                setModal={setModal}
                onConfirm={() => {
                  deleteBoard(modal.boardId);
                  setModal(null);
                }}
              />
            )}
            {modal.type === 'deleteLink' && (
              <DeleteWarning
                title='Delete Link'
                message={`Sure to delete link - "${modal.linkTitle}"?`}
                setModal={setModal}
                onConfirm={() => {
                  deleteLink(modal.boardId, modal.linkId);
                  setModal(null);
                }}
              />
            )}
          </Modal>
        )}
        {toast && <Toast key={toast.id} toast={toast} setToast={setToast} />}
      </div>
    </>
  );
}

export default App;
