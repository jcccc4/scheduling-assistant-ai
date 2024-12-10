// Component to display calendar events
"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { gridHeight } from "../calendar";
import { formatTime } from "@/utilities/formatSimpleTime";

interface CalendarEventProps {
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string; // Height of a single hour in pixels
  hourHeight?: number;
  length: number;
  index: number;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  title,
  startTime,
  endTime,
  description,
  length,
  index,
}) => {
  const startMinute = startTime.getHours() * 60 + startTime.getMinutes();
  const endMinute = endTime.getHours() * 60 + endTime.getMinutes();
  const durationMinutes = endMinute - startMinute;

  // Calculate the height in pixels
  const height = durationMinutes * (gridHeight / 60) + 1*durationMinutes/60;

  return (
    <div
      style={{
        height: `${height}px`,
        width: length > 1 ? `calc(100% / ${length} + ${8*(length-1)}px)` : "100%",
        left: `calc(100% * ${index / length} - ${8*index}px )`,
      }} //Use inline styles for precise pixel control.
      className={cn(
        " absolute w-[100%] z-10 border border-white",
        "bg-blue-500 text-white rounded-md pl-2"
      )}
    >
      <div className="font-semibold text-sm truncate">{title}</div>
      <div className="text-xs text-white/90">
        {formatTime(startTime)}
        {" - "}
        {formatTime(endTime)}
      </div>
      {description && (
        <div className="text-xs text-white/80 truncate mt-1">{description}</div>
      )}
    </div>
  );
};

export default CalendarEvent;
