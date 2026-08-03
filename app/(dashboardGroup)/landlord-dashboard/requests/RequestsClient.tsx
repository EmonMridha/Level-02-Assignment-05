'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { approveRequest, rejectRequest } from "../_actions/requestActions"

interface IRentalRequest {
    id: string
    tenantId: string
    propertyId: string
    moveInDate: string
    message: string
    status: "PENDING" | "APPROVED" | "REJECTED"
    createdAt: string
    updatedAt: string
    tenant: {
        id: string
        name: string
        email: string
        phone: string
    }
    property: {
        id: string
        title: string
        city: string
        rent: string
    }
}

export default function RequestsClient({ requests: initialRequests }: { requests: IRentalRequest[] }) {
    const [requests, setRequests] = useState(initialRequests)
    const [loading, setLoading] = useState<string | null>(null)

    const handleApprove = async (requestId: string) => {
        setLoading(requestId)
        try {
            const formData = new FormData()
            formData.append('requestId', requestId)
            await approveRequest(formData)
            setRequests(prev => prev.map(req => 
                req.id === requestId ? { ...req, status: 'APPROVED' } : req
            ))
            toast.success('Request approved successfully!')
        } catch {
            toast.error('Failed to approve request')
        } finally {
            setLoading(null)
        }
    }

    const handleReject = async (requestId: string) => {
        setLoading(requestId)
        try {
            const formData = new FormData()
            formData.append('requestId', requestId)
            await rejectRequest(formData)
            setRequests(prev => prev.map(req => 
                req.id === requestId ? { ...req, status: 'REJECTED' } : req
            ))
            toast.success('Request rejected')
        } catch {
            toast.error('Failed to reject request')
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Rental Requests On My Properties
                </h1>

                <div className="space-y-4">
                    {requests.map((request) => (
                        <div key={request.id} className="border p-5 rounded-lg space-y-2">
                            <h2 className="text-xl font-bold">{request.property.title}</h2>
                            <p>Tenant: {request.tenant.name}</p>
                            <p>Email: {request.tenant.email}</p>
                            <p>Phone: {request.tenant.phone}</p>
                            <p>Location: {request.property.city}</p>
                            <p>Rent: BDT {Number(request.property.rent).toLocaleString()}</p>
                            <p>Move In Date: {new Date(request.moveInDate).toLocaleDateString('en-US')}</p>
                            <p>Message: {request.message}</p>
                            <p>Status: {request.status}</p>

                            {request.status === "PENDING" && (
                                <div className="flex gap-3">
                                    <Button 
                                        onClick={() => handleApprove(request.id)}
                                        disabled={loading === request.id}
                                        className="bg-green-600"
                                    >
                                        {loading === request.id ? 'Processing...' : 'Approve'}
                                    </Button>
                                    <Button 
                                        onClick={() => handleReject(request.id)}
                                        disabled={loading === request.id}
                                        variant="outline"
                                    >
                                        {loading === request.id ? 'Processing...' : 'Reject'}
                                    </Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {requests.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">No rental requests found.</p>
                    </div>
                )}
            </div>
        </div>
    )
}