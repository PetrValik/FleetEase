import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import TestButton from './components/TestButton';
import * as Database from '../../database/database';

const TestPage: React.FC = () => {
  const { isAuthenticated } = useUser();
  const [testResults, setTestResults] = useState<string[]>([]);

  // Helper to run tests
  const run = async (testFunc: () => Promise<any>) => {
    try {
      const result = await testFunc(); // Await the result of the function
      const resultString = JSON.stringify(result); // Convert it to a string
      setTestResults((prev) => [...prev, resultString]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'; // Safely handle unknown error
      setTestResults((prev) => [...prev, `Error: ${errorMessage}`]);
    }
  };

  // Clear test results
  const clearResults = () => {
    setTestResults([]);
  };

  const defectObject: Omit<Database.Defect, 'defect_id' | 'created_at' | 'repair_cost'> = {
    vehicle_id: 9,
    type_id: 3,
    defect_severity: 'High',
    defect_status: 'Reported',
    description: 'Engine overheating issue',
    date_reported: new Date().toISOString(),
    user_id: 6,
  };

  const reservationData: Omit<Database.Reservation, 'reservation_id' | 'created_at'> = {
    vehicle_id: 12, 
    user_id: 5, 
    start_time: new Date('2024-12-25T10:00:00Z').toISOString(), 
    end_time: new Date('2024-12-30T18:00:00Z').toISOString(), 
    pickup_location: 'Downtown Office', 
    return_location: 'Airport Terminal A', 
    reservation_status: 'Pending', 
    notes: 'Customer requests a baby seat', 
  };

  const reservationData2: Omit<Database.Reservation, 'reservation_id' | 'created_at'> = {
    vehicle_id: 12, 
    user_id: 5, 
    start_time: new Date('2024-12-25T10:00:00Z').toISOString(), 
    end_time: new Date('2024-12-30T18:00:00Z').toISOString(), 
    pickup_location: 'Uptown Office', 
    return_location: 'Airport Terminal A', 
    reservation_status: 'Pending', 
    notes: 'Customer requests a baby seat', 
  };

  const userData: Partial<Database.UpdateUser> = {
    email: 'john.doe@example.com',
    first_name: 'John',
    last_name: 'Doe',
    phone_number: '987-654-3210',
    company_id: null,
    roles_id: 3, 
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>

      <div className="mb-4">
        <TestButton label="Reset Results" onClick={() => clearResults()} />
      </div>

      <div className="mb-4">
        <TestButton label="Defects create" onClick={() => run(() => Database.createDefect(defectObject))} />
        <TestButton label="Defects edit" onClick={() => run(() => Database.updateDefect(4, defectObject))} />
        <TestButton label="Defects get" onClick={() => run(() => Database.getDefectById(1))} />
        <TestButton label="Defects delete" onClick={() => run(() => Database.deleteDefect(3))} />
        <TestButton label="Defects get all" onClick={() => run(() => Database.getAllDefects())} />
        <TestButton label="Defects get all by company" onClick={() => run(() => Database.getAllDefects())} />
        <TestButton label="Defects get all by vehicle" onClick={() => run(() => Database.getDefectsByVehicleId(21))} />
        <TestButton label="Defects get all by user" onClick={() => run(() => Database.getDefectsByUserId(3))} />
      </div>

      <div className="mb-4">
        <TestButton label="DefectsTypes all" onClick={() => run(() => Database.getAllDefectTypes())} />
        <TestButton label="Defecttype by id" onClick={() => run(() => Database.getDefectTypeById(3))} />
      </div>

      <div className="mb-4">
        <TestButton label="get All Users" onClick={() => run(() => Database.getAllUsers())} />
        <TestButton label="get All Users from company" onClick={() => run(() => Database.getAllUsersFromCompany(1))} />
        <TestButton label="get All Users without company" onClick={() => run(() => Database.getAllUsersWithoutCompany())} />
        <TestButton label="update user" onClick={() => run(() => Database.updateUser(7, userData))} />
      </div>

      <div className="mb-4">
        <TestButton label="Role by id" onClick={() => run(() => Database.getRoleById(2))} />
        <TestButton label="All roles" onClick={() => run(() => Database.getAllRoles())} />
      </div>

      <div className="mb-4">
        <TestButton label="getAllReservations" onClick={() => run(() => Database.getAllReservations())} />
        <TestButton label="getReservationsByVehicleId" onClick={() => run(() => Database.getReservationsByVehicleId(12))} />
        <TestButton label="getReservationById" onClick={() => run(() => Database.getReservationById(1))} />
        <TestButton label="createReservation" onClick={() => run(() => Database.createReservation(reservationData))} />
        <TestButton label="updateReservation " onClick={() => run(() => Database.updateReservation(2,reservationData2))} />
        <TestButton label="deleteReservation" onClick={() => run(() => Database.deleteReservation(2))} />
        <TestButton label="getVehiclesWithReservationsByUserId" onClick={() => run(() => Database.getVehiclesWithReservationsByUserId(5))} />
        <TestButton label="checkVehicleActiveReservation" onClick={() => run(() => Database.checkVehicleActiveReservation(12))} />
      </div>

      {testResults.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Test Results:</h2>
          <ul className="list-disc pl-5">
            {testResults.map((result, index) => (
              <li
                key={index}
                className={
                  typeof result === 'string' &&
                    (result.includes('true') || result.includes('correct') || result.includes('Completed'))
                    ? 'text-green-600'
                    : 'text-red-600'
                }
              >
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestPage;
