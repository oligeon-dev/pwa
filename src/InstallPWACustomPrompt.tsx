import { useEffect, useRef, useState } from 'react';

const InstallPWACustomPrompt = () => {
  const [isVisible, setIsVisible] = useState(false);
  const deferredPromptRef = useRef<Event | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault(); // デフォルトのプロンプトをブロック
      deferredPromptRef.current = event;
      setIsVisible(true); // カスタムUIを表示
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPromptRef.current) return;

    const event = deferredPromptRef.current as any;
    event.prompt(); // 実際のインストールプロンプトを表示

    const { outcome } = await event.userChoice;
    if (outcome === 'accepted') {
      console.log('PWAがインストールされました！');
    } else {
      console.log('PWAのインストールがキャンセルされました');
    }

    deferredPromptRef.current = null;
    setIsVisible(false); // カスタムUIを非表示
  };

  const closePrompt = () => {
    setIsVisible(false); // カスタムUIを非表示
  };

  return isVisible ? (
    <div className='fixed bottom-4 left-4 right-4 p-4 bg-white shadow-lg rounded-lg flex flex-col items-center'>
      <p className='text-lg font-bold text-black'>
        このアプリをホーム画面に追加しませんか？
      </p>
      <p className='text-sm text-gray-600'>より快適に使えるようになります。</p>
      <div className='flex gap-2 mt-3'>
        <button
          onClick={installPWA}
          className='p-2 bg-blue-500 text-white rounded'
        >
          インストール
        </button>
        <button
          onClick={closePrompt}
          className='p-2 bg-gray-300 rounded text-white'
        >
          キャンセル
        </button>
      </div>
    </div>
  ) : null;
};

export default InstallPWACustomPrompt;
