import './App.css';
import InstallPWAButton from './InstallPWAButton';

function App() {
  const isOpenInPWA = window.matchMedia('(display-mode: standalone)').matches;

  // const openInPWA = () => {
  //   window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;end;`;
  // };
  // iOSでは動作しない
  // 「ページを開けません。アドレスが無効です。」のポップアップが表示される
  const openInPWA = () => {
    window.location.replace(
      `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;end;`
    );
  };

  return (
    <div>
      <h1>PWA TEST</h1>

      <p>PWAで開いていますか？: {isOpenInPWA ? 'Yes' : 'No'}</p>

      <button onClick={openInPWA}>アプリで開く</button>

      <a href='https://main.dsorxvjzdogy0.amplifyapp.com/'>
        アプリで開く(リンク)
      </a>
      <InstallPWAButton />
    </div>
  );
}

export default App;
