import './App.css';
import QRScanner from './components/QRScanner';

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <div>Attendance app</div>

        <div className='user-details'>
          Najm
        </div>
      </div>
      
      <div className='main'>
        <QRScanner />
      </div>

      <div className='App-footer'>
        All Rights reserved c
      </div>
    </div>
  );
}

export default App;
