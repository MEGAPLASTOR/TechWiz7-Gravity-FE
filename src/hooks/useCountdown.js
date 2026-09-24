import { useState, useEffect } from 'react';

export function useCountdown(initialHours = 2, initialMinutes = 15, initialSeconds = 0) {
  const [totalSeconds, setTotalSeconds] = useState(
    initialHours * 3600 + initialMinutes * 60 + initialSeconds
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n) => String(n).padStart(2, '0');

  const formattedDigital = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  const formattedFriendly = `${pad(hours)}h ${pad(minutes)}m còn lại`;

  return {
    hours,
    minutes,
    seconds,
    totalSeconds,
    formattedDigital,
    formattedFriendly,
    isUrgent: hours < 1,
  };
}
