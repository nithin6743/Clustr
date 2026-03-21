import { useState, useEffect } from 'react';
import './App.css';
import Boards from './components/Boards';
import Clock from './components/Clock';

function App() {
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

  return (
    <div className='app'>
      <div className='clock'>
        <Clock />
      </div>
      <Boards boards={boards} addLink={addLink} />
    </div>
  );
}

export default App;
