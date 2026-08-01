import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getPaymentHistory } from "@/lib/services/paymentService";

export interface IPayment {
    id: string;
    transactionId: string;
    amount: string;
    provider: string;
    status: "COMPLETED" | "PENDING" | "FAILED";
    rentalRequestId: string;
    paidAt: string;
    createdAt: string;
    updatedAt: string;

    rentalRequest: {
        id: string;
        tenantId: string;
        propertyId: string;
        moveInDate: string;
        message: string;
        status: "APPROVED" | "PENDING" | "REJECTED";
        createdAt: string;
        updatedAt: string;

        property: {
            id: string;
            title: string;
            city: string;
            rent: string;
        };
    };
}
export default async function PaymentHistoryPage() {
    // Placeholder data - replace with dynamic data from your backend
    const res = await getPaymentHistory()
    const payments = res.data

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800 hover:bg-green-100";
            case "pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
            case "failed":
                return "bg-red-100 text-red-800 hover:bg-red-100";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-100";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
            <div className="max-w-4xl mx-auto">
                {/* Page Title */}
                <h1 className="text-3xl font-bold text-gray-900 mb-6">
                    Payment History
                </h1>

                {/* Payment Cards */}
                {payments.length > 0 ? (
                    <div className="space-y-4">
                        {payments.map((payment: IPayment) => (
                            <Card key={payment.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200">
                                <CardContent className="p-6">
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                        {/* Left Section - Property Info */}
                                        <div className="flex-1 space-y-2">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {payment.rentalRequest.property.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                {payment.rentalRequest.property.city}
                                            </p>
                                            <div className="flex flex-wrap items-center gap-3 mt-1">
                                                <Badge className={`${getStatusColor(payment.status)} font-medium px-3 py-1 rounded-full text-xs border-0`}>
                                                    {payment.status}
                                                </Badge>
                                                <span className="text-sm text-gray-500">
                                                    {payment.provider}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Right Section - Payment Details */}
                                        <div className="flex-1 space-y-2 md:text-right">
                                            <p className="text-xl font-bold text-gray-900">
                                                BDT {Number(payment.amount).toLocaleString()}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Paid: {payment.paidAt}
                                            </p>
                                            <p className="text-xs text-gray-400 font-mono">
                                                ID: {payment.transactionId}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            No payment history found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}