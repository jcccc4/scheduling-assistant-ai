import { useRef, useState } from 'react';
import { today } from '../constants';

export const useCalendarState = () => {
  const [view, setView] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState(today);
  const timeBarRef = useRef<HTMLDivElement>(null);
  const [openPopoverId, setOpenPopoverId] = useState<string | null>(null);

  const handlePreviousWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedDate(newDate);
  };

  return {
    view,
    setView,
    selectedDate,
    setSelectedDate,
    timeBarRef,
    openPopoverId,
    setOpenPopoverId,
    handlePreviousWeek,
    handleNextWeek,
  };
};