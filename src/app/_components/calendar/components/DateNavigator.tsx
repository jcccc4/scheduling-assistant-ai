import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTHS } from '../constants';
import { useCalendarContext } from '../context/CalendarContext';
import { VIEW_TYPES } from '../constants';

export const DateNavigator: React.FC = () => {
  const { selectedDate, view, handlePreviousWeek, handleNextWeek } = useCalendarContext();

  const getNavigatorTitle = () => {
    const month = MONTHS[selectedDate.getMonth()];
    const year = selectedDate.getFullYear();

    switch (view) {
      case VIEW_TYPES.DAILY:
        return `${month} ${selectedDate.getDate()}, ${year}`;
      case VIEW_TYPES.WEEKLY:
        return `${month} ${year}`;
      case VIEW_TYPES.MONTHLY:
        return `${month} ${year}`;
      default:
        return '';
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Button variant="outline" size="icon" onClick={handlePreviousWeek}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      <span className="font-semibold">{getNavigatorTitle()}</span>
      <Button variant="outline" size="icon" onClick={handleNextWeek}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};