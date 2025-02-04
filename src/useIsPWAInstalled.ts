import { useEffect, useState } from 'react';

const useIsPWAInstalled = () => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkPWAStatus = async () => {
      // `display-mode: standalone` のチェック
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)'
      ).matches;

      // `getInstalledRelatedApps()` のチェック (Android Chrome 限定)
      let isRelatedAppInstalled = false;
      if ('getInstalledRelatedApps' in navigator) {
        try {
          const getApps = navigator.getInstalledRelatedApps as () => Promise<
            { id: string }[]
          >;
          const relatedApps = await getApps();
          isRelatedAppInstalled = relatedApps.length > 0;
        } catch (error) {
          console.error('Error checking installed related apps:', error);
        }
      }

      setIsInstalled(isStandalone || isRelatedAppInstalled);
    };

    checkPWAStatus();
  }, []);

  return isInstalled;
};

export default useIsPWAInstalled;
