import React from 'react';
import { isSameDay } from 'date-fns';

interface CalendarGridProps {
  daysInMonth: (Date | null)[]; // Allow null for empty cells
  selectedDates: Date[];
  reservedDates: Date[]; // Add reservedDates prop
  handleDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  daysInMonth, selectedDates, reservedDates, handleDateClick,
}) => {
  // Create weeks array by slicing the daysInMonth into chunks of 7
  const weeks = [];
  for (let i = 0; i < daysInMonth.length; i += 7) {
    weeks.push(daysInMonth.slice(i, i + 7));
  }

  // Function to check if the day is reserved
  const isReserved = (date: Date) => {
    return reservedDates.some((reservedDate) => isSameDay(reservedDate, date));
  };

  // Function to check if the day is selected
  const isSelected = (date: Date) => {
    return selectedDates.some((selectedDate) => isSameDay(selectedDate, date));
  };

  return (
    <table className="w-full table-auto table-fixed">
      <thead>
        <tr>
          <th className="p-2 w-1/7">Sun</th>
          <th className="p-2 w-1/7">Mon</th>
          <th className="p-2 w-1/7">Tue</th>
          <th className="p-2 w-1/7">Wed</th>
          <th className="p-2 w-1/7">Thu</th>
          <th className="p-2 w-1/7">Fri</th>
          <th className="p-2 w-1/7">Sat</th>
        </tr>
      </thead>
      <tbody>
        {weeks.map((week, index) => (
          <tr key={index}>
            {week.map((day, idx) => (
              <td
                key={idx}
                className={`p-2 cursor-pointer text-center relative ${day && isSelected(day) ? 'bg-green-300' : ''} ${day && isReserved(day) ? 'bg-red-300' : ''}`}
                onClick={() => day && handleDateClick(day)}
              >
                <div className="relative">
                  {/* Display the day number */}
                  {day ? day.getDate() : ''}
                  {/* Show red dot if the day is reserved */}
                  {day && isReserved(day) && (
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500" />
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CalendarGrid;
