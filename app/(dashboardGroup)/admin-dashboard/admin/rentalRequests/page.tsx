import { getAllRequestsAdmin } from '@/lib/services/getRentRequests'

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

const RentalRequestsForAdmin = async () => {
    const res = await getAllRequestsAdmin();
    const requests = res.data || [];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Rental Requests</h1>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tenant ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Move In Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {requests.map((request: RentalRequest) => (
                            <tr key={request.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.tenantId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.propertyId}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {new Date(request.moveInDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-900">{request.message}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${request.status === 'APPROVED' ? 'bg-blue-100 text-blue-800' :
                                        request.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                            request.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                                                request.status === 'COMPLETED' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {request.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {new Date(request.createdAt).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default RentalRequestsForAdmin