import React from 'react';
import { CarFront, User, Shield } from 'lucide-react';
import { Insurance } from '../types';

interface InsuranceStatsProps {
  insurances: Insurance[];
}

const InsuranceStats: React.FC<InsuranceStatsProps> = ({ insurances = [] }) => {
  const stats = {
    Vehicle: insurances.filter(i => i.insurance_types === 'Vehicle').length,
    Driver: insurances.filter(i => i.insurance_types === 'Driver').length,
    Liability: insurances.filter(i => i.insurance_types === 'Liability').length
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <CarFront className="w-8 h-8 text-indigo-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Car insurance</h2>
          <p className="text-2xl font-bold text-indigo-600">{stats.Vehicle}</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <User className="w-8 h-8 text-indigo-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Driver insurance</h2>
          <p className="text-2xl font-bold text-indigo-600">{stats.Driver}</p>
        </div>
      </div>
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <Shield className="w-8 h-8 text-indigo-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Liability insurance</h2>
          <p className="text-2xl font-bold text-indigo-600">{stats.Liability}</p>
        </div>
      </div>
    </div>
  );
};

export default InsuranceStats;