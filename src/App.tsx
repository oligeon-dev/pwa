import './App.css';

function App() {
  const isOpenInPWA = window.matchMedia('(display-mode: standalone)').matches;

  return (
    <div>
      <h1>PWA TEST</h1>

      <p>PWAで開いていますか？: {isOpenInPWA ? 'Yes' : 'No'}</p>
    </div>
  );
}

export default App;
