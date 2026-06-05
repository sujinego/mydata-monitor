// src/hooks/useAutoRefresh.js
import { useState, useEffect, useRef } from 'react';

export function useAutoRefresh(callback, intervalMs = 60000) {
  const [enabled,   setEnabled]   = useState(true);
  const [countdown, setCountdown] = useState(intervalMs / 1000);
  const savedCallback = useRef(callback);

  useEffect(() => { savedCallback.current = callback; }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    setCountdown(intervalMs / 1000);

    const countTimer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          savedCallback.current();
          return intervalMs / 1000;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(countTimer);
  }, [enabled, intervalMs]);

  return { enabled, setEnabled, countdown };
}
