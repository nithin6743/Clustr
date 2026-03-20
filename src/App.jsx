import './App.css';
import Boards from './components/Boards/Boards';
import Clock from './components/Clock/Clock';

function App() {
  return (
    <div className='app'>
      <div className='clock'>
        <Clock />
      </div>
      <Boards />
    </div>
  );
}

export default App;
