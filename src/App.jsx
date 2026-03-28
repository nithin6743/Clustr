import { useState, useEffect } from 'react';
import './App.css';
import Boards from './components/Boards';
import Clock from './components/Clock';
import Footer from './components/Footer';
import Modal from './components/Modal';
import DeleteWarning from './components/DeleteWarning';
import AddBoardForm from './components/AddBoardForm';
import Welcome from './components/Welcome';
import { DndContext, DragOverlay } from '@dnd-kit/core';

function App() {
  const [activeLink, setActiveLink] = useState(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(
    () => !localStorage.getItem('hasLaunched')
  );

  const [modal, setModal] = useState(null);
  const defaultBoards = [
    {
      id: 'imported',
      title: 'Bookmarks',
      links: [],
      isSystem: true,
    },
    // rest of your data...
  ];

  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem('boards');

    const parsed = saved ? JSON.parse(saved) : [];

    const safeBoards = parsed.map((b) => ({
      ...b,
      links: b.links || [],
    }));

    const hasImported = safeBoards.some((b) => b.id === 'imported');

    return hasImported
      ? safeBoards
      : [
          {
            id: 'imported',
            title: 'Bookmarks',
            links: [],
            isSystem: true,
          },
          ...safeBoards,
        ];
  });
  useEffect(() => {
    localStorage.setItem('boards', JSON.stringify(boards));
  }, [boards]);

  function addLink(boardId, newLink) {
    setBoards((prev) =>
      prev.map((b) =>
        b.id === boardId ? { ...b, links: [...b.links, newLink] } : b
      )
    );
  }

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
  }

  function addBoard(title) {
    if (!title) return;

    const newBoard = {
      id: Date.now(),
      title: title,
      links: [],
    };
    setBoards((prev) => [...prev, newBoard]);
  }

  function deleteBoard(boardId) {
    setBoards((prev) => prev.filter((board) => board.id !== boardId));
  }

  function updateBoardTitle(boardId, newTitle) {
    if (!newTitle.trim()) return;

    setBoards((prev) =>
      prev.map((board) =>
        board.id === boardId ? { ...board, title: newTitle } : board
      )
    );
  }

  function extractLinks(nodes) {
    let links = [];

    nodes.forEach((node) => {
      if (node.url) {
        links.push({
          id: Number(node.id),
          title: node.title,
          url: node.url,
          favicon: `https://www.google.com/s2/favicons?domain=${node.url}`,
        });
      }

      if (node.children) {
        links = links.concat(extractLinks(node.children));
      }
    });

    return links;
  }

  function importBookmarks() {
    chrome.bookmarks.getTree((tree) => {
      const links = extractLinks(tree);

      setBoards((prev) =>
        prev.map((board) =>
          board.id === 'imported' ? { ...board, links: links || [] } : board
        )
      );
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;

    const sourceBoardId = active.data.current.boardId;
    const linkId = active.id;

    setBoards((prev) => {
      let movedLink = null;

      // 1. REMOVE from source board
      const temp = prev.map((board) => {
        if (board.id === sourceBoardId) {
          const filtered = board.links.filter((l) => {
            if (l.id === linkId) {
              movedLink = l;
              return false;
            }
            return true;
          });
          return { ...board, links: filtered };
        }
        return board;
      });

      // safety: if somehow not found → abort
      if (!movedLink) return prev;

      let targetBoardId = null;
      let targetIndex = null;

      // 2. FIND target board + base index
      for (const board of temp) {
        const index = board.links.findIndex((l) => l.id === over.id);

        // CASE 1 → dropped on a link
        if (index !== -1) {
          targetBoardId = board.id;
          targetIndex = index;
          break;
        }

        // CASE 2 → dropped on board itself
        if (board.id === over.id) {
          targetBoardId = board.id;
          targetIndex = board.links.length;
        }
      }

      // safety fallback (prevents disappearing bug)
      if (targetBoardId === null) return prev;

      // 3. INSERT into correct position
      return temp.map((board) => {
        if (board.id !== targetBoardId) return board;

        const newLinks = [...board.links];

        let insertIndex = targetIndex;

        // 🎯 POSITION LOGIC (top vs bottom)
        const overRect = over.rect;
        const activeRect = active.rect.current.translated;

        if (
          targetIndex !== null &&
          overRect &&
          activeRect &&
          targetIndex < newLinks.length
        ) {
          const isBelow = activeRect.top > overRect.top + overRect.height / 2;

          if (isBelow) {
            insertIndex = targetIndex + 1;
          }
        }

        // prevent overflow
        insertIndex = Math.min(insertIndex, newLinks.length);

        newLinks.splice(insertIndex, 0, movedLink);

        return { ...board, links: newLinks };
      });
    });
  }

  useEffect(() => {
    if (isFirstLaunch) {
      importBookmarks();
      localStorage.setItem('hasLaunched', 'true');
      setModal({ type: 'welcome' });
    }
  }, [isFirstLaunch]);

  return (
    <div className='app'>
      <div className='clock'>
        <Clock />
      </div>
      <DndContext
        onDragStart={(event) => {
          const { active } = event;

          const sourceBoardId = active.data.current.boardId;
          const linkId = active.id;

          const sourceBoard = boards.find((b) => b.id === sourceBoardId);
          const link = sourceBoard.links.find((l) => l.id === linkId);

          setActiveLink(link);
        }}
        onDragEnd={(event) => {
          handleDragEnd(event);
          setActiveLink(null);
        }}
      >
        <Boards
          boards={boards}
          addLink={addLink}
          deleteLink={deleteLink}
          setModal={setModal}
          updateBoardTitle={updateBoardTitle}
        />
        <DragOverlay>
          {activeLink ? (
            <div className='dragOverlay'>
              <img src={activeLink.favicon} />
              <span>{activeLink.title}</span>
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <Footer setModal={setModal} importBookmarks={importBookmarks} />
      {modal && (
        <Modal closeModal={() => setModal(null)} modal={modal}>
          {modal.type === 'deleteLink' && (
            <DeleteWarning
              setModal={setModal}
              modal={modal}
              deleteLink={deleteLink}
              deleteBoard={deleteBoard}
            >
              Delete Link?
            </DeleteWarning>
          )}
          {modal.type === 'deleteBoard' && (
            <DeleteWarning
              setModal={setModal}
              modal={modal}
              deleteLink={deleteLink}
              deleteBoard={deleteBoard}
            >
              Delete Board?
            </DeleteWarning>
          )}

          {modal.type === 'addBoard' && (
            <AddBoardForm addBoard={addBoard} setModal={setModal} />
          )}

          {modal.type === 'welcome' && <Welcome setModal={setModal} />}
        </Modal>
      )}
    </div>
  );
}

export default App;
