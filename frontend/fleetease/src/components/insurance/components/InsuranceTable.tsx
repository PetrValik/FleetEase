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
  insurances = [], // Přidáme defaultní hodnotu
  searchTerm, 
  activeTab,
  onEdit,
  onDelete,
  loading 
}: InsuranceTableProps) {
  
  const validInsurances = Array.isArray(insurances) ? insurances : [];
  
  const filteredInsurances = validInsurances.filter(insurance => {
    const matchesSearch = 
      insurance.policy_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      insurance?.insurance_company?.company_name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && insurance.insurance_types.toLowerCase() === activeTab.toLowerCase();
  });

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (filteredInsurances.length === 0) {
    return <div className="text-center py-4">No insurances found</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Insurance Number
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Insurance Company
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
                {insurance.policy_number}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {insurance.insurance_company?.company_name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {insurance.start_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {insurance.end_date}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  insurance.insurance_status === 'Active' 
                    ? 'bg-green-100 text-green-800'
                    : insurance.insurance_status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : insurance.insurance_status === 'Ending soon'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {insurance.insurance_status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(insurance)}
                  className="text-blue-600 hover:text-blue-900 mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(insurance.insurance_id)}
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