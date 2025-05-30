import { onMessage } from 'firebase/messaging';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import './App.css';
import UpdatePrompt from './UpdatePrompt';
import { generateToken, messaging } from './notification/firebase';
import { useInstallPWA } from './useInstallPWA';
import { useInstalledRelatedApp } from './useInstalledRelatedApp';

function App() {
  const isOpenInPWA = window.matchMedia('(display-mode: standalone)').matches;
  const isInstalled = useInstalledRelatedApp();

  const [token, setToken] = useState<string | null>(null);
  const [_, setError] = useState<string | null>(null);

  useEffect(() => {
    // トークン取得して state にセット
    generateToken()
      .then((t) => {
        if (t) {
          setToken(t);
        } else {
          setError('トークン取得に失敗しました');
        }
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || 'トークン取得中にエラー');
      });

    // フォアグラウンドメッセージ受信ハンドラ登録
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('onMessage payload:', payload);
      // 必要ならここで画面に表示する処理など
    });

    // コンポーネント unmount 時に解除
    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, []);
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

      <div className='max-w-3xl break-all'>
        <p>token: {token}</p>
      </div>

      <p>PWAで開いていますか？: {isOpenInPWA ? 'Yes' : 'No'}</p>

      <p>インストール済みですか?: {isInstalled ? 'Yes' : 'No'}</p>

      <button onClick={openInPWA}>アプリで開く!</button>
      <button onClick={installPWA}>アプリをインストール</button>

      <button className='!bg-red-500 active:!bg-blue-500 focus:ring-2 focus:ring-yellow-300 outline-none focus:outline-none'>
        test
      </button>

      <input
        type='text'
        className='!bg-red-500 active:!bg-blue-500 focus:ring-2 focus:ring-yellow-300 outline-none focus:outline-none'
      />

      <Link to='/home'>Home</Link>
      <UpdatePrompt />
    </div>
  );
}

export default App;
