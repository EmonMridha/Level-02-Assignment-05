import { getAllUsers } from '@/lib/services/usersService'

export interface User {
  id: string
  name: string
  email: string
  role: 'TENANT' | 'LANDLORD' | 'ADMIN'
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED'
  createdAt: string
}

export default async function AllUsers({
  searchParams,
}: {
  searchParams: Promise<{ search?: string }>
}) {
  const { search = '' } = await searchParams
  const res = await getAllUsers()
  const users = res.data || []

  const filteredUsers = users.filter((user: User) =>
    user.name.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">All Users</h1>
        <form method="GET">
          <input
            type="text"
            name="search"
            defaultValue={search}
            placeholder="Search by name or email..."
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </form>
      </div>

      {filteredUsers.length === 0 ? (
        <p className="text-gray-500">No users found</p>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user: User) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button className="text-blue-600 mr-3">Edit</button>
                    <button className="text-red-600">Suspend</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}