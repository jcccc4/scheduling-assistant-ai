import React from 'react';
import { Task } from '@/lib/types';
import { cn } from '@/lib/utils';
import { formatTime } from '@/utilities/formatSimpleTime';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TaskForm } from '../form/EventForm';
import { TaskList } from './TaskList';

interface MonthlyViewCellProps {
  date: Date | null;
  tasks: Task[];
  isToday: boolean;
  handleTask: (task: Task) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

export const MonthlyViewCell: React.FC<MonthlyViewCellProps> = ({
  date,
  tasks,
  isToday,
  handleTask,
  openPopoverId,
  setOpenPopoverId,
}) => {
  if (!date) {
    return <div className="bg-white min-h-[100px] md:min-h-[150px]" />;
  }

  return (
    <div
      className={cn(
        "bg-white min-h-[100px] md:min-h-[150px] flex flex-col p-1 md:p-2 relative",
        isToday && "ring-2 ring-blue-500"
      )}
    >
      <div
        className={cn(
          "flex justify-between items-center",
          isToday && "font-bold text-blue-600"
        )}
      >
        <span>{date.getDate()}</span>
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
              <div className="text-[10px] md:text-xs mt-1 p-1 bg-blue-50 text-blue-800 rounded truncate hover:bg-blue-100 cursor-pointer">
                <div className="font-semibold truncate">{task.title}</div>
                <div className="text-xs opacity-75">
                  {formatTime(task.startTime)}
                  {task.endTime && ` - ${formatTime(task.endTime)}`}
                </div>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <TaskForm
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
              <TaskList
                tasks={tasks}
                handleTask={handleTask}
                openPopoverId={openPopoverId}
                setOpenPopoverId={setOpenPopoverId}
              />
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
          <TaskForm
            handleTask={handleTask}
            selectedDate={date}
            setOpenPopoverId={setOpenPopoverId}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};