export const formatDateToYYYYMMDD = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatTimeToHHMM = (date: Date): string => {
  return date.toTimeString().slice(0, 5);
};

export const combineDateTime = (date: string, time: string): Date => {
  return new Date(`${date}T${time}`);
};

export const addMinutes = (date: Date, minutes: number): Date => {
  return new Date(date.getTime() + minutes * 60000);
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};