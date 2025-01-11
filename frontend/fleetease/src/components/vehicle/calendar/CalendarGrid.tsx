import React from 'react';
import { isSameDay } from 'date-fns';
import DayCell from './DayCell';

interface CalendarGridProps {
  daysInMonth: (Date | null)[]; // Allow null for empty cells
  selectedDates: Date[];
  handleDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  daysInMonth, selectedDates, handleDateClick,
}) => {
  // Create weeks array by slicing the daysInMonth into chunks of 7
  const weeks = [];
  for (let i = 0; i < daysInMonth.length; i += 7) {
    weeks.push(daysInMonth.slice(i, i + 7));
  }

  return (
    <table className="w-full table-auto">
      <thead>
        <tr>
          <th className="p-2">Sun</th>
          <th className="p-2">Mon</th>
          <th className="p-2">Tue</th>
          <th className="p-2">Wed</th>
          <th className="p-2">Thu</th>
          <th className="p-2">Fri</th>
          <th className="p-2">Sat</th>
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, index) => (
          <tr key={index}>
            {week.map((day, idx) => (
              <DayCell
                key={idx}
                date={day}
                selectedDates={selectedDates}
                handleDateClick={handleDateClick}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarGrid;
