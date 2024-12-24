import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { Reservation } from '../../database/reservations/reservations';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarGrid from './calendar/CalendarGrid';
import ReservationForm from './calendar/ReservationForm';
import { createReservation } from '../../database/reservations/reservations';

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
  const [isLoading, setIsLoading] = useState(false);

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
        console.log('Reservation created:', newReservation);
        // Here, you could fetch the updated reservations list or update the UI state
        // directly to reflect the new reservation.
      } else {
        setErrorMessage('Failed to create reservation.');
      }
    } catch (error) {
      console.error('Error creating reservation:', error);
      setErrorMessage('Failed to create reservation.');
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mx-auto">
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarGrid
        daysInMonth={daysInMonth}
        selectedDates={selectedDates}
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
