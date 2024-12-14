import React from 'react';

interface TimeBarProps {
  currentTimeHeight: number;
  isToday: boolean;
}

export const TimeBar: React.FC<TimeBarProps> = ({ currentTimeHeight, isToday }) => {
  return (
    <div
      style={{ top: `${currentTimeHeight}px` }}
      className="absolute left-0 w-full bg-orange-500 z-10"
    >
      {isToday && (
        <div className="h-2 w-2 rounded-full absolute left-[-4px] top-[-3px] bg-orange-500 z-10" />
      )}
      <div className="w-full h-[2px] z-10" />
    </div>
  );
};