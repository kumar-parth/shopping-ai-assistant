import { useEffect, useState } from 'react';

export default function useGeminiKey() {
  const [apiKey, setApiKey] = useState(null);

  useEffect(() => {
    let retries = 0;
    const maxRetries = 10;

    const requestKey = () => {
      console.log("📢 Asking for Gemini API key");
      window.postMessage({ type: 'GET_GEMINI_API_KEY' }, '*');
    };

    const handler = (e) => {
      if (e.data.type === 'GEMINI_API_KEY_RESPONSE') {
        console.log("📥 Received key:", e.data.payload);
        setApiKey(e.data.payload);
      }
    };

    window.addEventListener('message', handler);

    const interval = setInterval(() => {
      if (!apiKey && retries < maxRetries) {
        requestKey();
        retries++;
      } else {
        clearInterval(interval);
      }
    }, 300); // Retry every 300ms until key is received or max tries

    return () => {
      window.removeEventListener('message', handler);
      clearInterval(interval);
    };
  }, []);

  const saveKey = (newKey) => {
    setApiKey(newKey);
    window.postMessage({ type: 'SET_GEMINI_API_KEY', apiKey: newKey });
  };

  return [apiKey, saveKey];
}