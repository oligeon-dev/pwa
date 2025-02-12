export const checkInstalledRelatedApp = async (): Promise<boolean> => {
  if ('getInstalledRelatedApps' in navigator) {
    try {
      const relatedApps = await (navigator as any).getInstalledRelatedApps();
      return relatedApps.length > 0;
      //   return relatedApps.some(
      //     (app: any) => app.id === appId || app.url === appUrl
      //   );
    } catch (error) {
      console.error('インストール確認エラー:', error);
      return false;
    }
  }
  return false;
};
