import { DAYS } from "../calendar";

export const MonthlyView = () => {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const daysInMonth = () => {
    const date = new Date(year, month, 1);
    const days = [];
    for (let i = 0; i < date.getDay(); i++) {
      days.push("");
    }
    while (date.getMonth() === month) {
      days.push(new Date(date).getDate());
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  return (
    <div data-testid="monthly-view">
      <div className="w-full grid grid-cols-7 h-fit gap-[1px]">
        {DAYS.map((day) => (
          <div
            key={day}
            className="bg-white h-10 flex items-center justify-center"
          >
            {day}
          </div>
        ))}
      </div>
      <div className="w-full grid grid-cols-7 gap-[1px]">
        {daysInMonth().map((date, i) => (
          <div
            key={i}
            className="bg-white h-36 flex items-start justify-end p-1"
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};
