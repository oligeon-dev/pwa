import { useEffect, useState } from 'react';

interface NavigatorWithInstalledApps extends Navigator {
  getInstalledRelatedApps?: () => Promise<{ id: string }[]>;
}

const useIsPWAInstalled = () => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkPWAStatus = async () => {
      const navigatorExt = navigator as NavigatorWithInstalledApps;
      const isStandalone = window.matchMedia(
        '(display-mode: standalone)'
      ).matches;

      let isRelatedAppInstalled = false;
      if (typeof navigatorExt.getInstalledRelatedApps === 'function') {
        try {
          const relatedApps = await navigatorExt.getInstalledRelatedApps.call(
            navigatorExt
          );
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
