import React, { useState, useEffect } from 'react';
import { Reservation, getReservationsByVehicleId } from '../../database/reservations/reservations';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarGrid from './calendar/CalendarGrid';
import ReservationForm from './calendar/ReservationForm';
import { createReservation } from '../../database/reservations/reservations';
import * as Toast from "../../utils/toastUtils";
import { startOfMonth, eachDayOfInterval, endOfMonth } from 'date-fns';

interface ReservationCalendarProps {
  user: {
    user_id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string | null;
    created_at: string;
    is_active: boolean;
    company_id: number | null;
    role: {
      role_id: number;
      role_name: 'Admin' | 'Manager' | 'Driver';
    };
  };
  vehicleId: number;
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({
  user,
  vehicleId,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [reservedDates, setReservedDates] = useState<Date[]>([]); // State for reserved dates

  useEffect(() => {
    // Update current date every minute to keep it up-to-date
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  useEffect(() => {
    // Fetch reservations for the vehicle and store reserved dates
    const fetchReservations = async () => {
      try {
        const reservations = await getReservationsByVehicleId(vehicleId);
        const reservedDates: Date[] = [];
        
        // Loop through each reservation and create a list of all the reserved dates
        reservations.forEach((reservation) => {
          const startDate = new Date(reservation.start_time);
          const endDate = new Date(reservation.end_time);
          
          // Get all days between start and end date
          let currentDate = startDate;
          while (currentDate <= endDate) {
            reservedDates.push(new Date(currentDate)); // Add the current date to the reserved dates
            currentDate.setDate(currentDate.getDate() + 1); // Move to next day
          }
        });

        setReservedDates(reservedDates); // Store reserved dates in state
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [vehicleId]);

  // Get the first day and last day of the current month
  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  // Get all days of the current month
  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  // Calculate the start of the week for the current month dynamically
  const firstDayOfWeek = firstDayOfMonth.getDay(); // Get the weekday of the first day (0-6, 0 = Sunday)
  
  // Fix to emptyCellsCount calculation to properly align the start of the month
  const emptyCellsCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek; // Corrected calculation for empty cells

  // Add empty cells to align the start day of the month correctly
  const daysWithEmptyCells = [
    ...Array.from({ length: emptyCellsCount }).map(() => null), // Add empty cells
    ...daysInMonth,
  ];

  const handleDateSelect = (date: Date) => {
    if (selectedDates.length === 0) {
      setSelectedDates([date]);
    } else if (selectedDates.length === 1) {
      const sortedDates = [...selectedDates, date].sort((a, b) => a.getTime() - b.getTime());
      setSelectedDates(sortedDates);
    } else {
      setSelectedDates([date]);
    }
  };

  const handleReservationSubmit = async () => {
    if (!pickupLocation || !returnLocation) {
      setErrorMessage('Pickup Location and Return Location are required!');
      return;
    }

    setErrorMessage('');

    if (selectedDates.length === 0) {
      setErrorMessage('Please select at least one date.');
      return;
    }

    const sortedDates = selectedDates.sort((a, b) => a.getTime() - b.getTime());
    const startDate = sortedDates[0];
    const endDate = sortedDates[sortedDates.length - 1];

    const reservationData = {
      vehicle_id: vehicleId,
      user_id: user.user_id,
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      pickup_location: pickupLocation,
      return_location: returnLocation,
      reservation_status: 'Completed' as const,
      notes: null,
    };

    try {
      const newReservation = await createReservation(reservationData);

      if (newReservation) {
        Toast.showSuccessToast("Reservation successfully created");
      } else {
        setErrorMessage('Failed to create reservation.');
      }
    } catch (error) {
      Toast.showErrorToast("Unable to create reservation");
      console.error('Error creating reservation:', error);
      setErrorMessage('Failed to create reservation.');
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mx-auto">
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarGrid
        daysInMonth={daysWithEmptyCells}
        selectedDates={selectedDates}
        reservedDates={reservedDates} // Pass reservedDates to CalendarGrid
        handleDateClick={handleDateSelect}
      />
      {selectedDates.length > 0 && (
        <ReservationForm
          selectedDates={selectedDates}
          pickupLocation={pickupLocation}
          returnLocation={returnLocation}
          setPickupLocation={setPickupLocation}
          setReturnLocation={setReturnLocation}
          handleReservationSubmit={handleReservationSubmit}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};

export default ReservationCalendar;
