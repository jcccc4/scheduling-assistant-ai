import React from 'react';
import { DAYS } from '../calendar';
import { isToday } from '../utils/dateUtils';

interface WeeklyHeaderProps {
  selectedDate: Date;
}

export const WeeklyHeader: React.FC<WeeklyHeaderProps> = ({ selectedDate }) => (
  <div className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] grid-rows-[60px] md:grid-rows-[80px]">
    <div className="w-full bg-white flex items-center justify-center">
      <div className="flex gap-2"></div>
    </div>
    <div className="w-full grid grid-cols-7 gap-[1px]">
      {Array.from({ length: 7 }).map((_, index) => {
        const day = new Date(selectedDate);
        day.setDate(selectedDate.getDate() - selectedDate.getDay() + index);
        return (
          <div
            key={index}
            className={`bg-white h-full w-full flex p-1 md:p-2 flex-col ${
              isToday(day) ? "text-blue-700 font-semibold" : ""
            }`}
          >
            <span className="text-lg md:text-3xl">{day.getDate()}</span>
            <span className="text-xs md:text-base">{DAYS[day.getDay()]}</span>
          </div>
        );
      })}
    </div>
  </div>
);