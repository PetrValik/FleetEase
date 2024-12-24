import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { format } from 'date-fns';

interface CalendarHeaderProps {
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ currentDate, setCurrentDate }) => {
  const handlePrevMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  const handleNextMonth = () => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));

  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={handlePrevMonth}><FaChevronLeft /></button>
      <h2 className="text-lg font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
      <button onClick={handleNextMonth}><FaChevronRight /></button>
    </div>
  );
};

export default CalendarHeader;
