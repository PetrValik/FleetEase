import React, { useState } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Reservation } from '../../database/reservations/reservations';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarGrid from './calendar/CalendarGrid';
import ReservationForm from './calendar/ReservationForm';
import { createReservation } from '../../database/reservations/reservations';

interface ReservationCalendarProps {
  reservations: Reservation[];
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
  }; // Add the user prop to the interface
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({ reservations, user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [pickupLocation, setPickupLocation] = useState('');
  const [returnLocation, setReturnLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Early return if user is not authenticated
  if (!user) {
    return <div>Please log in to make a reservation.</div>;
  }

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

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
    // Validation: Ensure Pickup Location and Return Location are filled
    if (!pickupLocation || !returnLocation) {
      setErrorMessage('Pickup Location and Return Location are required!');
      return;
    }

    // Reset error message if validation is successful
    setErrorMessage('');

    // Ensure dates are selected
    if (selectedDates.length === 0) {
      setErrorMessage('Please select at least one date.');
      return;
    }

    const sortedDates = selectedDates.sort((a, b) => a.getTime() - b.getTime());
    const startDate = sortedDates[0];
    const endDate = sortedDates[sortedDates.length - 1];

    // Prepare the reservation data to be sent to the API
    const reservationData = {
      vehicle_id: 1, // Replace this with the actual vehicle ID
      user_id: user.user_id, // Use the current user's ID
      start_time: startDate.toISOString(),
      end_time: endDate.toISOString(),
      pickup_location: pickupLocation,
      return_location: returnLocation,
      reservation_status: 'Completed' as const, // Ensure it is one of the valid statuses
      notes: null, // Optionally add notes if needed
    };

    // Call the API to create the reservation
    const newReservation = await createReservation(reservationData);

    if (newReservation) {
      console.log('Reservation created:', newReservation);
      // Optionally reset the form or show a success message
    } else {
      setErrorMessage('Failed to create reservation.');
    }
  };

  return (
    <div className="w-96 bg-white shadow-md rounded-lg p-4">
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarGrid
        daysInMonth={daysInMonth}
        selectedDates={selectedDates}
        handleDateClick={handleDateSelect}
      />

      {/* Conditionally render the ReservationForm if dates are selected */}
      {selectedDates.length > 0 && (
        <ReservationForm
          selectedDates={selectedDates}
          pickupLocation={pickupLocation}
          returnLocation={returnLocation}
          setPickupLocation={setPickupLocation}
          setReturnLocation={setReturnLocation}
          handleReservationSubmit={handleReservationSubmit}
          errorMessage={errorMessage}  // Pass error message to the form
        />
      )}
    </div>
  );
};

export default ReservationCalendar;
