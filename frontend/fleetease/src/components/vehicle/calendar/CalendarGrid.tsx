import React from 'react';
import { isSameDay, isWithinInterval } from 'date-fns';

interface CalendarGridProps {
  daysInMonth: (Date | null)[]; // Allow null for empty cells
  selectedDates: Date[];
  reservedDates: Date[];
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

  // Function to check if the day is start or end date
  const isStartOrEndDate = (date: Date) => {
    if (selectedDates.length === 0) return false;
    if (selectedDates.length === 1) return isSameDay(date, selectedDates[0]);
    return isSameDay(date, selectedDates[0]) || isSameDay(date, selectedDates[selectedDates.length - 1]);
  };

  // Function to check if the day is within the selected range
  const isWithinSelectedRange = (date: Date) => {
    if (selectedDates.length < 2) return false;
    const [start, end] = [selectedDates[0], selectedDates[selectedDates.length - 1]].sort(
      (a, b) => a.getTime() - b.getTime()
    );
    return isWithinInterval(date, { start, end }) && !isSameDay(date, start) && !isSameDay(date, end);
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
                className={`p-2 cursor-pointer text-center relative
                  ${day && isReserved(day) && !isStartOrEndDate(day) ? 'bg-red-300' : ''}
                  ${day && !isReserved(day) && isWithinSelectedRange(day) && !isStartOrEndDate(day) ? 'bg-green-200' : ''}
                  ${day && isStartOrEndDate(day) && isReserved(day) ? 'bg-red-500 text-white' : ''}
                  ${day && isStartOrEndDate(day) && !isReserved(day) ? 'bg-[#10b91d] text-white' : ''}
                `}
                onClick={() => day && handleDateClick(day)}
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Display the day number */}
                  {day ? day.getDate() : ''}
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

