import React from 'react';
import { CarFront, User, Shield } from 'lucide-react';
import { Insurance } from '../types';

interface InsuranceStatsProps {
  insurances: Insurance[];
}

const InsuranceStats: React.FC<InsuranceStatsProps> = ({ insurances = [] }) => {
  const validInsurances = Array.isArray(insurances) ? insurances : [];
  const stats = {
    vehicle: validInsurances.filter(i => i?.insurance_types === 'vehicle').length,
    driver: validInsurances.filter(i => i?.insurance_types === 'driver').length,
    liability: validInsurances.filter(i => i?.insurance_types === 'liability').length
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <CarFront className="w-8 h-8 text-indigo-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Car insurance</h2>
          <p className="text-2xl font-bold text-indigo-600">{stats.vehicle}</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <User className="w-8 h-8 text-indigo-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Driver insurance</h2>
          <p className="text-2xl font-bold text-indigo-600">{stats.driver}</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <Shield className="w-8 h-8 text-indigo-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Liability insurance</h2>
          <p className="text-2xl font-bold text-indigo-600">{stats.liability}</p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceStats;