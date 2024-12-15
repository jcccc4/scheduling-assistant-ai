"use client";
import React, {
  startTransition,
  useEffect,
  useOptimistic,
  useState,
} from "react";
import { WeeklyView } from "./views/weekly";
import { MonthlyView } from "./views/monthly";
import { DailyView } from "./views/daily";
import { Task } from "@/lib/types";
import { createTask, deleteTask, getTasks, updateTask } from "@/lib/api";
import { CalendarLayout } from "./layouts/CalendarLayout";

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

type OptimisticAction = {
  task: Task;
  type: "add" | "edit" | "delete";
};
export default function Scheduler() {
  const [view, setView] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState(today);

  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);


  const [optimisticTasks, addOptimisticTask] = useOptimistic(
    tasks,
    (state: Task[], action: OptimisticAction) => {
      switch (action.type) {
        case "add":
          return [...state, action.task];
        case "edit":
          return state.map((t) =>
            t.id === action.task.id ? { ...t, ...action.task } : t
          );
        case "delete":
          return state.filter((t) => t.id !== action.task.id);
        default:
          return state;
      }
    }
  );
  const handleTask = async (task: Task, operation = "add") => {
    try {
      // Optimistically update the UI
      startTransition(() => {
        addOptimisticTask({
          task,
          type: operation as "add" | "edit" | "delete",
        });
      });

      // Then perform the API call
      let serverTask: Task;
      switch (operation) {
        case "add":
          serverTask = await createTask(task);
          break;
        case "edit":
          serverTask = await updateTask(task);
          break;
        case "delete":
          await deleteTask(task.id);
          serverTask = task; // For delete, we'll use the original task
          break;
      }

      // Update the actual state only after successful API call
      setTasks((prevTasks) => {
        if (operation === "delete") {
          return prevTasks.filter((t) => t.id !== task.id);
        } else if (operation === "edit") {
          return prevTasks.map((t) => (t.id === task.id ? serverTask : t));
        } else {
          return [...prevTasks, serverTask];
        }
      });
    } catch (error) {
      // Revert to the previous state by re-fetching tasks
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      console.error("Failed to handle task:", error);
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
    const loadTasks = async () => {
      setIsLoading(true);
      try {
        const fetchedTasks = await getTasks();

        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 100);
      }
    };

    // Call loadTasks immediately
    loadTasks();
  }, []);

  return (
    <CalendarLayout
      view={view}
      setView={setView}
      handlePreviousWeek={handlePreviousWeek}
      handleNextWeek={handleNextWeek}
      handleTask={handleTask}
      
    >
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        renderView()
      )}
    </CalendarLayout>
  );
}
