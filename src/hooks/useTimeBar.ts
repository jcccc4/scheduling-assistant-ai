import { useState, useEffect } from 'react';
import { findTimeBarHeight } from '@/app/_components/calendar/utils/dateUtils';

export const useTimeBar = (gridHeight: number) => {
  const [currentTimeHeight, setCurrentTimeHeight] = useState(findTimeBarHeight(gridHeight));

  useEffect(() => {
    const updateTimeBar = () => {
      setCurrentTimeHeight(findTimeBarHeight(gridHeight));
    };

    updateTimeBar();
    const interval = setInterval(updateTimeBar, 60000); // Update every minute
    return () => clearInterval(interval);
  }, [gridHeight]);

  return currentTimeHeight;
};