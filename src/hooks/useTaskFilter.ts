import { Task } from '@/lib/types';

export const useTaskFilter = () => {
  const filterDailyTasks = (tasks: Task[], selectedDate: Date) => {
    selectedDate.setHours(0, 0, 0, 0);
    return tasks.filter((task) => {
      const taskDate = new Date(task.startTime);
      return (
        taskDate.getFullYear() === selectedDate.getFullYear() &&
        taskDate.getMonth() === selectedDate.getMonth() &&
        taskDate.getDate() === selectedDate.getDate()
      );
    });
  };

  const getUniqueStartTimeTasks = (tasks: Task[]) => {
    return tasks.filter(
      (task, index, self) =>
        index === self.findIndex((t) => t.startTime.getTime() === task.startTime.getTime())
    );
  };

  const getHourTasks = (tasks: Task[], startTime: Date) => {
    return tasks.filter((task) => {
      const taskStart = new Date(task.startTime);
      const taskEnd = task.endTime ? new Date(task.endTime) : null;
      return taskEnd ? 
        startTime >= taskStart && startTime < taskEnd :
        startTime >= taskStart;
    }).sort((a, b) => {
      const durationA = new Date(a.endTime).getTime() - new Date(a.startTime).getTime();
      const durationB = new Date(b.endTime).getTime() - new Date(b.startTime).getTime();
      return durationB - durationA;
    });
  };

  return {
    filterDailyTasks,
    getUniqueStartTimeTasks,
    getHourTasks,
  };
};