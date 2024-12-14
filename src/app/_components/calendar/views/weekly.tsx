import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DAYS, gridHeight, today } from "../calendar";
import { TimeColumn } from "../components/TimeColumn";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import CalendarEvent from "../events/events";
import { TaskForm } from "../form/form";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const isToday = (date: Date) => {
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};
const findTimeBarHeight = () => {
  const todayTime = new Date();
  const hours = todayTime.getHours();
  const minutes = todayTime.getMinutes();

  return hours * gridHeight + (minutes / 60) * gridHeight + hours;
};

const WeeklyHeader = ({ selectedDate }: { selectedDate: Date }) => (
  <div className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] grid-rows-[60px] md:grid-rows-[80px] w-full bg-[hsl(var(--sidebar-border))] gap-[1px] py-[1px] sticky top-0 z-[40] bg-white overflow-x-auto">
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

export const WeeklyView = ({
  tasks,
  handleTask,
  selectedDate,
}: {
  tasks: Task[];
  handleTask: (task: Task) => void;
  selectedDate: Date;
}) => {
  selectedDate.setHours(0, 0, 0, 0);
  const [currentTimeHeight, setCurrentTimeHeight] = useState(
    findTimeBarHeight()
  );
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    // Update time bar position every
    const interval = setInterval(() => {
      setCurrentTimeHeight(findTimeBarHeight());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div data-testid="weekly-view" className="relative h-fit">
      <WeeklyHeader selectedDate={selectedDate} />
      <div className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-[1px] min-h-0 grow shrink overflow-auto">
        <TimeColumn gridHeight={gridHeight} />
        <div className="relative w-full  grid grid-cols-7 gap-[1px] bg-[hsl(var(--sidebar-border))]">
          {Array.from({ length: 7 }).map((_, day) => {
            const dayDate = new Date(selectedDate);
            dayDate.setHours(0, 0, 0, 0);
            dayDate.setDate(
              selectedDate.getDate() - selectedDate.getDay() + day
            );
            const dailyTasks = tasks.filter((task) => {
              return (
                task.startTime.getFullYear() === dayDate.getFullYear() &&
                task.startTime.getMonth() === dayDate.getMonth() &&
                task.startTime.getDate() === dayDate.getDate()
              );
            });
            const uniqueStartTimeTasks = dailyTasks.filter(
              (task, index, self) =>
                // Keep only the first occurrence of each start time
                index ===
                self.findIndex(
                  (t) => t.startTime.getTime() === task.startTime.getTime()
                )
            );

            return (
              <div
                key={dayDate.getDate()}
                className="relative grid grid-rows-[repeat(24, minmax(0, 1fr))] gap-[1px]"
              >
                {uniqueStartTimeTasks.map((uniqueTask) => {
                  const { startTime } = uniqueTask;
                  const hourTasks = dailyTasks
                    .filter((task) => {
                      const taskStart = new Date(task.startTime);
                      const taskEnd = task.endTime
                        ? new Date(task.endTime)
                        : null;

                      if (taskEnd === null) {
                        // If no end time, only check if after start time
                        return startTime >= taskStart;
                      }

                      return startTime >= taskStart && startTime < taskEnd;
                    })
                    .sort((a, b) => {
                      const durationA =
                        new Date(a.endTime).getTime() -
                        new Date(a.startTime).getTime();
                      const durationB =
                        new Date(b.endTime).getTime() -
                        new Date(b.startTime).getTime();
                      return durationB - durationA; // descending order (longest to shortest)
                    });

                  return (
                    <div
                      key={startTime.getTime()}
                      style={{
                        top: `${
                          startTime.getHours() * gridHeight +
                          1 * startTime.getHours()
                        }px`,
                      }}
                      className="w-11/12 absolute left-0 animate-fade-in transition-all duration-300 z-10"
                    >
                      {hourTasks.map((task, index) => {
                        const taskKey =
                          task.id || `${task.startTime.getTime()}-${index}`;

                        return task.startTime.getHours() ===
                          startTime.getHours() &&
                          task.startTime.getDate() === startTime.getDate() &&
                          task.startTime.getMonth() === startTime.getMonth() &&
                          task.startTime.getFullYear() ===
                            startTime.getFullYear() ? (
                          <CalendarEvent
                            key={taskKey}
                            eventData={task}
                            length={hourTasks.length}
                            index={index}
                            handleTask={handleTask}
                            openPopoverId={openPopoverId}
                            setOpenPopoverId={setOpenPopoverId}
                          />
                        ) : null;
                      })}
                    </div>
                  );
                })}

                {dayDate.getFullYear() >= today.getFullYear() &&
                  dayDate.getMonth() >= today.getMonth() &&
                  dayDate.getDate() >= today.getDate() && (
                    <div
                      style={{ top: `${currentTimeHeight}px` }}
                      className="absolute left-0 w-full bg-orange-500  z-10"
                    >
                      {isToday(dayDate) && (
                        <div className="h-2 w-2 rounded-full absolute left-[-4px] top-[-3px] bg-orange-500  z-10"></div>
                      )}
                      <div className="w-full h-[2px]   z-10"></div>
                    </div>
                  )}
                {Array.from({ length: 24 }).map((_, hour) => {
                  const taskDate = new Date(dayDate);
                  taskDate.setHours(hour);
                  return (
                    <Popover
                      key={hour}
                      open={openPopoverId === `${day}-${hour}`}
                      onOpenChange={(isOpen) => {
                        setOpenPopoverId(isOpen ? `${day}-${hour}` : null);
                      }}
                    >
                      <PopoverTrigger
                        asChild
                        className="bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <div
                          className={cn(
                            "relative hover:bg-slate-200 min-h-[40px] md:min-h-[50px]"
                          )}
                        ></div>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-full p-4 z-[10000]"
                        side={isMobile ? "bottom" : "left"}
                      >
                        <TaskForm
                          handleTask={handleTask}
                          selectedDate={taskDate}
                          setOpenPopoverId={setOpenPopoverId}
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
