import React, { useState } from 'react';
import * as Database from '../../../database/database';
import * as Toast from "../../../utils/toastUtils";

interface InsuranceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (insurance: Partial<Database.Insurance>) => void;
  insurance?: Database.Insurance;
  insuranceCompanies: Database.InsuranceCompany[];
}

export default function InsuranceDialog({ 
  isOpen, 
  onClose, 
  onSave, 
  insurance,
  insuranceCompanies = []
}: InsuranceDialogProps) {
  const [formData, setFormData] = useState<Partial<Database.Insurance>>(
    insurance || {
      insurance_types: 'Vehicle',
      registration_number: '',
      name: '',
      start_date: '',
      end_date: '',
      payment_method: 'Monthly',
      insurance_status: 'Active',
      insurance_company_id: insuranceCompanies[0]?.insurance_company_id || 0,
      company_id: 0,
      description: ''
    }
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.insurance_types) newErrors.insurance_types = "Insurance type is required";
    if (!formData.registration_number) newErrors.registration_number = "Registration number is required";
    if (!formData.name) newErrors.name = "Insurance name is required";
    if (!formData.start_date) newErrors.start_date = "Start date is required";
    if (!formData.end_date) newErrors.end_date = "End date is required";
    if (!formData.payment_method) newErrors.payment_method = "Payment method is required";
    if (!formData.insurance_status) newErrors.insurance_status = "Insurance status is required";
    if (!formData.insurance_company_id) newErrors.insurance_company_id = "Insurance company is required";
    if (!formData.description) newErrors.description = "Description is required";

    if (formData.start_date && formData.end_date && new Date(formData.start_date) >= new Date(formData.end_date)) {
      newErrors.end_date = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
      Toast.showSuccessToast('Insurance successfully saved');
    } else {
      Toast.showErrorToast('Please fill in all required fields correctly');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">
            {insurance ? 'Edit Insurance' : 'Add New Insurance'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Type
            </label>
            <select
              name="insurance_types"
              value={formData.insurance_types}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.insurance_types ? 'border-red-500' : ''}`}
              required
            >
              <option value="Vehicle">Vehicle</option>
              <option value="Driver">Driver</option>
              <option value="Liability">Liability</option>
            </select>
            {errors.insurance_types && <p className="text-red-500 text-xs mt-1">{errors.insurance_types}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Registration Number
            </label>
            <input
              type="text"
              name="registration_number"
              value={formData.registration_number || ''}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.registration_number ? 'border-red-500' : ''}`}
              required
            />
            {errors.registration_number && <p className="text-red-500 text-xs mt-1">{errors.registration_number}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.name ? 'border-red-500' : ''}`}
              required
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.start_date ? 'border-red-500' : ''}`}
                required
              />
              {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.end_date ? 'border-red-500' : ''}`}
                required
              />
              {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method
            </label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.payment_method ? 'border-red-500' : ''}`}
              required
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Semi-Annual">Semi-Annual</option>
              <option value="Annual">Annual</option>
              <option value="One-Time">One-Time</option>
            </select>
            {errors.payment_method && <p className="text-red-500 text-xs mt-1">{errors.payment_method}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Company
            </label>
            <select
              name="insurance_company_id"
              value={formData.insurance_company_id || 0}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.insurance_company_id ? 'border-red-500' : ''}`}
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
            {errors.insurance_company_id && <p className="text-red-500 text-xs mt-1">{errors.insurance_company_id}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              name="insurance_status"
              value={formData.insurance_status}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.insurance_status ? 'border-red-500' : ''}`}
              required
            >
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Archived">Archived</option>
              <option value="Ending soon">Ending soon</option>
            </select>
            {errors.insurance_status && <p className="text-red-500 text-xs mt-1">{errors.insurance_status}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className={`w-full p-2 border rounded-md ${errors.description ? 'border-red-500' : ''}`}
              rows={3}
              required
            />
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
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

