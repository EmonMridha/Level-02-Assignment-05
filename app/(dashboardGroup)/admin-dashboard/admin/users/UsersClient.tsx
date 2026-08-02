'use client'

import { useRouter } from 'next/navigation'
import UserActions from '../../_actions/updateStatusAction'

export interface User {
    id: string
    name: string
    email: string
    role: 'TENANT' | 'LANDLORD' | 'ADMIN'
    status: 'ACTIVE' | 'BLOCKED' | 'INACTIVE' | 'SUSPENDED'
    createdAt: string
}

export default function UsersClient({
    users,
    currentPage,
    total,
    search
}: {
    users: User[],
    currentPage: number,
    total: number,
    search: string
}) {
    const router = useRouter()
    const itemsPerPage = 5
    const totalPages = Math.ceil(total / itemsPerPage)

    const goToPage = (page: number) => {
        router.push(`/admin-dashboard/admin/users?page=${page}&search=${search}`)
    }

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const searchTerm = formData.get('search') as string
        router.push(`/admin-dashboard/admin/users?page=1&search=${searchTerm}`)
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">All Users</h1>
                <form onSubmit={handleSearch} method="GET">
                    <input
                        type="text"
                        name="search"
                        defaultValue={search}
                        placeholder="Search by name or email..."
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <button type="submit" className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md">
                        Search
                    </button>
                </form>
            </div>

            {users.length === 0 ? (
                <p className="text-gray-500">No users found</p>
            ) : (
                <>
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
                                {users.map((user: User) => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.status}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <UserActions user={user} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-500">
                            Showing {users.length} of {total} users
                        </p>
                        <div className="flex gap-2">
                            <button
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            <button
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}