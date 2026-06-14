import { useState } from 'react';
import './index.css';
import TopBar from './Components/TopBar.jsx';
import Boards from './Components/Boards.jsx';
import bookmarks from './Components/data/Bookmarks.json';
import SearchModal from './Components/modals/SearchModal.jsx';

import Modal from './Components/modals/Modal.jsx';
import AddBoard from './Components/AddBoard.jsx';
import Settings from './Components/Settings.jsx';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [boards, setBoards] = useState(bookmarks);
  const [addBoardButton, setAddBoardButton] = useState(false);
  const [settings, setSettings] = useState({
    darkMode: true,
    showSearchBar: true,
    showClock: false,
    showQuickLinks: true,
    animatedBackground: true,
  });

  const allLinks = bookmarks.flatMap((board) =>
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
        <Boards boards={boards} settings={settings} />
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
      </div>
    </>
  );
}

export default App;
