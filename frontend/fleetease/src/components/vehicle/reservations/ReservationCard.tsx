import React from 'react';
import { Reservation } from '../../../database/reservations/reservations';
import { LocateIcon } from 'lucide-react'; // Using the LocateIcon for location
import { Badge } from '../../dashboard/components/ui/Badge'; // Badge component for reservation status
import DeleteButton from '../ui/ReservationDeleteButton'; // Delete button component


interface ReservationCardProps {
    reservation: Reservation;
    onDelete: (reservationId: number) => void; // Function passed to delete a reservation
  }
  
  const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onDelete }) => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-4 relative">
        {/* Delete Button positioned at the top-right corner */}
        <div className="absolute top-6 right-4">
          <DeleteButton onDelete={() => onDelete(reservation.reservation_id)} itemName={`reservation ${reservation.reservation_id}`} />
        </div>
  
        <h3 className="text-lg font-semibold mb-4">
          Reservation Dates: {new Date(reservation.start_time).toLocaleDateString()} -{' '}
          {new Date(reservation.end_time).toLocaleDateString()}
        </h3>
  
        <div className="space-y-2">
          {/* Reserved By */}
          <div className="flex">
            <span className="text-sm font-medium w-48">Reserved By:</span>
            <span className="text-sm text-gray-500">{reservation.user_id || 'Unknown User'}</span>
          </div>
  
          {/* Pickup Location */}
          <div className="flex">
            <span className="text-sm font-medium w-48 flex items-center">
              <LocateIcon className="mr-2 h-4 w-4" />
              Pickup Location:
            </span>
            <span className="text-sm text-gray-500">{reservation.pickup_location || 'N/A'}</span>
          </div>
  
          {/* Return Location */}
          <div className="flex">
            <span className="text-sm font-medium w-48 flex items-center">
              <LocateIcon className="mr-2 h-4 w-4" />
              Return Location:
            </span>
            <span className="text-sm text-gray-500">{reservation.return_location || 'N/A'}</span>
          </div>
  
          {/* Reason for Reservation */}
          <div className="flex">
            <span className="text-sm font-medium w-48">Reason for reservation:</span>
            <span className="text-sm text-gray-500">
              {reservation.notes || 'Reason not stated.'}
            </span>
          </div>
  
          {/* Reservation Status */}
          <div className="flex">
            <span className="text-sm font-medium w-48">Status:</span>
            <Badge variant="default" className="bg-[#eab308] text-white text-sm">
              {reservation.reservation_status}
            </Badge>
          </div>
        </div>
      </div>
    );
  };
  
  export default ReservationCard;
