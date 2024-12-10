export function formatSimpleTime(hours: number, minutes: number = 0): string {
  // Handle edge cases
  if (hours < 0 || hours > 23) return "Invalid hours";
  if (minutes < 0 || minutes > 59) return "Invalid minutes";

  const period: string = hours >= 12 ? "PM" : "AM";
  const displayHours: number = hours % 12 || 12;

  // displayHours.toString() will automatically show numbers without leading zeros
  return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`;
}

export function formatTime(date: Date): string {
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();

  // Handle edge cases
  if (hours < 0 || hours > 23) return "Invalid hours";
  if (minutes < 0 || minutes > 59) return "Invalid minutes";

  const period: string = hours >= 12 ? "PM" : "AM";
  const displayHours: number = hours % 12 || 12;

  // displayHours.toString() will automatically show numbers without leading zeros
  return `${displayHours}${period}`;
}
