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
      id: 1,
      title: 'Bookmarks',
      links: [
        {
          id: 1,
          title: 'Youtube',
          url: 'https://youtube.com',
          favicon: '...',
        },
      ],
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
      />
      <Footer setModal={setModal} />
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
