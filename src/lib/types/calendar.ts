import { Dispatch, MouseEventHandler, SetStateAction } from "react";

export interface Task {
  id: string;
  title: string;
  startTime: Date;
  endTime?: Date;
  duration: number;
  priority: "low" | "medium" | "high";
}

export interface CalendarViewProps {
  tasks: Task[];
  handleTask: (task: Task) => void;
  selectedDate: Date;
}

export interface ViewState {
  view: string;
  setView: (view: string) => void;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
  handlePreviousWeek: MouseEventHandler<HTMLButtonElement>;
  handleNextWeek: MouseEventHandler<HTMLButtonElement>;
  timeBarRef: React.RefObject<HTMLDivElement>;
}

export type ViewType = "daily" | "weekly" | "monthly";
