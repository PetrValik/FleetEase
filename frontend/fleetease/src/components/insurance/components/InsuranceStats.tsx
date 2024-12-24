/** Komponenta pro zobrazení statistik pojištění.
 * Zobrazuje přehledné statistiky rozdělené podle typu pojištění:
 * - Pojištění vozidel
 * - Pojištění řidičů
 * - Pojištění odpovědnosti
 * 
 * Každá kategorie je reprezentována vlastní kartou s ikonou
 * a počtem aktivních pojištění daného typu.
 */

import React from 'react';
import { CarFront, User, Shield } from 'lucide-react';
import { Insurance } from '../types';

/**
 * Props rozhraní pro InsuranceStats komponentu
 * @property {Insurance[]} insurances - Seznam všech pojištění pro výpočet statistik
 */
interface InsuranceStatsProps {
  insurances: Insurance[];
}

const InsuranceStats: React.FC<InsuranceStatsProps> = ({ insurances = [] }) => {
  // Výpočet statistik podle typu pojištění
  const stats = {
    Vehicle: insurances.filter(i => i.insurance_types === 'Vehicle').length,
    Driver: insurances.filter(i => i.insurance_types === 'Driver').length,
    Liability: insurances.filter(i => i.insurance_types === 'Liability').length
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Statistika pojištění vozidel */}
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <CarFront className="w-8 h-8 text-indigo-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Car insurance</h2>
          <p className="text-2xl font-bold text-indigo-600">{stats.Vehicle}</p>
        </div>
      </div>

      {/* Statistika pojištění řidičů */}
      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
        <User className="w-8 h-8 text-indigo-600 mr-3" />
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Driver insurance</h2>
          <p className="text-2xl font-bold text-indigo-600">{stats.Driver}</p>
        </div>
      </div>

      {/* Statistika pojištění odpovědnosti */}
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