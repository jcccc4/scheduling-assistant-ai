import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DAYS, TimeColumn, today } from "../calendar";
import { Task } from "@/lib/types";
import { cn } from "@/lib/utils";
import CalendarEvent from "../events/events";
import { TaskForm } from "../form/form";

const isToday = (date: Date) => {
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
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
                className="grid grid-rows-[repeat(24, minmax(0, 1fr))] gap-[1px]"
              >
                {Array.from({ length: 24 }).map((_, hour) => {
                  const taskDate = new Date(dayDate);
                  taskDate.setHours(hour);

                  const taskIndex = tasks.findIndex(
                    (task) =>
                      task.startTime.getHours() === taskDate.getHours() &&
                      task.startTime.getDate() === taskDate.getDate() &&
                      task.startTime.getMonth() === taskDate.getMonth() &&
                      task.startTime.getFullYear() === taskDate.getFullYear()
                  );

                  return (
                    <Popover key={hour}>
                      <PopoverTrigger asChild className="bg-white">
                        <div className={cn("relative hover:bg-slate-200")}>
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
                        <TaskForm
                          onAddTask={onAddTask}
                          selectedDate={selectedDate}
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
