import { getMyRentalRequests } from "@/lib/services/getRentRequests";
import Link from "next/dist/client/link";
export interface IRentalRequest {
    id: string;
    tenantId: string;
    propertyId: string;
    moveInDate: string;
    message: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    createdAt: string;
    updatedAt: string;

    property: {
        id: string;
        title: string;
        city: string;
        rent: string;
        isAvailable: boolean;
    };
}

export default async function RentalRequestsPage() {
    const result = await getMyRentalRequests();

    const requests: IRentalRequest[] = result.data; // Getting the rental requests from the response

    return (
        <div>
            <h1 className="mb-6 text-3xl font-bold">
                My Rental Requests
            </h1>

            <div className="space-y-4">
                {requests.length === 0 ? (
                    <p className="text-gray-600">You have no rental requests.</p>
                ) : requests.map((request: IRentalRequest) => (
                    <div
                        key={request.id}
                        className="rounded-lg border bg-white p-5 shadow-sm"
                    >
                        <h2 className="text-xl font-semibold">
                            {request.property.title}
                        </h2>

                        <p>
                            📍 {request.property.city}
                        </p>

                        <p>
                            💰 BDT {request.property.rent}/month
                        </p>

                        <p>
                            📅 Move in:
                            {" "}
                            {new Date(request.moveInDate).toLocaleDateString()}
                        </p>

                        <p>
                            Status:
                            <span
                                className={`ml-2 rounded px-2 py-1 text-sm ${request.status === "APPROVED"
                                        ? "bg-green-100 text-green-700"
                                        : request.status === "REJECTED"
                                            ? "bg-red-100 text-red-700"
                                            : "bg-yellow-100 text-yellow-700"
                                    }`}
                            >
                                {request.status}
                            </span>
                        </p>

                        <p className="text-gray-600">
                            {request.message}
                        </p>

                        {request.status === "APPROVED" && (
                            <Link
                                href={`/tenant-dashboard/payment?requestId=${request.id}`}
                                className="mt-3 inline-block rounded bg-black px-4 py-2 text-white"
                            >
                                Pay Now
                            </Link>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}