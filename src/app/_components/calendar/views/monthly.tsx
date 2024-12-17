"use client";

import { DAYS, today } from "../calendar";
import { Task } from "@/lib/types";
import { useState } from "react";
import { formatTime } from "@/utilities/formatSimpleTime";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { EventForm } from "../form/EventForm";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MonthlyViewProps {
  tasks: Task[];
  handleTask: (task: Task) => void;
  selectedDate: Date;
}

export const MonthlyView = ({ tasks, handleTask, selectedDate }: MonthlyViewProps) => {
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const daysInMonth = () => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const date = new Date(year, month, 1);
    const days = [];
    
    // Add empty spaces for days before the first of the month
    for (let i = 0; i < date.getDay(); i++) {
      days.push({ date: null, tasks: [] });
    }
    
    // Add all days in the month
    while (date.getMonth() === month) {
      const dayTasks = tasks.filter((task) => {
        const taskDate = new Date(task.startTime);
        return (
          taskDate.getFullYear() === year &&
          taskDate.getMonth() === month &&
          taskDate.getDate() === date.getDate()
        );
      });
      
      days.push({
        date: new Date(date),
        tasks: dayTasks.sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    return (
      date.getFullYear() === today.getFullYear() &&
      date.getMonth() === today.getMonth() &&
      date.getDate() === today.getDate()
    );
  };

  return (
    <div data-testid="monthly-view">
      <div className="w-full grid grid-cols-7 h-fit gap-[1px]">
        {DAYS.map((day) => (
          <div
            key={day}
            className="bg-white h-8 md:h-10 flex items-center justify-center font-semibold text-xs md:text-base"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-7 gap-[1px]">
        {daysInMonth().map(({ date, tasks }, i) => (
          <div
            key={i}
            className={cn(
              "bg-white min-h-[100px] md:min-h-[150px] flex flex-col p-1 md:p-2 relative",
              isToday(date) && "ring-2 ring-blue-500"
            )}
          >
            <div
              className={cn(
                "flex justify-between items-center",
                isToday(date) && "font-bold text-blue-600"
              )}
            >
              <span>{date?.getDate()}</span>
              {tasks.length > 0 && (
                <span className="text-[10px] md:text-xs bg-blue-100 text-blue-800 px-1.5 md:px-2 py-0.5 rounded-full">
                  {tasks.length}
                </span>
              )}
            </div>
            <div className="flex-1 overflow-hidden mt-1">
              {tasks.slice(0, 3).map((task) => (
                <Popover
                  key={task.id}
                  open={openPopoverId === task.id}
                  onOpenChange={(isOpen) => setOpenPopoverId(isOpen ? task.id : null)}
                >
                  <PopoverTrigger asChild>
                    <div
                      className="text-[10px] md:text-xs mt-1 p-1 bg-blue-50 text-blue-800 rounded truncate hover:bg-blue-100 cursor-pointer"
                    >
                      <div className="font-semibold truncate">{task.title}</div>
                      <div className="text-xs opacity-75">
                        {formatTime(task.startTime)}
                        {task.endTime && ` - ${formatTime(task.endTime)}`}
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <EventForm
                      handleTask={handleTask}
                      title={task.title}
                      id={task.id}
                      selectedDate={task.startTime}
                      endDate={task.endTime}
                      operation="edit"
                      setOpenPopoverId={setOpenPopoverId}
                    />
                  </PopoverContent>
                </Popover>
              ))}
              {tasks.length > 3 && (
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="text-[10px] md:text-xs text-gray-500 mt-0.5 md:mt-1 cursor-pointer hover:text-gray-700">
                      +{tasks.length - 3} more
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-auto w-[90vw] md:w-auto">
                    <div className="space-y-2">
                      {tasks.map((task) => (
                        <Popover
                          key={task.id}
                          open={openPopoverId === task.id}
                          onOpenChange={(isOpen) => setOpenPopoverId(isOpen ? task.id : null)}
                        >
                          <PopoverTrigger asChild>
                            <div className="p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                              <div className="font-medium text-sm md:text-base">{task.title}</div>
                              <div className="text-sm text-gray-500">
                                {formatTime(task.startTime)}
                                {task.endTime && ` - ${formatTime(task.endTime)}`}
                              </div>
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-[280px] md:w-80 p-2 md:p-4">
                            <EventForm
                              handleTask={handleTask}
                              title={task.title}
                              id={task.id}
                              selectedDate={task.startTime}
                              endDate={task.endTime}
                              operation="edit"
                              setOpenPopoverId={setOpenPopoverId}
                            />
                          </PopoverContent>
                        </Popover>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
              </DialogTrigger>
              <DialogContent className="w-[90vw] md:w-96">
                <EventForm
                  handleTask={handleTask}
                  selectedDate={date || selectedDate}
                  setOpenPopoverId={setOpenPopoverId}
                />
              </DialogContent>
            </Dialog>
          </div>
        ))}
      </div>
    </div>
  );
};