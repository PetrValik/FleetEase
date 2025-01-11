import React, { useState, useEffect } from 'react';
import { Reservation, getReservationsByVehicleId } from '../../database/reservations/reservations';
import CalendarHeader from './calendar/CalendarHeader';
import CalendarGrid from './calendar/CalendarGrid';
import ReservationForm from './calendar/ReservationForm';
import { createReservation } from '../../database/reservations/reservations';
import * as Toast from "../../utils/toastUtils";
import { startOfMonth, eachDayOfInterval, endOfMonth, isSameDay, isWithinInterval } from 'date-fns';

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
  const [reservedDates, setReservedDates] = useState<Date[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const reservations = await getReservationsByVehicleId(vehicleId);
        const reservedDates: Date[] = [];
        
        reservations.forEach((reservation) => {
          const startDate = new Date(reservation.start_time);
          const endDate = new Date(reservation.end_time);
          
          let currentDate = startDate;
          while (currentDate <= endDate) {
            reservedDates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
          }
        });

        setReservedDates(reservedDates);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [vehicleId]);

  const firstDayOfMonth = startOfMonth(currentDate);
  const lastDayOfMonth = endOfMonth(currentDate);

  const daysInMonth = eachDayOfInterval({
    start: firstDayOfMonth,
    end: lastDayOfMonth,
  });

  const firstDayOfWeek = firstDayOfMonth.getDay();
  const emptyCellsCount = firstDayOfWeek === 0 ? 6 : firstDayOfWeek;

  const daysWithEmptyCells = [
    ...Array.from({ length: emptyCellsCount }).map(() => null),
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
    setIsFormVisible(true);
  };

  const isDateRangeOverlapping = (start: Date, end: Date) => {
    return reservedDates.some(reservedDate => 
      isWithinInterval(reservedDate, { start, end })
    );
  };

  const handleReservationSubmit = async () => {
    let errorMessage = '';

    if (!pickupLocation) {
      errorMessage += 'Pickup Location is required. ';
    }
    if (!returnLocation) {
      errorMessage += 'Return Location is required. ';
    }
    if (selectedDates.length === 0) {
      errorMessage += 'Please select at least one date. ';
    }

    if (selectedDates.length > 0) {
      const [startDate, endDate] = selectedDates.length === 1 
        ? [selectedDates[0], selectedDates[0]] 
        : [selectedDates[0], selectedDates[selectedDates.length - 1]];

      if (isDateRangeOverlapping(startDate, endDate)) {
        errorMessage += 'Selected date range overlaps with existing reservations. ';
      }
    }

    if (errorMessage) {
      Toast.showErrorToast(errorMessage.trim());
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
        setSelectedDates([]);
        setPickupLocation('');
        setReturnLocation('');
        setIsFormVisible(false); // Hide the form
        // Refresh reserved dates
        const updatedReservations = await getReservationsByVehicleId(vehicleId);
        const updatedReservedDates = updatedReservations.flatMap(reservation => {
          const startDate = new Date(reservation.start_time);
          const endDate = new Date(reservation.end_time);
          return eachDayOfInterval({ start: startDate, end: endDate });
        });
        setReservedDates(updatedReservedDates);
      } else {
        Toast.showErrorToast('Failed to create reservation.');
      }
    } catch (error) {
      Toast.showErrorToast("Unable to create reservation");
      console.error('Error creating reservation:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 mx-auto">
      <CalendarHeader currentDate={currentDate} setCurrentDate={setCurrentDate} />
      <CalendarGrid
        daysInMonth={daysWithEmptyCells}
        selectedDates={selectedDates}
        reservedDates={reservedDates}
        handleDateClick={handleDateSelect}
      />
      <ReservationForm
        selectedDates={selectedDates}
        pickupLocation={pickupLocation}
        returnLocation={returnLocation}
        setPickupLocation={setPickupLocation}
        setReturnLocation={setReturnLocation}
        handleReservationSubmit={handleReservationSubmit}
        reservedDates={reservedDates}
        isDateRangeOverlapping={isDateRangeOverlapping}
        isFormVisible={isFormVisible}
      />
    </div>
  );
};

export default ReservationCalendar;

