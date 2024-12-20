import React from 'react';
import { Insurance } from '../types';

interface InsuranceTableProps {
  insurances: Insurance[];
  searchTerm: string;
  activeTab: string;
  onEdit: (insurance: Insurance) => void;
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function InsuranceTable({ 
  insurances, 
  searchTerm, 
  activeTab,
  onEdit,
  onDelete,
  loading 
}: InsuranceTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const filteredInsurances = insurances.filter(insurance => {
    const matchesSearch = 
<<<<<<< Updated upstream
      (insurance.registration_number?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (insurance.name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
=======
      insurance.registration_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insurance.name.toLowerCase().includes(searchTerm.toLowerCase());
>>>>>>> Stashed changes
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && insurance.insurance_types === activeTab;
  });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Registration Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Insurance Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Validity From
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Valid Until
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredInsurances.map((insurance) => (
            <tr key={insurance.insurance_id}>
              <td className="px-6 py-4 whitespace-nowrap">
<<<<<<< Updated upstream
                {insurance.registration_number || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {insurance.name || 'N/A'}
=======
                {insurance.registration_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {insurance.name}
>>>>>>> Stashed changes
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(insurance.start_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(insurance.end_date)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  insurance.insurance_status === 'Active' 
                    ? 'bg-green-100 text-green-800'
                    : insurance.insurance_status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : insurance.insurance_status === 'Expired'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {insurance.insurance_status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button onClick={() => onEdit(insurance)}>Edit</button>
                <button
                  onClick={() => insurance.insurance_id && onDelete(insurance.insurance_id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}