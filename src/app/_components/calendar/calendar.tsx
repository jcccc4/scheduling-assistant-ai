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

export const gridHeight = 50;
//style autorows
export const TimeColumn = () => (
  <div
    className={`grid gap-[1px]`}
    style={{ gridAutoRows: `${gridHeight}px` }}
 >
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
  const [view, setView] = useState("weekly"); // Set "month" as default
  const [month, setMonth] = useState(new Date().getMonth()); // Set "month" as default
  const [year, setYear] = useState(new Date().getFullYear()); // Set "month" as default
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "test",
      title: "test",
      startTime: new Date(2024, 10, 30, 1),
      endTime: new Date(2024, 10, 30, 2),
    },
  ]);

  const today = new Date();

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const CalendarHeader = () => {
    return (
      <header className="h-14 bg-white flex items-center justify-between text-xl px-4 shrink-0">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <h1 className="font-semibold">{`${
            MONTHS[today.getMonth()]
          } ${today.getFullYear()}`}</h1>
          <Button variant="outline" size="sm">
            Today
          </Button>
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
        return <WeeklyView onAddTask={handleAddTask} tasks={tasks} />;

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
