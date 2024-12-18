"use client";
import { SidebarTrigger } from "../../../../components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { AddTaskDialog } from "./AddTaskDialog";
import { MONTHS, today } from "../calendar";
import { Task } from "@/lib/types";
import { AddTaskDialog } from "./AddTaskDialog";

interface HeaderProps {
  view: string;
  setView: (view: string) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  handleTask: (task: Task, operation?: string) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
}

export const CalendarHeader = ({
  view,
  setView,
  onPreviousWeek,
  onNextWeek,
  handleTask,
  openPopoverId,
  setOpenPopoverId,
}: HeaderProps) => {
  return (
    <header className="h-12 md:h-14 bg-white flex items-center justify-between text-lg md:text-xl px-2 md:px-4 shrink-0">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex gap-1 md:gap-2">
          <SidebarTrigger />
          <Button variant="outline" size="sm" className="text-xs md:text-sm">
            Today
          </Button>
          <Button variant="ghost" size="icon" onClick={onPreviousWeek}>
            <ChevronLeft />
          </Button>
          <Button variant="ghost" size="icon" onClick={onNextWeek}>
            <ChevronRight />
          </Button>
        </div>
        <h1 className="font-semibold">{`${
          MONTHS[today.getMonth()]
        } ${today.getFullYear()}`}</h1>
      </div>
      <div className="flex items-center gap-4">
        <AddTaskDialog
          handleTask={handleTask}
          openPopoverId={openPopoverId}
          setOpenPopoverId={setOpenPopoverId}
        />
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-[140px] md:w-[180px] text-xs md:text-sm">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent className="text-xs md:text-sm">
            <SelectGroup>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};
