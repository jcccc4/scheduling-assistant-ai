import { Task } from "@/lib/types";

function isDateBetween(
  dateToCheck: Date,
  startDate: Date,
  endDate: Date
): boolean {
  return dateToCheck >= startDate && dateToCheck <= endDate;
}

function findOverlappingTasks(tasks: Task[], date: Date): number {
  const filteredTasks: Task[] = tasks
    .filter(
      (task) =>
        task.startTime.toDateString() === date.toDateString() ||
        task.endTime.toDateString() === date.toDateString()
    )
    .map((task) => {
      const newTask = {
        ...task,
        startTime: new Date(task.startTime),
        endTime: new Date(task.endTime)
      };

      const yesterday = new Date(date);
      yesterday.setDate(date.getDate() - 1);
      const tomorrow = new Date(date);
      tomorrow.setDate(date.getDate() + 1);
      if (
        task.startTime.toDateString() === yesterday.toDateString() &&
        task.endTime.toDateString() === date.toDateString()
      ) {
        newTask.startTime.setDate(date.getDate());
        newTask.startTime.setHours(0, 0, 0, 0);
      }
      if (
        task.startTime.toDateString() === date.toDateString() &&
        task.endTime.toDateString() === tomorrow.toDateString()
      ) {
        newTask.endTime.setHours(0, 0, 0, 0);
      }
      return newTask;
    });

  if (filteredTasks.length <= 1) return 0;

  // Create a timeline array (assuming times are in minutes from start of day)
  const timeline = new Array(24 * 60).fill(0);

  // Mark task durations in timeline
  filteredTasks.forEach((task) => {
    const startMinute =
      task.startTime.getHours() * 60 + task.startTime.getMinutes();
    const endMinute = task.endTime.getHours() * 60 + task.endTime.getMinutes();

    for (let i = startMinute; i <= endMinute; i++) {
      timeline[i]++;
    }
  });

  // Find maximum overlaps
  return Math.max(...timeline)
}
