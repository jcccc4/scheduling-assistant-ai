import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DAYS, TimeColumn } from "../calendar";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import CalendarEvent from "../events/events";
import { useRef } from "react";
import { TaskForm } from "../form/form";

const WeeklyHeader = ({
  today,
  isToday,
}: {
  today: Date;
  isToday: (date: Date) => boolean;
}) => (
  <div className="grid grid-cols-[60px_1fr] grid-rows-[80px] w-full bg-[hsl(var(--sidebar-border))] gap-[1px] py-[1px] sticky top-0">
    <div className="w-full bg-white flex items-center justify-center">GMT</div>
    <div className="w-full grid grid-cols-7 gap-[1px]">
      {Array.from({ length: 7 }).map((_, index) => {
        const day = new Date(today);
        day.setDate(today.getDate() - today.getDay() + index);
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

export const WeeklyView = ({
  tasks,
  onAddTask,
}: {
  tasks: Task[];
  onAddTask: (task: Task) => void;
}) => {

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isToday = (date: Date) =>
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate();

  return (
    <div data-testid="weekly-view">
      <WeeklyHeader today={today} isToday={isToday} />
      <div className="grid grid-cols-[60px_1fr] gap-[1px] min-h-0 grow shrink">
        <TimeColumn />
        <div className="w-full grid grid-cols-7 gap-[1px] bg-[hsl(var(--sidebar-border))]">
          {Array.from({ length: 7 }).map((_, day) => (
            <div
              key={day}
              className="grid grid-rows-[repeat(24, minmax(0, 1fr))] gap-[1px]"
            >
              {Array.from({ length: 24 }).map((_, hour) => {
                const selectedDate = new Date(today);
                selectedDate.setDate(today.getDate() - today.getDay() + day);
                selectedDate.setHours(hour);
    
                const taskIndex = tasks.findIndex(
                  (task) =>
                    task.startTime.getHours() === hour &&
                    task.startTime.getDay() === day
                );

                return (
                  <Popover key={hour}>
                    <PopoverTrigger asChild className="bg-white">
                      <div
                   
                        className={cn("relative hover:bg-slate-200")}
                      >
                        {taskIndex !== -1 && (
                          <CalendarEvent
                            title={tasks[taskIndex].title}
                            startTime={tasks[taskIndex].startTime}
                            endTime={tasks[taskIndex].endTime}
                            description={tasks[taskIndex].description}
                            
                          />
                        )}
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-4" side="left">
                      <TaskForm onAddTask={onAddTask} selectedDate={selectedDate}/>
                    </PopoverContent>
                  </Popover>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
