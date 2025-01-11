import React, { useState, useEffect } from 'react'
import * as Database from '../../database/database'
import { useUser } from "../../contexts/UserContext"

interface CreateDefectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (defect: Omit<Database.Defect, 'defect_id' | 'created_at' | 'repair_cost'>) => void;
  defectTypes: Database.DefectType[];
  vehicles: Database.Vehicle[];
}

export function CreateDefectModal({ isOpen, onClose, onSubmit, defectTypes, vehicles }: CreateDefectModalProps) {
  const { user: currentUser } = useUser()
  const [formData, setFormData] = useState({
    vehicle_id: '',
    type_id: '',
    defect_severity: 'Low' as Database.DefectSeverity,
    description: '',
    date_reported: new Date().toISOString().split('T')[0],
    defect_status: 'Reported' as Database.DefectStatus,
    user_id: currentUser?.user_id || 1,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (currentUser?.company_id) {
      // Any additional logic if needed
    }
  }, [currentUser?.company_id])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}

    // Check for empty fields
    if (!formData.vehicle_id) newErrors.vehicle_id = "Please select a vehicle"
    if (!formData.type_id) newErrors.type_id = "Please select a defect type"
    if (!formData.description.trim()) newErrors.description = "Please provide a description"
    if (!formData.date_reported) newErrors.date_reported = "Please select a report date"

    // If there are errors, set them and prevent form submission
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    // Clear any existing errors
    setErrors({})

    // Submit the form if all validations pass
    onSubmit({
      ...formData,
      vehicle_id: parseInt(formData.vehicle_id),
      type_id: parseInt(formData.type_id),
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold">Add New Defect</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-grow">
          {Object.keys(errors).length > 0 && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Please correct the following errors:</strong>
              <ul className="mt-2 list-disc list-inside">
                {Object.values(errors).map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">Vehicle</label>
            <select
              value={formData.vehicle_id}
              onChange={(e) => setFormData(prev => ({ ...prev, vehicle_id: e.target.value }))}
              className={`mt-1 block w-full rounded-md border ${errors.vehicle_id ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
              required
            >
              <option value="">Select vehicle</option>
              {vehicles.map(vehicle => (
                <option key={vehicle.vehicle_id} value={vehicle.vehicle_id}>
                  {vehicle.registration_number}
                </option>
              ))}
            </select>
            {errors.vehicle_id && <p className="mt-1 text-sm text-red-500">{errors.vehicle_id}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Report Date</label>
            <input
              type="date"
              value={formData.date_reported}
              onChange={(e) => setFormData(prev => ({ ...prev, date_reported: e.target.value }))}
              className={`mt-1 block w-full rounded-md border ${errors.date_reported ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
              required
            />
            {errors.date_reported && <p className="mt-1 text-sm text-red-500">{errors.date_reported}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Defect Type</label>
            <select
              value={formData.type_id}
              onChange={(e) => setFormData(prev => ({ ...prev, type_id: e.target.value }))}
              className={`mt-1 block w-full rounded-md border ${errors.type_id ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
              required
            >
              <option value="">Select type</option>
              {defectTypes.map(type => (
                <option key={type.type_id} value={type.type_id}>
                  {type.type_name}
                </option>
              ))}
            </select>
            {errors.type_id && <p className="mt-1 text-sm text-red-500">{errors.type_id}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Severity</label>
            <select
              value={formData.defect_severity}
              onChange={(e) => setFormData(prev => ({ ...prev, defect_severity: e.target.value as Database.DefectSeverity }))}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            >
              {['Minor', 'Low', 'Medium', 'High', 'Critical'].map(severity => (
                <option key={severity} value={severity}>
                  {severity}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className={`mt-1 block w-full rounded-md border ${errors.description ? 'border-red-500' : 'border-gray-300'} px-3 py-2`}
              rows={4}
              required
            />
            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
          </div>
        </form>

        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

