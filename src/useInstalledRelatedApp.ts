import { useEffect, useState } from 'react';

export const useInstalledRelatedApp = () => {
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const checkInstalledApp = async () => {
      if ('getInstalledRelatedApps' in navigator) {
        try {
          const relatedApps = await (
            navigator as any
          ).getInstalledRelatedApps();
          setIsInstalled(relatedApps.length > 0);
        } catch (error) {
          console.error('インストール確認エラー:', error);
        }
      }
    };

    checkInstalledApp();
  }, []);

  return isInstalled;
};
