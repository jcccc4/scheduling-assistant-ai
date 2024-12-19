import React from 'react';
import { Task } from "@prisma/client";
import { WeeklyGridCell } from './WeeklyGridCell';

interface HourCellsProps {
  day: number;
  selectedDate: Date;
  handleTask: (task: Task) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

export const HourCells: React.FC<HourCellsProps> = ({
  day,
  selectedDate,
  handleTask,
  openPopoverId,
  setOpenPopoverId,
}) => {
  return (
    <>
      {Array.from({ length: 24 }).map((_, hour) => {
        const taskDate = new Date(selectedDate);
        taskDate.setHours(hour);
        return (
          <WeeklyGridCell
            key={hour}
            day={day}
            hour={hour}
            taskDate={taskDate}
            handleTask={handleTask}
            openPopoverId={openPopoverId}
            setOpenPopoverId={setOpenPopoverId}
          />
        );
      })}
    </>
  );
};