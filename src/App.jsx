import { useState, useEffect } from 'react';
import './App.css';
import Boards from './components/Boards';
import Clock from './components/Clock';
import Footer from './components/Footer';
import Modal from './components/Modal';
import DeleteWarning from './components/DeleteWarning';
import AddBoardForm from './components/AddBoardForm';

function App() {
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

    return saved ? JSON.parse(saved) : defaultBoards;
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
          board.id === 'imported' ? { ...board, links } : board
        )
      );
    });
  }

  return (
    <div className='app'>
      <div className='clock'>
        <Clock />
      </div>
      <Boards
        boards={boards}
        addLink={addLink}
        deleteLink={deleteLink}
        setModal={setModal}
        updateBoardTitle={updateBoardTitle}
      />
      <Footer setModal={setModal} importBookmarks={importBookmarks} />
      {modal && (
        <Modal closeModal={() => setModal(null)}>
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
        </Modal>
      )}
    </div>
  );
}

export default App;
