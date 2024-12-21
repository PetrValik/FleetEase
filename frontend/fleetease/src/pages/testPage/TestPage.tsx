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

  const userData: Partial<Database.UpdateUser> = {
      email: 'john.doe@example.com',
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '987-654-3210',
      company_id: null,
      roles_id: 3, // Role ID for "Driver"
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
        <TestButton label="update user" onClick={() => run(() => Database.updateUser(7, userData))} />
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
