import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';
import { Reservation, createReservation } from '../../database/reservations/reservations'; // Adjust the import path if needed

const citiesCZ = [
  "Prague", "Brno", "Ostrava", "Plzeň", "Liberec", "Olomouc", "Hradec Králové", "Pardubice", "Zlín", "Ústí nad Labem"
];

const citiesSK = [
  "Bratislava", "Košice", "Prešov", "Nitra", "Trnava", "Žilina", "Martin", "Trenčín", "Poprad", "Námestovo"
];

interface ReservationCalendarProps {
  reservations: Reservation[];
  user: { user_id: number }; // Add user prop here
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({ reservations, user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [reservationDetails, setReservationDetails] = useState<Reservation | null>(null);
  const [pickupLocation, setPickupLocation] = useState<string>('');
  const [returnLocation, setReturnLocation] = useState<string>('');

  const startOfCurrentMonth = startOfMonth(currentDate);
  const endOfCurrentMonth = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: startOfCurrentMonth, end: endOfCurrentMonth });

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.setMonth(prev.getMonth() + 1)));
  };

  const handleDateClick = (date: Date) => {
    if (selectedDates.some((selectedDate) => isSameDay(selectedDate, date))) {
      setSelectedDates(selectedDates.filter((selectedDate) => !isSameDay(selectedDate, date)));
    } else {
      setSelectedDates((prev) => [...prev, date]);
    }
  };

  const handleDateHover = (date: Date) => {
    const reservation = reservations.find((res) => isSameDay(new Date(res.start_time), date));
    if (reservation) {
      setReservationDetails(reservation);
    } else {
      setReservationDetails(null);
    }
  };

  const isDateReserved = (date: Date) => {
    return reservations.some((reservation) =>
      isSameDay(new Date(reservation.start_time), date) ||
      isSameDay(new Date(reservation.end_time), date)
    );
  };

  const isDateSelected = (date: Date) => {
    return selectedDates.some((selectedDate) => isSameDay(selectedDate, date));
  };

  const handleReservationSubmit = async () => {
    if (selectedDates.length === 0 || !user || !pickupLocation || !returnLocation) {
      return;  // Validation: No dates selected, no user logged in, or no locations chosen
    }

    // Sort selected dates (start_time = lower date, end_time = higher date)
    const sortedDates = [...selectedDates].sort((a, b) => a.getTime() - b.getTime());
    const startDate = sortedDates[0];
    const endDate = sortedDates[sortedDates.length - 1];

    const newReservationData = {
      user_id: user.user_id,  // Assuming the user object contains the user_id
      vehicle_id: 1,  // Set the vehicle_id based on your context
      start_time: format(startDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      end_time: format(endDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      pickup_location: pickupLocation,
      return_location: returnLocation,
      reservation_status: "Completed" as "Completed",  // Explicitly typing as 'Completed'
      notes: "Reservation for maintenance",  // Optional
    };

    const newReservation = await createReservation(newReservationData);
    if (newReservation) {
      console.log("Reservation created successfully:", newReservation);
    } else {
      console.error("Error creating reservation");
    }
  };

  const renderDayCell = (date: Date) => {
    const isReserved = isDateReserved(date);
    const isSelected = isDateSelected(date);
    const isTodayDate = isToday(date);

    return (
      <td
        key={date.toString()}
        className={`w-10 h-10 p-2 text-center cursor-pointer rounded-lg ${isSelected ? 'bg-green-200' : isReserved ? 'bg-blue-200' : ''} ${isTodayDate ? 'bg-gray-300' : ''}`}
        onClick={() => handleDateClick(date)}
        onMouseEnter={() => handleDateHover(date)}
      >
        <span className={`${isTodayDate ? 'font-bold' : ''}`}>{format(date, 'd')}</span>
        {isReserved && <div className="absolute bottom-1 left-1 w-2.5 h-2.5 bg-blue-500 rounded-full" />}
      </td>
    );
  };

  const renderCalendarGrid = () => {
    const weeks: JSX.Element[] = [];
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Create the header row for the days of the week
    const headerRow = (
      <tr>
        {daysOfWeek.map((day) => (
          <th key={day} className="text-sm text-gray-600 p-2">
            {day}
          </th>
        ))}
      </tr>
    );

    // Create the grid of dates
    let week: JSX.Element[] = [];
    daysInMonth.forEach((day, index) => {
      if (index % 7 === 0 && index !== 0) {
        weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
        week = [];
      }
      week.push(renderDayCell(day));
    });

    // Add the last row of days
    if (week.length) {
      weeks.push(<tr key={`week-${weeks.length}`}>{week}</tr>);
    }

    return (
      <table className="w-full table-fixed">
        <thead>{headerRow}</thead>
        <tbody>{weeks}</tbody>
      </table>
    );
  };

  const renderReservationForm = () => {
    if (selectedDates.length === 0) {
      return null;
    }

    const startDate = selectedDates[0];
    const endDate = selectedDates[selectedDates.length - 1];
    const reservationDateRange = `${format(startDate, 'MMM d')} - ${format(endDate, 'MMM d')}`;

    return (
      <div className="mt-4 p-4 border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Reservation Request</h3>
        <p className="text-sm text-gray-600">{reservationDateRange}</p>
        <form onSubmit={(e) => { e.preventDefault(); handleReservationSubmit(); }}>
          <div className="mt-2">
            <label className="block text-sm font-medium">Pickup Location</label>
            <select
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Pickup Location</option>
              {citiesCZ.concat(citiesSK).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <div className="mt-2">
            <label className="block text-sm font-medium">Return Location</label>
            <select
              value={returnLocation}
              onChange={(e) => setReturnLocation(e.target.value)}
              className="mt-1 w-full border-gray-300 rounded-lg p-2"
            >
              <option value="">Select Return Location</option>
              {citiesCZ.concat(citiesSK).map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Submit Request
          </button>
        </form>
      </div>
    );
  };

  return (
    <div className="w-96 bg-white shadow-md rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrevMonth} className="text-gray-600 hover:text-gray-800">
          <FaChevronLeft />
        </button>
        <h2 className="text-lg font-bold">{format(currentDate, 'MMMM yyyy')}</h2>
        <button onClick={handleNextMonth} className="text-gray-600 hover:text-gray-800">
          <FaChevronRight />
        </button>
      </div>

      {/* Calendar Grid */}
      <div>{renderCalendarGrid()}</div>

      {/* Reservation Form */}
      {renderReservationForm()}

      {/* Reservation Details (Popover) */}
      {reservationDetails && (
        <div className="absolute top-0 left-0 bg-white shadow-lg rounded-lg p-4 mt-2">
          <p className="font-semibold text-sm">Reservation Details:</p>
          <p className="text-xs">Driver: {reservationDetails.user_id}</p>  {/* Change this to driver name */}
          <p className="text-xs">
            Period: {format(new Date(reservationDetails.start_time), 'MMM d')} - {format(new Date(reservationDetails.end_time), 'MMM d')}
          </p>
        </div>
      )}
    </div>
  );
};

export default ReservationCalendar;
