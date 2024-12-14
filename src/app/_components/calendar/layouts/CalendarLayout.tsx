import React from 'react';
import { Loader2 } from 'lucide-react';
import { CalendarHeader } from '../components/Header';
import { Task } from '@/lib/types';

interface CalendarLayoutProps {
  view: string;
  setView: (view: string) => void;
  handlePreviousWeek: () => void;
  handleNextWeek: () => void;
  handleTask: (task: Task) => void;
  isLoading: boolean;
  timeBarRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export const CalendarLayout: React.FC<CalendarLayoutProps> = ({
  view,
  setView,
  handlePreviousWeek,
  handleNextWeek,
  handleTask,
  isLoading,
  timeBarRef,
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
      <div
        ref={timeBarRef}
        className="bg-[hsl(var(--sidebar-border))] flex flex-col text-xs w-full grow overflow-auto"
      >
        {isLoading ? (
          <div className="flex flex-col h-screen items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
            <p className="mt-2 text-sm text-muted-foreground">
              Loading calendar...
            </p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};