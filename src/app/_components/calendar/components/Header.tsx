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
import { MONTHS } from "../calendar";
import { Task } from "@prisma/client";
import { AddTaskDialog } from "./AddTaskDialog";
import { Session } from "next-auth";

interface HeaderProps {
  view: string;
  setView: (view: string) => void;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
  handleTask: (task: Task, operation?: string) => void;
  openPopoverId: string | null;
  setOpenPopoverId: (id: string | null) => void;
  setSelectedDate: (date: Date) => void;
  session: Session;
}

export const CalendarHeader = ({
  view,
  setView,
  onPreviousWeek,
  onNextWeek,
  handleTask,
  openPopoverId,
  setOpenPopoverId,
  setSelectedDate,
  session,
}: HeaderProps) => {
  const handleTodayClick = () => {
    setSelectedDate(new Date());
  };
  return (
    <header className=" bg-white flex  flex-col justify-between text-lg md:text-xl px-2 md:px-4 shrink-0">
      <div className="flex items-center justify-between gap-2 md:gap-4 h-12">
        <div className="flex">
          <SidebarTrigger />
          <h1 className=" font-semibold ">Planner</h1>
        </div>
        <div className="flex gap-4">
          <AddTaskDialog
            handleTask={handleTask}
            openPopoverId={openPopoverId}
            setOpenPopoverId={setOpenPopoverId}
            session={session}
          />
        </div>
      </div>
      <div className="flex items-center justify-between gap-4  h-12">
        <div>
          <h1 className=" font-semibold ">{`${
            MONTHS[new Date().getMonth()]
          } ${new Date().getFullYear()}`}</h1>
        </div>

        <div className="flex">
          <div className="hidden lg:flex gap-1 md:gap-2">
            <Button
              onClick={handleTodayClick}
              variant="outline"
              size="sm"
              className="text-xs md:text-sm"
            >
              Today
            </Button>
            <Button variant="ghost" size="icon" onClick={onPreviousWeek}>
              <ChevronLeft />
            </Button>
            <Button variant="ghost" size="icon" onClick={onNextWeek}>
              <ChevronRight />
            </Button>
          </div>
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
      </div>
    </header>
  );
};
