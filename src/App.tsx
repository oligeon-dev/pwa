import { Link } from 'react-router';
import './App.css';
import InstallPWAButton from './installPWAButton';
import { useInstalledRelatedApp } from './useInstalledRelatedApp';
import useIsPWAInstalled from './useIsPWAInstalled';

function App() {
  const isInstalled = useIsPWAInstalled();
  const isOpenInPWA = window.matchMedia('(display-mode: standalone)').matches;
  const test = useInstalledRelatedApp();
  // const openInPWA = () => {
  //   window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;end;`;
  // };
  // iOSでは動作しない
  // 「ページを開けません。アドレスが無効です。」のポップアップが表示される

  // Androidでは、インストールしていない場合は反応なし
  const openInPWA = () => {
    window.location.replace(
      `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;end;`
    );
  };

  return (
    <div>
      <h1>PWA TEST</h1>

      <p>PWAで開いていますか？: {isOpenInPWA ? 'Yes' : 'No'}</p>

      <p>インストール済みですか?: {isInstalled ? 'Yes' : 'No'}</p>

      <p>インストール済みですか2?: {test ? 'Yes' : 'No'}</p>

      <button onClick={openInPWA}>アプリで開く</button>

      <InstallPWAButton />

      <a href='https://main.dsorxvjzdogy0.amplifyapp.com/'>
        アプリで開く(リンク)
      </a>

      <Link to='/home'>Home</Link>
      <button
        onClick={() => {
          window.location.href = '/home';
        }}
      >
        Home(フルリロード)
      </button>
    </div>
  );
}

export default App;
