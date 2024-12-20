import React from 'react';
import type { Insurance, InsuranceCompany, InsuranceType, PaymentMethod, InsuranceStatus } from '../types';

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
  const [formData, setFormData] = React.useState<Partial<Insurance>>(
    insurance || {
      insurance_types: 'Vehicle',
      registration_number: null,
      name: null,
      start_date: '',
      end_date: '',
      payment_method: 'Monthly',
      insurance_status: 'Active',
      insurance_company_id: 0,
      company_id: 0,
      description: null
    }
  );

  const handleInsuranceTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      insurance_types: e.target.value as InsuranceType
    });
  };

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      payment_method: e.target.value as PaymentMethod
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      insurance_status: e.target.value as InsuranceStatus
    });
  };

  const handleCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const companyId = parseInt(e.target.value);
    setFormData({
      ...formData,
      insurance_company_id: companyId,
      company_id: companyId
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data to submit:', formData);
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-xl">
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

        <form onSubmit={handleSubmit} className="space-y-4">
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
  <option value="Yearly">Yearly</option>
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
              <option value="Expired">Expired</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

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