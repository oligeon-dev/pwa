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

  const showNotificationSettingBanner = () => {
    // if (Notification.permission === 'granted') return false;
    if (typeof Notification === 'undefined') return false;
    if (Notification.permission === 'granted') return false;
    // if (isPWA) return false;
    // if (!isIOS && !isAndroid) return false;
    return true;
  };

  return (
    <div className='flex flex-col space-y-4'>
      <h1>PWA TEST</h1>
      <p>notification: {showNotificationSettingBanner() ? 'Yes' : 'No'}</p>

      <p>PWAで開いていますか？: {isOpenInPWA ? 'Yes' : 'No'}</p>

      <p>インストール済みですか?: {isInstalled ? 'Yes' : 'No'}</p>

      <button onClick={openInPWA}>アプリで開く!</button>
      <button onClick={installPWA}>アプリをインストール</button>

      <button className='!bg-red-500 active:!bg-blue-500 focus:ring-2 focus:ring-yellow-300 outline-none focus:outline-none'>
        test
      </button>

      <Link to='/home'>Home</Link>
      <UpdatePrompt />
    </div>
  );
}

export default App;
