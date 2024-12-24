import React from 'react';

interface DayCellProps {
  date: Date;
  selectedDates: Date[];
  handleDateClick: (date: Date) => void;
}

const DayCell: React.FC<DayCellProps> = ({ date, selectedDates, handleDateClick }) => {
  const isSelected = selectedDates.some(
    (selectedDate) => selectedDate.toDateString() === date.toDateString()
  );

  return (
    <td
      onClick={() => handleDateClick(date)}
      className={`cursor-pointer p-2 text-center ${
        isSelected ? 'bg-green-500 text-white rounded-md' : ''
      }`}
    >
      {date.getDate()}
    </td>
  );
};

export default DayCell;
