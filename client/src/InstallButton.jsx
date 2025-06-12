// src/components/PWAInstallPrompt.jsx
import { useEffect, useState } from 'react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
      
      // For iOS devices
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      if (isIOS && window.navigator.standalone === false) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => {
      setIsVisible(false);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    }
    
    // For iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      alert('To install this app, tap the share button and then "Add to Home Screen"');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="pwa-install-banner">
      <p>Install this app for a better experience!</p>
      <button onClick={handleInstallClick}>Install App</button>
      <button onClick={() => setIsVisible(false)}>Not Now</button>
    </div>
  );
}