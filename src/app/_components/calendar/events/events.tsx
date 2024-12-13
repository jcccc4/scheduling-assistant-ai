// Component to display calendar events
"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { gridHeight } from "../calendar";
import { formatTime } from "@/utilities/formatSimpleTime";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TaskForm } from "../form/form";
import { Task } from "@/lib/types";

interface CalendarEventProps {
  eventData: Task;
  length: number;
  index: number;
  handleTask: (task: Task) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  eventData,
  length,
  index,
  handleTask,
  openPopoverId,
  setOpenPopoverId,
}) => {
  const { id,title, startTime, endTime, description } = eventData;
  const startMinute = startTime.getHours() * 60 + startTime.getMinutes();
  const endMinute = endTime.getHours() * 60 + endTime.getMinutes();
  const durationMinutes = endMinute - startMinute;

  // Calculate the height in pixels
  const height =
    durationMinutes * (gridHeight / 60) + (1 * durationMinutes) / 60;

  return (
    <Popover
      open={openPopoverId === id}
      onOpenChange={(isOpen) => {
        setOpenPopoverId(isOpen ? id : null);
      }}
    >
      <PopoverTrigger asChild>
        <div
          onClick={(e) => {
            // Your click handler here
            e.stopPropagation(); // Prevent event bubbling if needed
          }}
          style={{
            height: `${height}px`,
            width:
              length > 1
                ? `calc(100% / ${length} + ${8 * (length - 1)}px)`
                : "100%",
            left: `calc(100% * ${index / length} - ${8 * index}px )`,
          }} //Use inline styles for precise pixel control.
          className={cn(
            " absolute w-[100%] z-10 border border-white",
            "bg-blue-500 text-white rounded-md pl-2  animate-fade-in transition-all duration-500"
          )}
        >
          <div className="font-semibold text-[10px] md:text-sm truncate">{title}</div>
          <div className="text-[8px] md:text-xs text-white/90">
            {formatTime(startTime)}
            {" - "}
            {formatTime(endTime)}
          </div>
          {description && (
            <div className="text-xs text-white/80 truncate mt-1">
              {description}
            </div>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent side="right" className="w-[280px] md:w-full p-2 md:p-4">
        <TaskForm
          handleTask={handleTask}
          title={eventData.title}
          id={eventData.id}
          selectedDate={eventData.startTime}
          endDate={eventData.endTime}
          operation="edit"
          setOpenPopoverId={setOpenPopoverId}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarEvent;
