import { useRegisterSW } from 'virtual:pwa-register/react';
import './App.css';
import { useInstallPWA } from './useInstallPWA';
import { useInstalledRelatedApp } from './useInstalledRelatedApp';

function UpdatePrompt() {
  const { needRefresh, updateServiceWorker } = useRegisterSW();

  if (!needRefresh) return null;

  return (
    <div className='fixed bottom-4 left-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg'>
      <p>新しいバージョンが利用可能です。</p>
      <button
        onClick={() => updateServiceWorker(true)}
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
      >
        更新する
      </button>
    </div>
  );
}

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
      <UpdatePrompt />
    </div>
  );
}

export default App;
