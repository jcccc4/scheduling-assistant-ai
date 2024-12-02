// Component to display calendar events
"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { gridHeight } from "../calendar";

interface CalendarEventProps {
  title: string;
  startTime: Date;
  endTime: Date;
  description?: string; // Height of a single hour in pixels
  hourHeight?: number;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  title,
  startTime,
  endTime,
  description,  
}) => {
  const startMinute = startTime.getHours() * 60 + startTime.getMinutes();
  const endMinute = endTime.getHours() * 60 + endTime.getMinutes();
  const durationMinutes = endMinute - startMinute;

  // Calculate the height in pixels
  const height = durationMinutes * (gridHeight / 60);

  return (
    <div
      style={{ top: `0px `, left: `0px`, height: `${height}px` }} //Use inline styles for precise pixel control.
      className={cn(
        "absolute w-[95%] z-10",
        "bg-blue-500 text-white rounded-md p-2"
      )}
    >
      <div className="font-semibold text-sm truncate">{title}</div>
      <div className="text-xs text-white/90">
        {startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
        {" - "}
        {endTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </div>
      {description && (
        <div className="text-xs text-white/80 truncate mt-1">{description}</div>
      )}
    </div>
  );
};

export default CalendarEvent;
