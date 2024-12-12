"use client";
import { Task } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TaskForm } from "../../form/form";
import CalendarEvent from "../../events/events";
import { isToday } from "../../components/utils";
import { TimeColumn } from "../../components/TimeColumn";
import { gridHeight } from "../../calendar";

interface WeeklyGridProps {
  tasks: Task[];
  handleTask: (task: Task) => void;
  selectedDate: Date;
  currentTimeHeight: number;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

export const WeeklyGrid = ({
  tasks,
  handleTask,
  selectedDate,
  currentTimeHeight,
  openPopoverId,
  setOpenPopoverId,
}: WeeklyGridProps) => {
  return (
    <div className="grid grid-cols-[60px_1fr] gap-[1px] min-h-0 grow shrink overflow-auto">
      <TimeColumn gridHeight={gridHeight} />
      <div className="relative w-full grid grid-cols-7 gap-[1px] bg-[hsl(var(--sidebar-border))]">
        {Array.from({ length: 7 }).map((_, day) => {
          const dayDate = new Date(selectedDate);
          dayDate.setHours(0, 0, 0, 0);
          dayDate.setDate(selectedDate.getDate() - selectedDate.getDay() + day);

          const dailyTasks = tasks.filter((task) => {
            return (
              task.startTime.getFullYear() === dayDate.getFullYear() &&
              task.startTime.getMonth() === dayDate.getMonth() &&
              task.startTime.getDate() === dayDate.getDate()
            );
          });

          const uniqueStartTimeTasks = dailyTasks.filter(
            (task, index, self) =>
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
                    return durationB - durationA;
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

              {dayDate.getFullYear() >= new Date().getFullYear() &&
                dayDate.getMonth() >= new Date().getMonth() &&
                dayDate.getDate() >= new Date().getDate() && (
                  <div
                    style={{ top: `${currentTimeHeight}px` }}
                    className="absolute left-0 w-full bg-orange-500 z-10"
                  >
                    {isToday(dayDate) && (
                      <div className="h-2 w-2 rounded-full absolute left-[-4px] top-[-3px] bg-orange-500 z-10"></div>
                    )}
                    <div className="w-full h-[2px] z-10"></div>
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
                      <div className={cn("relative hover:bg-slate-200")}></div>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-4 z-[10000]" side="left">
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
  );
};