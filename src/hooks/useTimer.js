import { useState, useEffect, useCallback } from 'react';

export const useTimer = (initialTime, onTimeout) => {
  const [timeRemaining, setTimeRemaining] = useState(() => {
    const saved = localStorage.getItem('quiz_time');
    return saved ? parseInt(saved, 10) : initialTime;
  });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!isActive) return;

    localStorage.setItem('quiz_time', timeRemaining.toString());

    if (timeRemaining <= 0) {
      setIsActive(false);
      if (onTimeout) onTimeout();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeRemaining, isActive, onTimeout]);

  const startTimer = useCallback(() => setIsActive(true), []);
  const pauseTimer = useCallback(() => setIsActive(false), []);
  const resetTimer = useCallback((newTime = initialTime) => {
    setTimeRemaining(newTime);
    setIsActive(false);
  }, [initialTime]);

  return { timeRemaining, isActive, startTimer, pauseTimer, resetTimer };
};
