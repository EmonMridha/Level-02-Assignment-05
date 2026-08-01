
import { Button } from "@/components/ui/button";
import { getRentalRequestsForLandlord } from "@/lib/services/getRentRequests";
import { approveRequest, rejectRequest } from "../_actions/requestActions";

interface IRentalRequest {
    id: string;
    tenantId: string;
    propertyId: string;
    moveInDate: string;
    message: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;

    tenant: {
        id: string;
        name: string;
        email: string;
        phone: string;
    };

    property: {
        id: string;
        title: string;
        city: string;
        rent: string;
    };
}

export default async function Requests() {
    // Placeholder data - replace with API data
    const res = await getRentalRequestsForLandlord();
    const requests = res.data || [];

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Rental Requests
                </h1>

                {/* Requests List */}
                <div className="space-y-4">
                    {requests.map((request: IRentalRequest) => (
                        <div key={request.id} className="border p-5 rounded-lg space-y-2">

                            <h2 className="text-xl font-bold">
                                {request.property.title}
                            </h2>

                            <p>
                                Tenant: {request.tenant.name}
                            </p>

                            <p>
                                Email: {request.tenant.email}
                            </p>

                            <p>
                                Phone: {request.tenant.phone}
                            </p>

                            <p>
                                Location: {request.property.city}
                            </p>

                            <p>
                                Rent: BDT {Number(request.property.rent).toLocaleString()}
                            </p>

                            <p>
                                Move In Date: {new Date(request.moveInDate).toLocaleDateString()}
                            </p>

                            <p>
                                Message: {request.message}
                            </p>

                            <p>
                                Status: {request.status}
                            </p>


                            {request.status === "PENDING" && (
                                <div className="flex gap-3">

                                    <form action={approveRequest}>
                                        <input
                                            type="hidden"
                                            name="requestId"
                                            value={request.id}
                                        />

                                        <Button className="bg-green-600">
                                            Approve
                                        </Button>
                                    </form>


                                    <form action={rejectRequest}>
                                        <input
                                            type="hidden"
                                            name="requestId"
                                            value={request.id}
                                        />

                                        <Button variant="outline">
                                            Reject
                                        </Button>
                                    </form>

                                </div>
                            )}

                        </div>
                    ))}
                </div>

                {/* Empty State - if no requests */}
                {requests.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No rental requests found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}