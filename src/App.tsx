import './App.css';

function App() {
  const isOpenInPWA = window.matchMedia('(display-mode: standalone)').matches;

  const openInPWA = () => {
    window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;end;`;
  };

  return (
    <div>
      <h1>PWA TEST</h1>

      <p>PWAで開いていますか？: {isOpenInPWA ? 'Yes' : 'No'}</p>

      <button onClick={openInPWA}>アプリで開く</button>
    </div>
  );
}

export default App;
