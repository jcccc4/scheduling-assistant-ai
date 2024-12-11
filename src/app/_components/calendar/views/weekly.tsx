import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DAYS, gridHeight, TimeColumn, today } from "../calendar";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import CalendarEvent from "../events/events";
import { TaskForm } from "../form/form";
import { useEffect, useState } from "react";

const isToday = (date: Date) => {
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};
const findTimeBarHeight = () => {
  const todayTime = new Date();
  console.log(
    ((todayTime.getHours() * 60 + todayTime.getMinutes()) / (24 * 60)) *
      gridHeight *
      24
  );
  return (
    ((todayTime.getHours() * 60 + todayTime.getMinutes()) / (24 * 60)) *
      gridHeight *
      24 +
    12
  );
};

const WeeklyHeader = ({ selectedDate }: { selectedDate: Date }) => (
  <div className="grid grid-cols-[60px_1fr] grid-rows-[80px] w-full bg-[hsl(var(--sidebar-border))] gap-[1px] py-[1px] sticky top-0">
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

export const WeeklyView = ({
  tasks,
  onAddTask,
  selectedDate,
}: {
  tasks: Task[];
  onAddTask: (task: Task) => void;
  selectedDate: Date;
}) => {
  selectedDate.setHours(0, 0, 0, 0);
  const [currentTimeHeight, setCurrentTimeHeight] = useState(findTimeBarHeight());
  
  useEffect(() => {
    // Update time immediately
    setCurrentTimeHeight(findTimeBarHeight());
    
    const interval = setInterval(() => {
      setCurrentTimeHeight(findTimeBarHeight());
    }, 1000 * 60 * 5); 
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div data-testid="weekly-view">
      <WeeklyHeader selectedDate={selectedDate} />
      <div className="grid grid-cols-[60px_1fr] gap-[1px] min-h-0 grow shrink">
        <TimeColumn />
        <div className="w-full grid grid-cols-7 gap-[1px] bg-[hsl(var(--sidebar-border))]">
          {Array.from({ length: 7 }).map((_, day) => {
            const dayDate = new Date(selectedDate);
            dayDate.setHours(0, 0, 0, 0);
            dayDate.setDate(
              selectedDate.getDate() - selectedDate.getDay() + day
            );

            return (
              <div
                key={dayDate.getDate()}
                className="relative grid grid-rows-[repeat(24, minmax(0, 1fr))] gap-[1px]"
              >
                {dayDate.getFullYear() >= today.getFullYear() &&
                  dayDate.getMonth() >= today.getMonth() &&
                  dayDate.getDate() >= today.getDate() && (
                    <div
                      style={{ top: `${currentTimeHeight}px` }}
                      className="absolute left-0 w-full bg-orange-500  z-10"
                    >
                      {isToday(dayDate)&& <div className="h-2 w-2 rounded-full absolute left-[-4px] top-[-3px] bg-orange-500  z-10"></div>}
                      <div className="w-full h-[2px]   z-10"></div>
                    </div>
                  )}
                {Array.from({ length: 24 }).map((_, hour) => {
                  const taskDate = new Date(dayDate);
                  taskDate.setHours(hour);

                  const filteredTasks = tasks
                    .filter((task) => {
                      const taskStart = new Date(task.startTime);
                      const taskEnd = task.endTime
                        ? new Date(task.endTime)
                        : null;

                      if (taskEnd === null) {
                        // If no end time, only check if after start time
                        return taskDate >= taskStart;
                      }

                      return taskDate >= taskStart && taskDate < taskEnd;
                    })
                    .sort((a, b) => {
                      const durationA =
                        new Date(a.endTime).getTime() -
                        new Date(a.startTime).getTime();
                      const durationB =
                        new Date(b.endTime).getTime() -
                        new Date(b.startTime).getTime();
                      return durationB - durationA; // ascending order
                    });

                  return (
                    <Popover key={hour}>
                      <PopoverTrigger asChild className="bg-white">
                        <div className={cn("relative hover:bg-slate-200 ")}>
                          <div className="w-11/12 relative">
                            {filteredTasks.map((task, index) => {
                              return task.startTime.getHours() ===
                                taskDate.getHours() &&
                                task.startTime.getDate() ===
                                  taskDate.getDate() &&
                                task.startTime.getMonth() ===
                                  taskDate.getMonth() &&
                                task.startTime.getFullYear() ===
                                  taskDate.getFullYear() ? (
                                <CalendarEvent
                                  key={index}
                                  title={filteredTasks[index].title}
                                  startTime={filteredTasks[index].startTime}
                                  endTime={filteredTasks[index].endTime}
                                  description={filteredTasks[index].description}
                                  length={filteredTasks.length}
                                  index={index}
                                />
                              ) : null;
                            })}
                          </div>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-4" side="left">
                        <TaskForm
                          onAddTask={onAddTask}
                          selectedDate={taskDate}
                        />
                      </PopoverContent>
                    </Popover>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
