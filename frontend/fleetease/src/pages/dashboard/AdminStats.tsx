import { useEffect, useState } from "react"
import { useUser } from "../../contexts/UserContext"
import { Building2, Users, Car, FileCheck, AlertTriangle } from 'lucide-react'
import * as Database from "../../database/database"

interface StatsCardProps {
  title: string
  value: number
  icon: React.ReactNode
}

const StatsCard = ({ title, value, icon }: StatsCardProps) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
    <div className="p-2 bg-blue-100 rounded-lg">
      {icon}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
)

interface Stats {
  companies: any[]
  users: any[]
  vehicles: any[]
  insurances: any[]
  defects: any[]
}

export default function AdminStats() {
  const { user: currentUser } = useUser()
  const [stats, setStats] = useState<Stats>({
    companies: [],
    users: [],
    vehicles: [],
    insurances: [],
    defects: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          companies,
          users,
          vehicles,
          insurances,
          defects
        ] = await Promise.all([
          Database.getAllCompanies(),
          Database.getAllUsers(),
          Database.getAllVehicles(),
          Database.getAllInsurances(),
          Database.getAllDefects()
        ])

        setStats({
          companies,
          users,
          vehicles,
          insurances,
          defects
        })
      } catch (err) {
        setError('Failed to fetch statistics')
        console.error('Error fetching stats:', err)
      } finally {
        setLoading(false)
      }
    }

    if (currentUser?.role.role_name === 'Admin') {
      fetchStats()
    }
  }, [currentUser?.role.role_name])

  // Return null if user is not admin
  if (currentUser?.role.role_name !== 'Admin') {
    return null
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center">Loading statistics...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="text-center text-red-600">{error}</div>
      </div>
    )
  }

  // Calculate totals
  const totals = {
    companies: stats.companies.length,
    users: stats.users.length,
    vehicles: stats.vehicles.length,
    insurances: stats.insurances.length,
    defects: stats.defects.length,
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Welcome to Admin Dashboard</h1>
        <p className="text-gray-600">Here's an overview of your system statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatsCard
          title="Total Companies"
          value={totals.companies}
          icon={<Building2 className="w-6 h-6 text-blue-600" />}
        />
        <StatsCard
          title="Total Users"
          value={totals.users}
          icon={<Users className="w-6 h-6 text-blue-600" />}
        />
        <StatsCard
          title="Total Vehicles"
          value={totals.vehicles}
          icon={<Car className="w-6 h-6 text-blue-600" />}
        />
        <StatsCard
          title="Active Insurances"
          value={totals.insurances}
          icon={<FileCheck className="w-6 h-6 text-blue-600" />}
        />
        <StatsCard
          title="Reported Defects"
          value={totals.defects}
          icon={<AlertTriangle className="w-6 h-6 text-blue-600" />}
        />
      </div>
    </div>
  )
}

