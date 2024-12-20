import { Task } from "@prisma/client";
import { getTasks } from "@/lib/api";

interface WorkingHours {
  start: number;
  end: number;
}

function taskArray(
  tasks: Task[],
  date: Date,
  workingHours: WorkingHours = { start: 9, end: 17 }
) {
  const totalIntervals = workingHours.end - workingHours.start;
  const timeSlots = new Array(totalIntervals).fill(false); // false means available

  // Filter tasks for the current day
  const dayTasks = tasks.filter((task) => {
    const taskDate = new Date(task.startTime);
    return (
      taskDate.getDate() === date.getDate() &&
      taskDate.getMonth() === date.getMonth() &&
      taskDate.getFullYear() === date.getFullYear()
    );
  });

  // Mark occupied time slots
  dayTasks.forEach((task) => {
    const taskStart = new Date(task.startTime);
    const taskEnd = new Date(task.endTime);

    // Adjust task times to working hours if they fall outside
    const effectiveStart = Math.max(
      taskStart.getHours() + taskStart.getMinutes() / 60,
      workingHours.start
    );
    const effectiveEnd = Math.min(
      taskEnd.getHours() + taskEnd.getMinutes() / 60,
      workingHours.end
    );

    // Convert to slot indices
    const startSlot = Math.floor(effectiveStart - workingHours.start);
    const endSlot = Math.ceil(effectiveEnd - workingHours.start);

    // Mark slots as occupied
    for (let i = startSlot; i < endSlot && i < timeSlots.length; i++) {
      timeSlots[i] = true; // true means occupied
    }
  });

  return timeSlots;
}

function isDayFullyBooked(
  tasks: Task[],
  date: Date,
  newTaskDuration: number,
  workingHours: WorkingHours = { start: 9, end: 17 }
): boolean {
  const timeSlots = taskArray(tasks, date, workingHours);

  // Check if there's enough consecutive free slots for the new task
  const requiredSlots = Math.ceil(newTaskDuration);
  let consecutiveFreeSlots = 0;

  for (let i = 0; i < timeSlots.length; i++) {
    if (!timeSlots[i]) {
      consecutiveFreeSlots++;
      if (consecutiveFreeSlots >= requiredSlots) {
        return false; // Found enough space for the new task
      }
    } else {
      consecutiveFreeSlots = 0;
    }
  }

  return true; // Day is fully booked (no suitable slot found)
}

export async function findAvailableTimeSlot(
  taskDate: Date,
  newTaskDuration: number
): Promise<{ startTime: Date; endTime: Date }> {
  const tasks = await getTasks();
  const workingHours = { start: 9, end: 17 };
  // Sort existing tasks by start time
  const sortedTasks = tasks.sort(
    (a, b) => (a.startTime?.getTime() || 0) - (b.startTime?.getTime() || 0)
  );

  const today = new Date(taskDate);
  let currentDay = new Date(today);
  currentDay.setHours(workingHours.start, 0, 0, 0); // Start working hours at 9 AM
  const workingHoursPerDay = workingHours.end - workingHours.start;

  // Skip weekends
  while (
    currentDay.getDay() === 0 ||
    currentDay.getDay() === 6 ||
    isDayFullyBooked(sortedTasks, currentDay, newTaskDuration, workingHours)
  ) {
    currentDay.setDate(currentDay.getDate() + 1);
    // Skip to Monday if it's Saturday
    if (currentDay.getDay() === 6) {
      currentDay.setDate(currentDay.getDate() + 2);
    }
  }

  if (newTaskDuration <= 0) {
    throw new Error('Task duration must be positive');
  }
  
  if (taskDate < new Date()) {
    throw new Error('Task date cannot be in the past');
  }
  if (newTaskDuration > workingHoursPerDay) {
    throw new Error(`Task duration cannot exceed working hours (${workingHoursPerDay} hours)`);
  }
  const timeSlots = taskArray(tasks, currentDay, workingHours);
  const requiredSlots = Math.ceil(newTaskDuration);
  let consecutiveFreeSlots = 0;
  let startHour = 0;
  for (let i = 0; i < timeSlots.length; i++) {
    if (!timeSlots[i]) {
      consecutiveFreeSlots++;
      if (consecutiveFreeSlots >= requiredSlots) {
        startHour = i - requiredSlots + workingHours.start;
        break;
      }
    } else {
      consecutiveFreeSlots = 0;
    }
  }

  const startTime = new Date(currentDay);
  startTime.setHours(startHour, 0, 0, 0);
  const endTime = new Date(startTime);
  endTime.setHours(startHour + newTaskDuration, 0, 0, 0);

  return { startTime, endTime };
}
