import React, { createContext, useContext } from 'react';
import { ViewState } from '@/lib/types/calendar';
import { useCalendarState } from '../hooks/useCalendarState';

const CalendarContext = createContext<ViewState | undefined>(undefined);

export const CalendarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const state = useCalendarState();

  return (
    <CalendarContext.Provider value={state}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarContext = () => {
  const context = useContext(CalendarContext);
  if (context === undefined) {
    throw new Error('useCalendarContext must be used within a CalendarProvider');
  }
  return context;
};