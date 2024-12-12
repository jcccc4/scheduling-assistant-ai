"use client";
import React, { useEffect, useRef, useState } from "react";
import { WeeklyView } from "./views/weekly";
import { MonthlyView } from "./views/monthly";
import { DailyView } from "./views/daily";
import { Loader2 } from "lucide-react";
import { Task } from "@/lib/types";
import { CalendarHeader } from "./components/Header";
import { findTimeBarHeight } from "./components/utils";

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

export default function Scheduler() {
  const [view, setView] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState(today);
  const timeBarRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  const renderView = () => {
    switch (view) {
      case "daily":
        return (
          <DailyView
            handleTask={handleTask}
            tasks={tasks}
            selectedDate={selectedDate}
          />
        );
      case "weekly":
        return (
          <WeeklyView
            handleTask={handleTask}
            tasks={tasks}
            selectedDate={selectedDate}
          />
        );
      case "monthly":
        return (
          <MonthlyView
            handleTask={handleTask}
            tasks={tasks}
            selectedDate={selectedDate}
          />
        );
    }
  };

  useEffect(() => {
    if (timeBarRef.current) {
      setIsLoading(false);
      const currentHeight = findTimeBarHeight();
      // Subtract some offset (e.g., 100px) to show some time slots above the current time
      const offset = 100;
      timeBarRef.current.scrollTop = Math.max(0, currentHeight - offset);
    }
  }, [view]);

  return (
    <>
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
            renderView()
          )}
        </div>
      </div>
    </>
  );
}
