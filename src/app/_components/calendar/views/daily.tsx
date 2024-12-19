"use client";

import { Task } from "@prisma/client";
import { TimeColumn } from "../components/TimeColumn";
import { gridHeight, today } from "../calendar";
import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { EventForm } from "../form/EventForm";
import CalendarEvent from "../events/events";
import { useIsMobile } from "@/hooks/use-mobile";

interface DailyViewProps {
  tasks: Task[];
  handleTask: (task: Task) => void;
  selectedDate: Date;
}

export const DailyView = ({ tasks, handleTask, selectedDate }: DailyViewProps) => {
  selectedDate.setHours(0, 0, 0, 0);
  const [currentTimeHeight, setCurrentTimeHeight] = useState(0);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);
  const isMobile = useIsMobile();
  useEffect(() => {
    const updateTimeBar = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      setCurrentTimeHeight(hours * gridHeight + (minutes / 60) * gridHeight + hours);
    };

    updateTimeBar();
    const interval = setInterval(updateTimeBar, 60000);
    return () => clearInterval(interval);
  }, []);

  const dailyTasks = tasks.filter((task) => {
    const taskDate = new Date(task.startTime);
    return (
      taskDate.getFullYear() === selectedDate.getFullYear() &&
      taskDate.getMonth() === selectedDate.getMonth() &&
      taskDate.getDate() === selectedDate.getDate()
    );
  });

  const uniqueStartTimeTasks = dailyTasks.filter(
    (task, index, self) =>
      index === self.findIndex((t) => t.startTime.getTime() === task.startTime.getTime())
  );

  return (
    <div data-testid="daily-view" className="relative h-fit">
      <div className="grid grid-cols-[40px_1fr] md:grid-cols-[60px_1fr] gap-[1px] min-h-0 grow shrink overflow-auto">
        <TimeColumn gridHeight={gridHeight} />
        <div className="relative w-full">
          <div className="relative">
            {uniqueStartTimeTasks.map((uniqueTask) => {
              const { startTime } = uniqueTask;
              const hourTasks = dailyTasks.filter((task) => {
                const taskStart = new Date(task.startTime);
                const taskEnd = task.endTime ? new Date(task.endTime) : null;
                return taskEnd ? 
                  startTime >= taskStart && startTime < taskEnd :
                  startTime >= taskStart;
              });

              return (
                <div
                  key={startTime.getTime()}
                  style={{
                    top: `${startTime.getHours() * gridHeight + startTime.getHours()}px`,
                  }}
                  className="w-11/12 absolute left-0 animate-fade-in transition-all duration-300 z-10"
                >
                  {hourTasks.map((task, index) => {
                    const taskKey = task.id || `${task.startTime.getTime()}-${index}`;
                    return task.startTime.getHours() === startTime.getHours() ? (
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

            {selectedDate.getFullYear() === today.getFullYear() &&
              selectedDate.getMonth() === today.getMonth() &&
              selectedDate.getDate() === today.getDate() && (
                <div
                  style={{ top: `${currentTimeHeight}px` }}
                  className="absolute left-0 w-full"
                >
                  <div className="h-2 w-2 rounded-full absolute left-[-4px] top-[-3px] bg-orange-500 z-10" />
                  <div className="w-full h-[2px] bg-orange-500 z-10" />
                </div>
            )}

            {Array.from({ length: 24 }).map((_, hour) => {
              const taskDate = new Date(selectedDate);
              taskDate.setHours(hour);
              return (
                <Popover
                  key={hour}
                  open={openPopoverId === `${hour}`}
                  onOpenChange={(isOpen) => {
                    setOpenPopoverId(isOpen ? `${hour}` : null);
                  }}
                >
                  <PopoverTrigger asChild>
                    <div
                      className={cn(
                        "relative hover:bg-slate-100 h-[40px] md:h-[50px] border-b border-gray-200 cursor-pointer"
                      )}
                      onClick={(e) => e.stopPropagation()}
               
                    />
                  </PopoverTrigger>
                  <PopoverContent className="w-[280px] md:w-80 p-2 md:p-4" side={isMobile ? "bottom" : "left"}>
                    <EventForm
                      handleTask={handleTask} 
                      selectedDate={taskDate}
                      setOpenPopoverId={setOpenPopoverId}
                    />
                  </PopoverContent>
                </Popover>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};