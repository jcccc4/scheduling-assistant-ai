import React from "react";
import { CalendarHeader } from "../components/Header";
import { Task } from "@prisma/client";
import { Session } from "next-auth";

interface CalendarLayoutProps {
  view: string;
  setView: (view: string) => void;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  handleTask: (task: Task) => void;
  children: React.ReactNode;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
  setSelectedDate: (date: Date) => void;
  session: Session;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  view,
  setView,
  handlePreviousWeek,
  handleNextWeek,
  handleTask,
  openPopoverId,
  setOpenPopoverId,
  children,
  setSelectedDate,
  session,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <CalendarHeader
        view={view}
        setView={setView}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        handleTask={handleTask}
        openPopoverId={openPopoverId}
        setOpenPopoverId={setOpenPopoverId}
        setSelectedDate={setSelectedDate}
        session={session}
      />
      {children}
    </div>
  );
};
