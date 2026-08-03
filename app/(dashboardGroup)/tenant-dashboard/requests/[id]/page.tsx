import { Button } from "@/components/ui/button"
import { getRentalRequestById } from "@/lib/services/getRentRequests"
import Link from 'next/link'

interface RentalRequest {
    id: string
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'ACTIVE' | 'COMPLETED'
    moveInDate: string
    message: string
    createdAt: string
    property: {
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
    }
}

export default async function RequestStatusPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const res = await getRentalRequestById(id)
    const request: RentalRequest = res.data

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            <div className="max-w-3xl mx-auto">
                {/* Status Card */}
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="text-center">
                        <div className="mb-4">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Waiting for Approval</h2>
                        <p className="text-gray-600 mt-2">
                            Your rental request has been submitted and is awaiting the landlords response.
                            You will be notified when the status changes.
                        </p>
                        <div className="mt-4">
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                                {request.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Property Details */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Property Details</h3>
                    <div className="space-y-2">
                        <p><span className="font-medium">Title:</span> {request.property.title}</p>
                        <p><span className="font-medium">Address:</span> {request.property.address}, {request.property.city}</p>
                        <p><span className="font-medium">Rent:</span> BDT {Number(request.property.rent).toLocaleString()}</p>
                        <p><span className="font-medium">Bedrooms:</span> {request.property.bedrooms}</p>
                        <p><span className="font-medium">Bathrooms:</span> {request.property.bathrooms}</p>
                        <p><span className="font-medium">Move-in Date:</span> {new Date(request.moveInDate).toLocaleDateString()}</p>
                        {request.message && (
                            <p><span className="font-medium">Message:</span> {request.message}</p>
                        )}
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Link href="/tenant-dashboard/requests">
                            <Button variant="outline">View All Requests</Button>
                        </Link>
                        <Link href={`/properties/${request.property.id}`}>
                            <Button>View Property</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}