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

interface HeaderProps {
  view: string;
  setView: (view: string) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  handleTask: (task: Task, operation?: string) => void;
}

export const CalendarHeader = ({
  view,
  setView,
  onPreviousWeek,
  onNextWeek,
}: HeaderProps) => {
  return (
    <header className="h-14 bg-white flex items-center justify-between text-xl px-4 shrink-0">
      <div className="flex items-center gap-4">
        <div>
          <SidebarTrigger />
          <Button variant="outline" size="sm">
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
        {/* <AddTaskDialog handleTask={handleTask} /> */}
        <Select value={view} onValueChange={setView}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
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