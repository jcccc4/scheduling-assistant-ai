import { useState, useEffect, useOptimistic } from "react";
import { Task } from "@/lib/types";
import { createTask, deleteTask, getTasks, updateTask } from "@/lib/api";

type OptimisticAction = {
  task: Task;
  type: "add" | "edit" | "delete";
};

export const useCalendarEvents = () => {
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, []);

  const handleTask = async (task: Task, operation = "add") => {
    try {
      // Optimistically update the UI
      addOptimisticTask({
        task,
        type: operation as "add" | "edit" | "delete",
      });

      // Then perform the API call
  
      switch (operation) {
        case "add":
           await createTask(task);
          break;
        case "edit":
          await updateTask(task);
          break;
        case "delete":
          await deleteTask(task.id);
     // For delete, we'll use the original task
          break;
      }
    } catch (error) {
      // Revert to the previous state by re-fetching tasks
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
      console.error("Failed to handle task:", error);
    }
  };

  return {
    isLoading,
    tasks: optimisticTasks,
    handleTask,
  };
};