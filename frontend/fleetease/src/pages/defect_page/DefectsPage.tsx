import React, { useState, useEffect } from 'react'
import * as Database from '../../database/database'
import { useUser } from "../../contexts/UserContext"
import { CreateDefectModal } from './CreateDefectModal'
import { EditDefectModal } from './EditDefectModal'
import * as Toast from "../../utils/toastUtils";

export default function DefectsDashboard() {
  const { user: currentUser } = useUser()
  const [defects, setDefects] = useState<(Database.Defect & { registrationNumber?: string, reportedByUser?: string })[]>([])
  const [defectTypes, setDefectTypes] = useState<Database.DefectType[]>([])
  const [vehicles, setVehicles] = useState<Database.Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState('active')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [selectedDefect, setSelectedDefect] = useState<Database.Defect | null>(null)

  const isManager = currentUser?.role.role_name === 'Manager' || currentUser?.role.role_name === 'Admin'

  useEffect(() => {
    fetchDefectsAndVehicles()
    fetchDefectTypes()
    if (currentUser?.company_id) {
      fetchVehicles(currentUser.company_id)
    }
  }, [currentUser?.company_id])

  const fetchDefectsAndVehicles = async () => {
    setLoading(true)
    try {
      const fetchedDefects = await Database.getAllDefects()
      const defectsWithDetails = await Promise.all(
        fetchedDefects.map(async (defect) => {
          const vehicle = await Database.getVehicleById(defect.vehicle_id)
          const user = await Database.getUserById(defect.user_id)
          return {
            ...defect,
            registrationNumber: vehicle?.registration_number,
            reportedByUser: user ? `${user.first_name} ${user.last_name}` : 'Unknown'
          }
        })
      )
      setDefects(defectsWithDetails)
    } catch (err) {
      setError('Failed to fetch defects and vehicles')
    } finally {
      setLoading(false)
    }
  }

  const fetchDefectTypes = async () => {
    try {
      const fetchedDefectTypes = await Database.getAllDefectTypes()
      setDefectTypes(fetchedDefectTypes)
    } catch (err) {
      setError('Failed to fetch defect types')
    }
  }

  const fetchVehicles = async (companyId: number) => {
    try {
      const fetchedVehicles = await Database.getVehiclesByCompanyId(companyId)
      setVehicles(fetchedVehicles)
    } catch (error) {
      Toast.showErrorToast("Failed to fetch vehicles");
      console.error('Failed to fetch vehicles:', error)
    }
  }

  const handleCreateDefect = async (defectData: Omit<Database.Defect, 'defect_id' | 'created_at' | 'repair_cost'>) => {
    try {
      const newDefect = await Database.createDefect(defectData)
      if (newDefect) {
        await fetchDefectsAndVehicles()
        Toast.showSuccessToast("Defect created succesfully");
        setIsCreateModalOpen(false)
      }
    } catch (err) {
      setError('Failed to create defect')
      Toast.showSuccessToast('Failed to create defect');
    }
  }

  const handleEditDefect = async (id: number, updatedData: Partial<Database.Defect>) => {
    try {
      const updatedDefect = await Database.updateDefect(id, updatedData)
      if (updatedDefect) {
        await fetchDefectsAndVehicles()
        Toast.showSuccessToast("Defect edited succesfully");
        setIsEditModalOpen(false)
      }
    } catch (err) {
      Toast.showErrorToast('Failed to update defect');
      setError('Failed to update defect')
    }
  }

  const handleDeleteDefect = async (defectId: number) => {
    try {
      await Database.deleteDefect(defectId)
      Toast.showSuccessToast("Defect deleted succesfully");
      setDefects(defects.filter(defect => defect.defect_id !== defectId))
    } catch (err) {
      Toast.showErrorToast('Failed to delete defect');
      setError('Failed to delete defect')
    }
  }

  const handleStatusProgression = async (defect: Database.Defect) => {
    const statusFlow = {
      'Reported': 'In Progress',
      'In Progress': 'Repaired',
      'Repaired': 'Closed'
    } as const;
    
    const nextStatus = statusFlow[defect.defect_status as keyof typeof statusFlow];
    
    if (nextStatus) {
      try {
        const updateData = {
          defect_status: nextStatus,
          user_id: defect.user_id,
          vehicle_id: defect.vehicle_id,
          type_id: defect.type_id,
          defect_severity: defect.defect_severity,
          description: defect.description,
          date_reported: defect.date_reported,
        };
        await handleEditDefect(defect.defect_id, updateData);
      } catch (err) {
        setError('Failed to update defect status')
        Toast.showErrorToast("Failed to update defect status");
      }
    }
  }

  const getDefectTypeName = (typeId: number) => {
    const defectType = defectTypes.find(type => type.type_id === typeId)
    return defectType ? defectType.type_name : 'Unknown'
  }

  const getSeverityColor = (severity: Database.DefectSeverity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
      case 'minor':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const activeDefects = defects.filter(defect => 
    ['Reported', 'In Progress', 'Deferred'].includes(defect.defect_status)
  )

  const archivedDefects = defects.filter(defect => 
    ['Repaired', 'Closed'].includes(defect.defect_status)
  )

  const resolvedThisMonth = archivedDefects.filter(defect => 
    new Date(defect.date_reported).getMonth() === new Date().getMonth()
  ).length

  if (loading) return <div className="text-center p-4">Loading...</div>
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>
  if (!currentUser?.company_id) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center p-4">
          <h2 className="text-xl font-semibold text-gray-900">You are not member of any company</h2>
          <p className="mt-2 text-gray-600">Please contact your administrator to get access.</p>
        </div>
      </div>
    )
  }

  const filteredDefects = activeTab === 'active' ? activeDefects : archivedDefects

  return (
    <div className="container mx-auto p-4 space-y-4">
      {isManager && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium">Active Defects</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
            <div className="text-2xl font-bold">{activeDefects.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium">Resolved This Month</h3>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 4v6h-6"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
            </div>
            <div className="text-2xl font-bold">{resolvedThisMonth}</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex items-center">
          {isManager && (
            <div className="flex items-center space-x-4">
              <div className="flex">
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'active' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('active')}
                >
                  Active Defects
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'history' ? 'border-b-2 border-primary text-primary' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('history')}
                >
                  Archive
                </button>
              </div>
            </div>
          )}
          <div className="ml-auto">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
            >
              Create New Defect
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Registration Number</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Defect Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Report Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reported By</th>
                {isManager && (
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredDefects.map((defect) => (
                <tr key={defect.defect_id} className="border-b">
                  <td className="px-4 py-3 text-sm">{defect.registrationNumber || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm">{getDefectTypeName(defect.type_id)}</td>
                  <td className="px-4 py-3 text-sm">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(defect.defect_severity)}`}>
                      {defect.defect_severity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{defect.description}</td>
                  <td className="px-4 py-3 text-sm">{new Date(defect.date_reported).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-sm">{defect.defect_status}</td>
                  <td className="px-4 py-3 text-sm">{defect.reportedByUser}</td>
                  {isManager && (
                    <td className="px-4 py-3 text-sm">
                      <div className="flex justify-end gap-2">
                        <button 
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => {
                            setSelectedDefect(defect)
                            setIsEditModalOpen(true)
                          }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                          </svg>
                        </button>
                        {defect.defect_status !== 'Closed' && (
                          <button 
                            className="p-1 hover:bg-gray-100 rounded-full text-green-600"
                            onClick={() => handleStatusProgression(defect)}
                            title="Progress Status"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          </button>
                        )}
                        <button 
                          className="p-1 hover:bg-gray-100 rounded-full"
                          onClick={() => handleDeleteDefect(defect.defect_id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isCreateModalOpen && (
        <CreateDefectModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateDefect}
          defectTypes={defectTypes}
          vehicles={vehicles}
        />
      )}

      {isEditModalOpen && selectedDefect && (
        <EditDefectModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedDefect(null)
          }}
          onSubmit={handleEditDefect}
          defect={selectedDefect}
          defectTypes={defectTypes}
          vehicles={vehicles}
        />
      )}
    </div>
  )
}

