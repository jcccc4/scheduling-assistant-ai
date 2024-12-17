import React from 'react';
import { Task } from '@/lib/types';
import { formatTime } from '@/utilities/formatSimpleTime';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { TaskForm } from '../form/EventForm';

interface TaskListProps {
  tasks: Task[];
  handleTask: (task: Task) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  handleTask,
  openPopoverId,
  setOpenPopoverId,
}) => {
  return (
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
    </div>
  );
};