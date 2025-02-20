import { Link } from 'react-router';
import './App.css';
import UpdatePrompt from './UpdatePrompt';
import { useInstallPWA } from './useInstallPWA';
import { useInstalledRelatedApp } from './useInstalledRelatedApp';

function App() {
  const isOpenInPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isInstalled = useInstalledRelatedApp();
  // const openInPWA = () => {
  //   window.location.href = `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;end;`;
  // };
  // iOSでは動作しない
  // 「ページを開けません。アドレスが無効です。」のポップアップが表示される

  // Androidでは、インストールしていない場合は反応なし
  const { installPWA } = useInstallPWA();
  const openInPWA = () => {
    window.location.replace(
      `intent://${window.location.host}${window.location.pathname}#Intent;scheme=https;end;`
    );
  };

  return (
    <div className='flex flex-col space-y-4'>
      <h1>PWA TEST</h1>

      <p>PWAで開いていますか？: {isOpenInPWA ? 'Yes' : 'No'}</p>

      <p>インストール済みですか?: {isInstalled ? 'Yes' : 'No'}</p>

      <button onClick={openInPWA}>アプリで開く</button>
      <button onClick={installPWA}>アプリをインストール</button>

      <Link to='/home'>Home</Link>
      <UpdatePrompt />
    </div>
  );
}

export default App;
