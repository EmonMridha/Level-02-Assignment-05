import { confirmPayment } from "@/lib/services/paymentService";
import { CheckCircle2 } from "lucide-react";

export default async function PaymentSuccessPage({ searchParams, }: { searchParams: Promise<{ session_id?: string }> }) {

    const { session_id } = await searchParams; // getting the session_id from the query parameters

    if (!session_id) {
        throw new Error("Session ID is missing in the query parameters.");
    }

    const result = await confirmPayment(session_id); // calling the confirmPayment function to confirm the payment and save the payment details in the database

    const paymentDetails = result.data; // getting the payment details from the result

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 sm:p-10 transition-shadow hover:shadow-xl">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center">
                        <CheckCircle2 className="w-12 h-12 text-green-600" strokeWidth={1.5} />
                    </div>
                </div>

                {/* Heading */}
                <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3">
                    Payment Successful
                </h1>

                {/* Main Message */}
                <p className="text-base sm:text-lg text-center text-gray-700 mb-8 max-w-lg mx-auto">
                    Your payment has been completed successfully. Your rental has been confirmed.
                </p>

                {/* Payment Details Card */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200">
                    <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                        Payment Details
                    </h2>
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Property Name</span>
                            <span className="text-sm font-medium text-gray-900">
                                {paymentDetails.rentalRequest.property.title}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">City</span>
                            <span className="text-sm font-medium text-gray-900">
                                {paymentDetails.rentalRequest.property.city}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Amount Paid</span>
                            <span className="text-sm font-semibold text-gray-900">
                                BDT {paymentDetails.amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                            <span className="text-sm text-gray-600">Payment Status</span>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {paymentDetails.status}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <button className="flex-1 px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-sm hover:shadow-md">
                        Go to Dashboard
                    </button>
                    <button className="flex-1 px-6 py-3 bg-white text-gray-700 font-medium rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors duration-200 shadow-sm hover:shadow-md">
                        View Payment History
                    </button>
                </div>
            </div>
        </div>
    );
}