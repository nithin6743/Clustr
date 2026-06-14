import { useState, useEffect } from 'react';
import './index.css';
import TopBar from './Components/TopBar.jsx';
import Boards from './Components/Boards.jsx';
import SearchModal from './Components/modals/SearchModal.jsx';

import Modal from './Components/modals/Modal.jsx';
import AddBoard from './Components/AddBoard.jsx';
import Settings from './Components/Settings.jsx';

function App() {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem('clustr-boards');

    return saved ? JSON.parse(saved) : [];
  });
  const [bookmarks, setBookmarks] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addBoardButton, setAddBoardButton] = useState(false);
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
  const allLinks = boards.flatMap((board) =>
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
