import './App.css';
import Boards from './components/Boards';
import Clock from './components/Clock';

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
