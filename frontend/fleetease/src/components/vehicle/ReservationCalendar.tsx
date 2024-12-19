import React, { useState, useEffect } from 'react';

interface ReservationCalendarProps {
  vehicleId: string; // Vehicle ID as string now
}

interface Reservation {
  id: number;
  startDate: string;
  endDate: string;
  driver: string;
  reason: string;
}

const ReservationCalendar: React.FC<ReservationCalendarProps> = ({ vehicleId }) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // Mock data for reservations
  const mockReservations: Reservation[] = [
    {
      id: 1,
      startDate: '2024-12-20',
      endDate: '2024-12-25',
      driver: 'John Doe',
      reason: 'Vacation',
    },
    {
      id: 2,
      startDate: '2024-12-28',
      endDate: '2025-01-05',
      driver: 'Jane Smith',
      reason: 'Business Trip',
    },
  ];

  useEffect(() => {
    // Simulate fetching reservation data (using mock data for now)
    const fetchReservations = async () => {
      try {
        // Instead of an actual API call, use mock data
        setReservations(mockReservations);
      } catch (error) {
        console.error('Error fetching reservations:', error);
      }
    };

    fetchReservations();
  }, [vehicleId]);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold">Reservation Calendar</h3>
      <div className="mt-6">
        {/* Here, you can use a library like react-calendar or implement your own calendar view */}
        <p>Calendar with reservations will go here</p>

        <ul className="mt-4">
          {reservations.map((reservation) => (
            <li key={reservation.id} className="border-b py-2">
              <p>
                <strong>{reservation.driver}</strong> reserved from{' '}
                {reservation.startDate} to {reservation.endDate}
              </p>
              <p className="text-gray-500">Reason: {reservation.reason}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6">
        <h4 className="text-lg font-semibold">Reservation Form</h4>
        <form>
          <div>
            <label htmlFor="driver">Driver Name</label>
            <input type="text" id="driver" name="driver" value="Current User" disabled />
          </div>
          <div>
            <label htmlFor="reason">Reason for Request</label>
            <textarea id="reason" name="reason" placeholder="Optional" />
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReservationCalendar;
