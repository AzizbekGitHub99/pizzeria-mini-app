'use client';
import { useEffect, useState } from 'react';

export function useTelegram() {
  const [tg, setTg] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).Telegram?.WebApp) {
      const webApp = (window as any).Telegram.WebApp;
      webApp.ready();
      setTg(webApp);
    }
  }, []);

  const close = () => {
    tg?.close();
  };

  const sendData = (data: any) => {
    if (tg) {
      tg.sendData(JSON.stringify(data));
    } else {
      console.log('Mock TG sendData:', data);
    }
  };

  return { tg, close, sendData };
}
