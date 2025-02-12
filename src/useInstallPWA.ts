import { useEffect, useRef } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function useInstallPWA() {
  const deferredPromptRef = useRef<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      deferredPromptRef.current = event as BeforeInstallPromptEvent;
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
    const event = deferredPromptRef.current;
    if (!event) return;

    await event.prompt();

    const { outcome } = await event.userChoice;
    console.info(
      outcome === 'accepted' ? 'PWA installed' : 'PWA installation canceled'
    );

    deferredPromptRef.current = null;
  };

  return { installPWA };
}
