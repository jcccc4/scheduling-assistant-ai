import { today } from "../calendar";

export const isToday = (date: Date) => {
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

export const findTimeBarHeight = (gridHeight: number) => {
  const todayTime = new Date();
  const hours = todayTime.getHours();
  const minutes = todayTime.getMinutes();

  return hours * gridHeight + (minutes / 60) * gridHeight + hours;
};

export const getWeekDates = (selectedDate: Date) => {
  return Array.from({ length: 7 }).map((_, index) => {
    const day = new Date(selectedDate);
    day.setDate(selectedDate.getDate() - selectedDate.getDay() + index);
    return day;
  });
};
