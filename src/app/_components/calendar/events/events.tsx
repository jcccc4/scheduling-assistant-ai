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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { TaskForm } from "../form/form";
import { Task } from "@/lib/types";

interface CalendarEventProps {
  eventData: Task;
  length: number;
  index: number;
  onAddTask: (task: Task) => void;
}

const CalendarEvent: React.FC<CalendarEventProps> = ({
  eventData,
  length,
  index,
  onAddTask,
}) => {
  const { title, startTime, endTime, description } = eventData;
  const startMinute = startTime.getHours() * 60 + startTime.getMinutes();
  const endMinute = endTime.getHours() * 60 + endTime.getMinutes();
  const durationMinutes = endMinute - startMinute;

  // Calculate the height in pixels
  const height =
    durationMinutes * (gridHeight / 60) + (1 * durationMinutes) / 60;

  return (
    <Popover >
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
            "bg-blue-500 text-white rounded-md pl-2 z-50"
          )}
        >
          <div className="font-semibold text-sm truncate">{title}</div>
          <div className="text-xs text-white/90">
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
      <PopoverContent side="right" className="w-full p-4">
        <TaskForm
          onAddTask={onAddTask}
          title={eventData.title}
          selectedDate={eventData.startTime}
          endDate={eventData.endTime}
        />
      </PopoverContent>
    </Popover>
  );
};

export default CalendarEvent;
