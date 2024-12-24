/** Dialogové okno pro vytváření a úpravu pojištění.
 * Poskytuje formulář s validací pro zadání všech potřebných údajů o pojištění.
 * Podporuje dva módy:
 * - vytvoření nového pojištění
 * - úprava existujícího pojištění
 */

import React from 'react';
import type { Insurance, InsuranceCompany, InsuranceType, PaymentMethod, InsuranceStatus } from '../types';

/**
 * Props rozhraní pro InsuranceDialog komponentu
 * @property {boolean} isOpen - Určuje, zda je dialog otevřený
 * @property {function} onClose - Callback pro zavření dialogu
 * @property {function} onSave - Callback pro uložení dat pojištění
 * @property {Insurance} insurance - Data existujícího pojištění (pouze pro editaci)
 * @property {InsuranceCompany[]} insuranceCompanies - Seznam dostupných pojišťoven
 */
interface InsuranceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (insurance: Partial<Insurance>) => void;
  insurance?: Insurance;
  insuranceCompanies: InsuranceCompany[];
}

export default function InsuranceDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  insurance,
  insuranceCompanies = []
}: InsuranceDialogProps) {
  // --- State Management ---
  // Inicializace formulářových dat s výchozími hodnotami nebo daty existujícího pojištění
  const [formData, setFormData] = React.useState<Partial<Insurance>>(
    insurance || {
      insurance_types: 'Vehicle',
      registration_number: null,
      name: null,
      start_date: '',
      end_date: '',
      payment_method: 'Monthly',
      insurance_status: 'Active',
      insurance_company_id: insuranceCompanies[0]?.insurance_company_id || 0,
      company_id: 0,
      description: null
    }
  );

  // --- Event Handlers ---
  /**
   * Zpracovává změnu typu pojištění
   * Aktualizuje typ pojištění ve formData
   */
  const handleInsuranceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      insurance_types: e.target.value as InsuranceType
    });
  };

  /**
   * Zpracovává změnu způsobu platby
   * Aktualizuje způsob platby ve formData
   */
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      payment_method: e.target.value as PaymentMethod
    });
  };

  /**
   * Zpracovává změnu stavu pojištění
   * Aktualizuje stav pojištění ve formData
   */
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      insurance_status: e.target.value as InsuranceStatus
    });
  };

  /**
   * Zpracovává změnu pojišťovny
   * Aktualizuje ID pojišťovny a společnosti ve formData
   */
  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = parseInt(e.target.value);
    setFormData({
      ...formData,
      insurance_company_id: companyId,
      company_id: companyId
    });
  };

  /**
   * Zpracovává odeslání formuláře
   * Validuje povinná pole před odesláním dat
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validace povinných polí
    if (!formData.insurance_types || !formData.start_date || !formData.end_date) {
      console.error('Required fields are missing');
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
        {/* Hlavička dialogu */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {insurance ? 'Edit Insurance' : 'Add New Insurance'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>

        {/* Formulář pojištění */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Typ pojištění a registrační číslo */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Type
              </label>
              <select
                value={formData.insurance_types}
                onChange={handleInsuranceTypeChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="Vehicle">Vehicle</option>
                <option value="Driver">Driver</option>
                <option value="Liability">Liability</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Registration Number
              </label>
              <input
                type="text"
                value={formData.registration_number || ''}
                onChange={(e) => setFormData({ ...formData, registration_number: e.target.value })}
                className="w-full p-2 border rounded-md"
              />
            </div>
          </div>

          {/* Datum začátku a konce pojištění */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
          </div>

          {/* Název pojištění */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Name
            </label>
            <input
              type="text"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md"
            />
          </div>

          {/* Způsob platby a pojišťovna */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Method
              </label>
              <select
                value={formData.payment_method}
                onChange={handlePaymentMethodChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Semi-Annual">Semi-Annual</option>
                <option value="Annual">Annual</option>
                <option value="One-Time">One-Time</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Insurance Company
              </label>
              <select
                value={formData.insurance_company_id || 0}
                onChange={handleCompanyChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value={0}>Select Insurance Company</option>
                {Array.isArray(insuranceCompanies) && insuranceCompanies.map((company) => (
                  <option 
                    key={company.insurance_company_id} 
                    value={company.insurance_company_id}
                  >
                    {company.company_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status pojištění */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.insurance_status}
              onChange={handleStatusChange}
              className="w-full p-2 border rounded-md"
              required
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Archived">Archived</option>
              <option value="Ending">Ending</option>
            </select>
          </div>

          {/* Popis pojištění */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border rounded-md"
              rows={3}
            />
          </div>

          {/* Akční tlačítka */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {insurance ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}