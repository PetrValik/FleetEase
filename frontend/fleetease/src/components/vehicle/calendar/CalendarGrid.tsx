import React from 'react';
import { isSameDay, isWithinInterval } from 'date-fns';

interface CalendarGridProps {
  daysInMonth: (Date | null)[];
  selectedDates: Date[];
  reservedDates: Date[];
  handleDateClick: (date: Date) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  daysInMonth, selectedDates, reservedDates, handleDateClick,
}) => {
  const weeks = [];
  for (let i = 0; i < daysInMonth.length; i += 7) {
    weeks.push(daysInMonth.slice(i, i + 7));
  }

  const isReserved = (date: Date) => reservedDates.some((reservedDate) => isSameDay(reservedDate, date));
  const isSelected = (date: Date) => selectedDates.some((selectedDate) => isSameDay(selectedDate, date));
  const isStartOrEndDate = (date: Date) => {
    if (selectedDates.length === 0) return false;
    if (selectedDates.length === 1) return isSameDay(date, selectedDates[0]);
    return isSameDay(date, selectedDates[0]) || isSameDay(date, selectedDates[selectedDates.length - 1]);
  };
  const isWithinSelectedRange = (date: Date) => {
    if (selectedDates.length < 2) return false;
    const [start, end] = [selectedDates[0], selectedDates[selectedDates.length - 1]].sort(
      (a, b) => a.getTime() - b.getTime()
    );
    return isWithinInterval(date, { start, end }) && !isSameDay(date, start) && !isSameDay(date, end);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead>
          <tr>
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <th key={day} className="p-1 sm:p-2 text-xs sm:text-sm">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, index) => (
            <tr key={index}>
              {week.map((day, idx) => (
                <td
                  key={idx}
                  className={`p-1 sm:p-2 text-center relative text-xs sm:text-sm
                    ${day && isReserved(day) && !isStartOrEndDate(day) ? 'bg-red-300' : ''}
                    ${day && !isReserved(day) && isWithinSelectedRange(day) && !isStartOrEndDate(day) ? 'bg-green-200' : ''}
                    ${day && isStartOrEndDate(day) && isReserved(day) ? 'bg-red-500 text-white' : ''}
                    ${day && isStartOrEndDate(day) && !isReserved(day) ? 'bg-[#10b91d] text-white' : ''}
                  `}
                  onClick={() => day && handleDateClick(day)}
                >
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center">
                      {day ? day.getDate() : ''}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CalendarGrid;

