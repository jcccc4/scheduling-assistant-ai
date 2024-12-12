"use client";
import { isToday } from "../../components/utils";
import { DAYS } from "../../calendar";

interface WeeklyHeaderProps {
  selectedDate: Date;
}

export const WeeklyHeader = ({ selectedDate }: WeeklyHeaderProps) => (
  <div className="grid grid-cols-[60px_1fr] grid-rows-[80px] w-full bg-[hsl(var(--sidebar-border))] gap-[1px] py-[1px] sticky top-0 z-[40] bg-white">
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
            className={`bg-white h-full w-full flex p-2 flex-col ${
              isToday(day) ? "text-blue-700 font-semibold" : ""
            }`}
          >
            <span className="text-3xl">{day.getDate()}</span>
            <span className="text-base">{DAYS[day.getDay()]}</span>
          </div>
        );
      })}
    </div>
  </div>
);