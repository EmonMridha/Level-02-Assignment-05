import { getAllRequestsAdmin } from '@/lib/services/getRentRequests'
import { getProperties } from '@/lib/services/propertyService'
import { getAllUsers } from '@/lib/services/usersService'

interface RentalRequest {
  id: string
  tenantId: string
  propertyId: string
  moveInDate: string
  message: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED'
  createdAt: string
  updatedAt: string
}

interface User {
  id: string
  name: string
  email: string
  role: 'TENANT' | 'LANDLORD' | 'ADMIN'
  status: 'ACTIVE' | 'BLOCKED' | 'INACTIVE' | 'SUSPENDED'
  createdAt: string
}

interface Property {
  id: string
  title: string
  description: string
  address: string
  city: string
  rent: string
  bedrooms: number
  bathrooms: number
  amenities: string[]
  isAvailable: boolean
  landlordId: string
  categoryId: string
  createdAt: string
  updatedAt: string
}

const AdminDashboardHome = async () => {
  const usersRes = await getAllUsers()
  const propertiesRes = await getProperties()
  const requestsRes = await getAllRequestsAdmin()

  const users: User[] = usersRes?.data || []
  const properties: Property[] = propertiesRes?.data || []
  const requests: RentalRequest[] = requestsRes?.data || []
  const approvedCount = requests.filter(req => req?.status === 'APPROVED').length

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{users.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Properties</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{properties.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Requests</h3>
          <p className="text-3xl font-bold text-gray-800 mt-2">{requests.length}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Approved Requests</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{approvedCount}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardHome