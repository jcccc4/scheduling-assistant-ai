export function formatTime(hours: number, minutes: number = 0, seconds: number = 0): string {
  // Handle edge cases
  if (hours < 0 || hours > 23) return "Invalid hours";
  if (minutes < 0 || minutes > 59) return "Invalid minutes";
  if (seconds < 0 || seconds > 59) return "Invalid seconds";

  // Convert to 12-hour format
  const period: string = hours >= 12 ? 'PM' : 'AM';
  
  // Convert hours
  let displayHours: number = hours % 12;
  displayHours = displayHours === 0 ? 12 : displayHours;
  
  // Pad with leading zeros
  function formatNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
  
  return `${formatNumber(displayHours)}:${formatNumber(minutes)}:${formatNumber(seconds)} ${period}`;
}

export function formatSimpleTime(hours: number, minutes: number = 0): string {
  // Handle edge cases
  if (hours < 0 || hours > 23) return "Invalid hours";
  if (minutes < 0 || minutes > 59) return "Invalid minutes";

  const period: string = hours >= 12 ? 'PM' : 'AM';
  const displayHours: number = hours % 12 || 12;
  
  return `${displayHours.toString()} ${period}`;
}
