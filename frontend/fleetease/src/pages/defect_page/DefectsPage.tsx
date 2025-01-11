import React, { useState, useEffect } from 'react'
import { AlertTriangle, RotateCcw, Edit2, Check, Trash2 } from 'lucide-react'
import * as Database from '../../database/database'
import { useUser } from "../../contexts/UserContext"
import * as Toast from "../../utils/toastUtils"

interface DefectWithDetails extends Database.Defect {
  registrationNumber?: string
  reportedByUser?: string
}

interface DefectCardProps {
  defect: DefectWithDetails
  isManager: boolean
  getDefectTypeName: (typeId: number) => string
  getSeverityColor: (severity: string) => string
  onEdit: () => void
  onDelete: () => void
  onStatusProgress: () => void
}

const DefectCard: React.FC<DefectCardProps> = ({
  defect,
  isManager,
  getDefectTypeName,
  getSeverityColor,
  onEdit,
  onDelete,
  onStatusProgress,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-3 space-y-2">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{defect.registrationNumber || 'N/A'}</h3>
          <p className="text-sm text-gray-500">{getDefectTypeName(defect.type_id)}</p>
        </div>
        <span className={`${getSeverityColor(defect.defect_severity)} px-2 py-1 text-xs font-semibold rounded-full`}>
          {defect.defect_severity}
        </span>
      </div>
      
      <p className="text-sm">{defect.description}</p>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
        <div>
          <p className="font-medium">Status</p>
          <p>{defect.defect_status}</p>
        </div>
        <div>
          <p className="font-medium">Report Date</p>
          <p>{new Date(defect.date_reported).toLocaleDateString()}</p>
        </div>
      </div>
      
      <div className="text-sm">
        <p className="font-medium">Reported By</p>
        <p className="text-gray-600">{defect.reportedByUser}</p>
      </div>

      {isManager && (
        <div className="flex justify-end gap-2 pt-2 border-t">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Edit defect"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          {defect.defect_status !== 'Closed' && (
            <button
              onClick={onStatusProgress}
              className="p-2 hover:bg-gray-100 rounded-full text-green-600 transition-colors"
              aria-label="Progress status"
            >
              <Check className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onDelete}
            className="p-2 hover:bg-gray-100 rounded-full text-red-600 transition-colors"
            aria-label="Delete defect"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function DefectsDashboard() {
  const { user: currentUser } = useUser()
  const [defects, setDefects] = useState<DefectWithDetails[]>([])
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
      Toast.showErrorToast('Failed to fetch defects and vehicles')
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
      Toast.showErrorToast('Failed to fetch defect types')
    }
  }

  const fetchVehicles = async (companyId: number) => {
    try {
      const fetchedVehicles = await Database.getVehiclesByCompanyId(companyId)
      setVehicles(fetchedVehicles)
    } catch (error) {
      Toast.showErrorToast("Failed to fetch vehicles")
      console.error('Failed to fetch vehicles:', error)
    }
  }

  const handleCreateDefect = async (defectData: Omit<Database.Defect, 'defect_id' | 'created_at' | 'repair_cost'>) => {
    try {
      const newDefect = await Database.createDefect(defectData)
      if (newDefect) {
        await fetchDefectsAndVehicles()
        Toast.showSuccessToast("Defect created successfully")
        setIsCreateModalOpen(false)
      }
    } catch (err) {
      Toast.showErrorToast('Failed to create defect')
      setError('Failed to create defect')
    }
  }

  const handleEditDefect = async (id: number, updatedData: Partial<Database.Defect>) => {
    try {
      const updatedDefect = await Database.updateDefect(id, updatedData)
      if (updatedDefect) {
        await fetchDefectsAndVehicles()
        Toast.showSuccessToast("Defect updated successfully")
        setIsEditModalOpen(false)
      }
    } catch (err) {
      Toast.showErrorToast('Failed to update defect')
      setError('Failed to update defect')
    }
  }

  const handleDeleteDefect = async (defectId: number) => {
    try {
      await Database.deleteDefect(defectId)
      Toast.showSuccessToast("Defect deleted successfully")
      setDefects(defects.filter(defect => defect.defect_id !== defectId))
    } catch (err) {
      Toast.showErrorToast('Failed to delete defect')
      setError('Failed to delete defect')
    }
  }

  const handleStatusProgression = async (defect: Database.Defect) => {
    const statusFlow = {
      'Reported': 'In Progress',
      'In Progress': 'Repaired',
      'Repaired': 'Closed'
    } as const
    
    const nextStatus = statusFlow[defect.defect_status as keyof typeof statusFlow]
    
    if (nextStatus) {
      try {
        const updateData = {
          ...defect,
          defect_status: nextStatus,
        }
        await handleEditDefect(defect.defect_id, updateData)
      } catch (err) {
        setError('Failed to update defect status')
        Toast.showErrorToast("Failed to update defect status")
      }
    }
  }

  const getDefectTypeName = (typeId: number) => {
    const defectType = defectTypes.find(type => type.type_id === typeId)
    return defectType ? defectType.type_name : 'Unknown'
  }

  const getSeverityColor = (severity: string) => {
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
    <div className="container mx-auto md:p-4 p-2 space-y-4">
      {isManager && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium">Active Defects</h3>
              <AlertTriangle className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">{activeDefects.length}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between pb-2">
              <h3 className="text-sm font-medium">Resolved This Month</h3>
              <RotateCcw className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold">{resolvedThisMonth}</div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {isManager && (
            <div className="flex items-center space-x-4">
              <div className="flex">
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'active' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('active')}
                >
                  Active Defects
                </button>
                <button 
                  className={`px-4 py-2 text-sm font-medium ${activeTab === 'history' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                  onClick={() => setActiveTab('history')}
                >
                  Archive
                </button>
              </div>
            </div>
          )}
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
          >
            Create New Defect
          </button>
        </div>

        {/* Desktop view */}
        <div className="hidden md:block overflow-x-auto">
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
                          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          onClick={() => {
                            setSelectedDefect(defect)
                            setIsEditModalOpen(true)
                          }}
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        {defect.defect_status !== 'Closed' && (
                          <button 
                            className="p-1 hover:bg-gray-100 rounded-full text-green-600 transition-colors"
                            onClick={() => handleStatusProgression(defect)}
                            title="Progress Status"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                        <button 
                          className="p-1 hover:bg-gray-100 rounded-full text-red-600 transition-colors"
                          onClick={() => handleDeleteDefect(defect.defect_id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile view */}
        <div className="md:hidden">
          <div className="divide-y">
            {filteredDefects.map((defect) => (
              <div key={defect.defect_id} className="px-0 py-2">
                <DefectCard
                  defect={defect}
                  isManager={isManager}
                  getDefectTypeName={getDefectTypeName}
                  getSeverityColor={getSeverityColor}
                  onEdit={() => {
                    setSelectedDefect(defect)
                    setIsEditModalOpen(true)
                  }}
                  onDelete={() => handleDeleteDefect(defect.defect_id)}
                  onStatusProgress={() => handleStatusProgression(defect)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create and Edit modals would go here, but they're not included as per your request */}
    </div>
  )
}

