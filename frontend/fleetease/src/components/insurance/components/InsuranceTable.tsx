/**Komponenta pro zobrazení seznamu pojištění ve formě tabulky.
 * Poskytuje možnosti:
 * - Filtrování podle typu pojištění
 * - Vyhledávání podle registračního čísla nebo názvu
 * - Správu pojištění (úprava, smazání)
 * - Zobrazení stavu pomocí barevného označení
 */

import React from 'react';
import { Insurance, InsuranceCompany } from '../types'; 

/**
 * Props rozhraní pro InsuranceTable komponentu
 * @property {Insurance[]} insurances - Seznam pojištění k zobrazení
 * @property {string} searchTerm - Vyhledávací výraz
 * @property {string} activeTab - Aktivní záložka filtru
 * @property {function} onEdit - Callback pro úpravu pojištění
 * @property {function} onDelete - Callback pro smazání pojištění
 * @property {boolean} loading - Indikátor načítání
 * @property {InsuranceCompany[]} insuranceCompanies - Seznam pojišťoven pro mapování ID na názvy
 */
interface InsuranceTableProps {
  insurances: Insurance[];
  searchTerm: string;
  activeTab: string;
  onEdit: (insurance: Insurance) => void;
  onDelete: (id: number) => void;
  loading: boolean;
  insuranceCompanies: InsuranceCompany[];
}

export default function InsuranceTable({ 
  insurances, 
  searchTerm, 
  activeTab,
  onEdit,
  onDelete,
  loading,
  insuranceCompanies
}: InsuranceTableProps) {

  /**
   * Formátuje datum do lokálního formátu
   * @param dateString ISO string data
   * @returns Formátované datum
   */
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  /**
   * Najde a vrátí název pojišťovny podle ID
   * @param id ID pojišťovny
   * @returns Název pojišťovny nebo 'N/A' pokud není nalezena
   */
  const getInsuranceCompanyName = (id: number) => {
    const company = insuranceCompanies.find(c => c.insurance_company_id === id);
    return company?.company_name || 'N/A';
  };

  /**
   * Filtruje pojištění podle vyhledávacího výrazu a aktivní záložky
   * Vyhledává v registračním čísle a názvu pojištění
   */
  const filteredInsurances = insurances.filter(insurance => {
    const matchesSearch = 
      (insurance.registration_number?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (insurance.name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && insurance.insurance_types === activeTab;
  });

  // Zobrazení stavu načítání
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  // Zobrazení prázdného stavu
  if (filteredInsurances.length === 0) {
    return <div className="text-center py-4">No insurances found</div>;
  }

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
          {insurances.map((insurance) => (
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
                    : insurance.insurance_status === 'Ending'
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
}