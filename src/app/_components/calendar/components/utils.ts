import { gridHeight } from "../calendar";

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    today.getFullYear() === date.getFullYear() &&
    today.getMonth() === date.getMonth() &&
    today.getDate() === date.getDate()
  );
};

export const findTimeBarHeight = () => {
  const todayTime = new Date();
  const hours = todayTime.getHours();
  const minutes = todayTime.getMinutes();

  return hours * gridHeight + (minutes / 60) * gridHeight + hours;
};