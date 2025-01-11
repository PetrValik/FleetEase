import React from 'react';
import * as Database from '../../../database/database';

interface InsuranceTableProps {
  insurances?: Database.Insurance[];
  searchTerm: string;
  activeTab: string;
  onEdit: (insurance: Database.Insurance) => void;
  onDelete: (id: number) => void;
  loading: boolean;
  insuranceCompanies: Database.InsuranceCompany[];
}

export default function InsuranceTable({ 
  insurances = [],
  searchTerm, 
  activeTab,
  onEdit,
  onDelete,
  loading,
  insuranceCompanies
}: InsuranceTableProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('cs-CZ', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getInsuranceCompanyName = (id: number) => {
    const company = insuranceCompanies.find(c => c.insurance_company_id === id);
    return company?.company_name || 'N/A';
  };

  const safeInsurances = Array.isArray(insurances) ? insurances : [];
  
  const filteredInsurances = safeInsurances.filter(insurance => {
    const matchesSearch = 
      (insurance.registration_number?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (insurance.name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && insurance.insurance_types === activeTab;
  });

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (filteredInsurances.length === 0) {
    return <div className="text-center py-4">No insurances found</div>;
  }

  // Mobile card view
  const MobileView = () => (
    <div className="space-y-4 md:hidden">
      {filteredInsurances.map((insurance) => (
        <div key={insurance.insurance_id} className="bg-white rounded-lg shadow p-4 space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-medium">{insurance.name || 'N/A'}</div>
              <div className="text-sm text-gray-500">{insurance.registration_number || 'N/A'}</div>
            </div>
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
              insurance.insurance_status === 'Active' 
                ? 'bg-green-100 text-green-800'
                : insurance.insurance_status === 'Pending'
                ? 'bg-yellow-100 text-yellow-800'
                : insurance.insurance_status === 'Archived'
                ? 'bg-red-100 text-red-800'
                : insurance.insurance_status === 'Ending soon'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-gray-100 text-gray-800'
            }`}>
              {insurance.insurance_status}
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <div className="text-gray-500">Insurance Company</div>
              <div>{getInsuranceCompanyName(insurance.insurance_company_id)}</div>
            </div>
            <div>
              <div className="text-gray-500">Valid Until</div>
              <div>{formatDate(insurance.end_date)}</div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t">
            <button
              onClick={() => onEdit(insurance)}
              className="text-blue-600 text-sm font-medium"
            >
              Edit
            </button>
            <button
              onClick={() => insurance.insurance_id && onDelete(insurance.insurance_id)}
              className="text-red-600 text-sm font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  // Desktop table view
  const DesktopView = () => (
    <div className="hidden md:block overflow-x-auto">
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
                {insurance.registration_number || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {insurance.name || 'N/A'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {getInsuranceCompanyName(insurance.insurance_company_id)}
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
                    : insurance.insurance_status === 'Archived'
                    ? 'bg-red-100 text-red-800'
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

  return (
    <>
      <MobileView />
      <DesktopView />
    </>
  );
}

