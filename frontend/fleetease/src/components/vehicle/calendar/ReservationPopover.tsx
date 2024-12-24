import React from 'react';
import { Reservation } from '../../../database/reservations/reservations';
import { format } from 'date-fns';

interface ReservationPopoverProps {
  reservation: Reservation;
}

const ReservationPopover: React.FC<ReservationPopoverProps> = ({ reservation }) => {
  return (
    <div className="absolute bg-white p-4 shadow-lg rounded-lg">
      <h4 className="text-sm font-semibold">Reservation Details</h4>
      <p className="text-xs">Driver: {reservation.user_id}</p>
      <p className="text-xs">
        {format(new Date(reservation.start_time), 'MMM d, yyyy')} -{' '}
        {format(new Date(reservation.end_time), 'MMM d, yyyy')}
      </p>
    </div>
  );
};

export default ReservationPopover;
