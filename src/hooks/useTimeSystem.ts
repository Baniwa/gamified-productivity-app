import { useState, useEffect } from 'react';

export function useTimeSystem() {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Load initial values from localStorage or default
  const savedInterval = parseInt(localStorage.getItem('questlog_water_interval') || '3600', 10);
  const [waterInterval, setWaterInterval] = useState(savedInterval); // default 60 mins
  const [waterTimer, setWaterTimer] = useState(savedInterval); 
  
  // Track potions drank today
  const [waterPotions, setWaterPotions] = useState<number>(() => {
    const saved = localStorage.getItem('questlog_water_potions');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Reset if it's a new day
      if (parsed.date === new Date().toDateString()) {
        return parsed.count;
      }
    }
    return 0;
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setWaterTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const changeWaterInterval = (newSeconds: number) => {
    setWaterInterval(newSeconds);
    setWaterTimer(newSeconds);
    localStorage.setItem('questlog_water_interval', newSeconds.toString());
  };

  const drinkWater = () => {
    setWaterTimer(waterInterval);
    const newCount = waterPotions + 1;
    setWaterPotions(newCount);
    localStorage.setItem('questlog_water_potions', JSON.stringify({
      date: new Date().toDateString(),
      count: newCount
    }));
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return {
    currentTime,
    waterTimer,
    drinkWater,
    waterPotions,
    waterInterval,
    changeWaterInterval,
    formatTimer,
    dayOfWeek: currentTime.getDay(),
    timeString: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    dateString: currentTime.toLocaleDateString(),
    weekdayString: currentTime.toLocaleDateString('en-US', { weekday: 'long' }),
    dayOfYear: Math.floor((currentTime.getTime() - new Date(currentTime.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24)
  };
}
