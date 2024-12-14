import React from 'react';
import { Button } from '@/components/ui/button';
import { VIEW_TYPES } from '../constants';
import { useCalendarContext } from '../context/CalendarContext';

export const ViewSelector: React.FC = () => {
  const { view, setView } = useCalendarContext();

  return (
    <div className="flex space-x-2">
      <Button
        variant={view === VIEW_TYPES.DAILY ? "default" : "outline"}
        size="sm"
        onClick={() => setView(VIEW_TYPES.DAILY)}
      >
        Day
      </Button>
      <Button
        variant={view === VIEW_TYPES.WEEKLY ? "default" : "outline"}
        size="sm"
        onClick={() => setView(VIEW_TYPES.WEEKLY)}
      >
        Week
      </Button>
      <Button
        variant={view === VIEW_TYPES.MONTHLY ? "default" : "outline"}
        size="sm"
        onClick={() => setView(VIEW_TYPES.MONTHLY)}
      >
        Month
      </Button>
    </div>
  );
};