import { useState } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export default function UpdatePrompt() {
  const [visible, setVisible] = useState(false);
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    onRegisteredSW(_swScriptUrl, registration) {
      registration?.update();
    },
    onRegisterError(error) {
      console.error('SW registration error', error);
    },
  });

  // needRefresh が true になったら表示
  if (needRefresh && !visible) {
    setVisible(true);
  }

  if (!visible) return null;

  return (
    <div className='fixed bottom-4 left-4 right-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg'>
      <p>新しいバージョンが利用可能です!</p>
      <button
        onClick={() => {
          updateServiceWorker().then(() => {
            setVisible(false); // 手動でプロンプトを閉じる
          });
        }}
        className='mt-2 px-4 py-2 bg-blue-500 text-white rounded'
      >
        更新する
      </button>
    </div>
  );
}
