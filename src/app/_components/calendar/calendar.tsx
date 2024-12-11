"use client";
import React, { useState } from "react";
import { SidebarTrigger } from "../../../components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { formatSimpleTime } from "@/utilities/formatSimpleTime";
import { Button } from "@/components/ui/button";
import { Task } from "@/lib/types";
import { WeeklyView } from "./views/weekly";
import { MonthlyView } from "./views/monthly";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DailyView } from "./views/daily";

export const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const today = new Date();

export const gridHeight = 50;
//style autorows
export const TimeColumn = () => (
  <div className={`grid gap-[1px]`} style={{ gridAutoRows: `${gridHeight}px` }}>
    {Array.from({ length: 24 }).map((_, index) => (
      <div
        key={index}
        className="bg-white w-full flex items-start justify-center pt-2"
      >
        {formatSimpleTime(index)}
      </div>
    ))}
  </div>
);

export default function Scheduler() {
  const [view, setView] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState(today);

  const [month, setMonth] = useState(new Date().getMonth()); // Set "month" as default
  const [year, setYear] = useState(new Date().getFullYear()); // Set "month" as default
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "215f16bc-bc5b-4879-bb8b-7a72e859ee56",
      title: "test",
      startTime: new Date(2024, 11, 12, 1),
      endTime: new Date(2024, 11, 12, 6),
    },
    {
      id: "6a99b720-7782-4312-8e86-c938facc1588",
      title: "test",
      startTime: new Date(2024, 11, 12, 1),
      endTime: new Date(2024, 11, 12, 2),
    },
    {
      id: "5550b2c8-1c52-4c85-a1fe-f2c0543b87e8",
      title: "test",
      startTime: new Date(2024, 11, 12, 1),
      endTime: new Date(2024, 11, 12, 3),
    },
    {
      id: "5550b2c8-1c52-4c85-a1fe-f2c0543b87e6",
      title: "tester",
      startTime: new Date(2024, 11, 12, 8),
      endTime: new Date(2024, 11, 12, 10),
    },
  ]);

  const handleTask = (task: Task, operation = "add") => {
    switch (operation) {
      case "add":
        setTasks([...tasks, task]);
        break;
      case "edit":
        setTasks(tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)));
        break;
      case "delete":
        setTasks(tasks.filter((t) => t.id !== task.id));
        break;
      default:
        break;
    }
  };

  const handlePreviousWeek = (
    selectedDate: Date,
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
  ) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = (
    selectedDate: Date,
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
  ) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const CalendarHeader = () => {
    return (
      <header className="h-14 bg-white flex items-center justify-between text-xl px-4 shrink-0">
        <div className="flex items-center gap-4">
          <div>
            <SidebarTrigger />

            <Button variant="outline" size="sm">
              Today
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlePreviousWeek(selectedDate, setSelectedDate)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleNextWeek(selectedDate, setSelectedDate)}
            >
              <ChevronRight />
            </Button>
          </div>
          <h1 className="font-semibold">{`${
            MONTHS[today.getMonth()]
          } ${today.getFullYear()}`}</h1>
        </div>
        <div className="flex items-center gap-4">
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

  const renderView = () => {
    switch (view) {
      case "daily":
        return <DailyView />;
      case "weekly":
        return (
          <WeeklyView
            handleTask={handleTask}
            tasks={tasks}
            selectedDate={selectedDate}
          />
        );

      case "monthly":
        return <MonthlyView />;
    }
  };

  return (
    <>
      <CalendarHeader />
      <div className="bg-[hsl(var(--sidebar-border))] flex flex-col text-xs w-full grow overflow-auto">
        {renderView()}
      </div>
    </>
  );
}
