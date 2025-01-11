import React, { useState } from 'react';
import { Reservation } from '../../../database/reservations/reservations';
import { LocateIcon, ChevronDown, ChevronUp, User, Calendar, FileText } from 'lucide-react';
import { Badge } from '../../dashboard/components/ui/Badge';
import DeleteButton from '../ui/ReservationDeleteButton';

interface ReservationCardProps {
  reservation: Reservation;
  onDelete: (reservationId: number) => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md mb-4 max-w-3xl mx-auto">
      <div 
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleExpand}
      >
        <h3 className="text-lg font-semibold flex items-center">
          <Calendar className="mr-2 h-5 w-5 text-gray-500" />
          {new Date(reservation.start_time).toLocaleDateString()} -{' '}
          {new Date(reservation.end_time).toLocaleDateString()}
        </h3>
        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-2 px-2 sm:px-4">
          {/* Reserved By */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium w-1/3 flex items-center">
              <User className="mr-2 h-4 w-4 text-gray-500" />
              Reserved By:
            </span>
            <span className="text-sm text-gray-500 w-2/3 text-right">{reservation.user_id || 'Unknown User'}</span>
          </div>

          {/* Pickup Location */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium w-1/3 flex items-center">
              <LocateIcon className="mr-2 h-4 w-4 text-gray-500" />
              Pickup Location:
            </span>
            <span className="text-sm text-gray-500 w-2/3 text-right">{reservation.pickup_location || 'N/A'}</span>
          </div>

          {/* Return Location */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium w-1/3 flex items-center">
              <LocateIcon className="mr-2 h-4 w-4 text-gray-500" />
              Return Location:
            </span>
            <span className="text-sm text-gray-500 w-2/3 text-right">{reservation.return_location || 'N/A'}</span>
          </div>

          {/* Reason for Reservation */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium w-1/3 flex items-center">
              <FileText className="mr-2 h-4 w-4 text-gray-500" />
              Reason for reservation:
            </span>
            <span className="text-sm text-gray-500 w-2/3 text-right">
              {reservation.notes || 'Reason not stated.'}
            </span>
          </div>

          {/* Reservation Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium w-1/3">Status:</span>
            <span className="w-2/3 flex justify-end">
              <Badge variant="default" className="bg-[#eab308] text-white text-sm">
                {reservation.reservation_status}
              </Badge>
            </span>
          </div>

          {/* Delete Button */}
          <div className="mt-4 flex justify-end">
            <DeleteButton onDelete={() => onDelete(reservation.reservation_id)} itemName={`reservation ${reservation.reservation_id}`} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationCard;

