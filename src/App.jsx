import { useState } from 'react';
import './index.css';
import TopBar from './Components/TopBar.jsx';
import Boards from './Components/Boards.jsx';
import bookmarks from './Components/data/Bookmarks.json';
import SearchModal from './Components/modals/SearchModal.jsx';

import Modal from './Components/modals/Modal.jsx';
import AddBoard from './Components/AddBoard.jsx';

function App() {
  const [bg, setBg] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

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

  return (
    <>
      <div className='appBackground'>
        {bg ? (
          <video autoPlay loop muted>
            <source src='/bgVideo.webm' type='video/webm' />
          </video>
        ) : (
          <img
            src='/bgImage.jpg'
            alt='Background'
            style={{ width: '100vw', height: '100vh', objectFit: 'fit' }}
          />
        )}
      </div>
      {/* <div className='buttons'>
        <button onClick={() => setBg(!bg)}>Background 1</button>
      </div> */}
      <div className='App'>
        <TopBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
        <Boards bookmarks={bookmarks} />
        {searchOpen && (
          <SearchModal
            searchQuery={searchQuery}
            results={results}
            setSearchQuery={setSearchQuery}
            setSearchOpen={setSearchOpen}
          />
        )}
        <Modal>
          <AddBoard />
        </Modal>
      </div>
    </>
  );
}

export default App;
