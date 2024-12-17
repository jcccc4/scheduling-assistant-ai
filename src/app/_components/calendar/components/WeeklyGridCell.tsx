import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { TaskForm } from "../form/EventForm";
import { Task } from "@/lib/types";
import { useIsMobile } from "@/hooks/use-mobile";

interface WeeklyGridCellProps {
  day: number;
  hour: number;
  taskDate: Date;
  handleTask: (task: Task) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

export const WeeklyGridCell: React.FC<WeeklyGridCellProps> = ({
  day,
  hour,
  taskDate,
  handleTask,
  openPopoverId,
  setOpenPopoverId,
}) => {
  return (
    <Popover
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
        <div className={cn("relative hover:bg-slate-200 min-h-[40px] md:min-h-[50px]")} />
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-4 z-[10000]"
        side={useIsMobile() ? "bottom" : "left"}
      >
        <TaskForm
          handleTask={handleTask}
          selectedDate={taskDate}
          setOpenPopoverId={setOpenPopoverId}
        />
      </PopoverContent>
    </Popover>
  );
};