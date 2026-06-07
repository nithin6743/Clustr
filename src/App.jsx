import { useState } from 'react';
import './index.css';
import TopBar from './Components/TopBar.jsx';
import Boards from './Components/Boards.jsx';

function App() {
  const [bg, setBg] = useState(false);

  return (
    <>
      <div
        className='appBackground'
        
      >
        {bg ? (
          <video autoPlay loop muted>
            <source src='/bgVideo.webm' type='video/webm' />
          </video>
        ) : (
          <img
            src='/Spidey Glitch.jpg'
            alt='Background'
            style={{ width: '100vw', height: '100vh', objectFit: 'fit' }}
          />
        )}
      </div>
      {/* <div className='buttons'>
        <button onClick={() => setBg(!bg)}>Background 1</button>
      </div> */}
      <div className='App'>
        <TopBar />
        <Boards/>
      </div>
    </>
  );
}

export default App;
