import React from "react";
import { Loader2 } from "lucide-react";
import { CalendarHeader } from "../components/Header";
import { Task } from "@/lib/types";

interface CalendarLayoutProps {
  view: string;
  setView: (view: string) => void;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  handleTask: (task: Task) => void;

  children: React.ReactNode;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  view,
  setView,
  handlePreviousWeek,
  handleNextWeek,
  handleTask,
  children,
}) => {
  return (
    <div className="flex flex-col h-screen">
      <CalendarHeader
        view={view}
        setView={setView}
        onPreviousWeek={handlePreviousWeek}
        onNextWeek={handleNextWeek}
        handleTask={handleTask}
      />
      {children}
    </div>
  );
};
