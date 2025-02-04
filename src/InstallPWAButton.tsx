import { useEffect, useRef, useState } from 'react';

function InstallPWAButton() {
  const [isVisible, setIsVisible] = useState(false);
  const deferredPromptRef = useRef<Event | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPromptRef.current = event;
      setIsVisible(true); // ボタンを表示
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
    event.prompt();
    const { outcome } = await event.userChoice;

    if (outcome === 'accepted') {
      console.log('PWAがインストールされました！');
    } else {
      console.log('PWAのインストールがキャンセルされました');
    }

    deferredPromptRef.current = null;
    setIsVisible(false); // ボタンを非表示
  };

  return isVisible ? (
    <button onClick={installPWA} className='p-2 bg-blue-500 text-white rounded'>
      アプリをインストール
    </button>
  ) : null;
}

export default InstallPWAButton;
