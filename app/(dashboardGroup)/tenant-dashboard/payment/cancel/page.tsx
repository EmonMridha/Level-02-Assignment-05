import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function PaymentCancellationPage() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
            <Card className="w-full max-w-2xl shadow-lg rounded-2xl border-0">
                <CardContent className="p-8 sm:p-10">
                    {/* Red X Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center">
                            <XCircle className="w-12 h-12 text-red-600" strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Heading */}
                    <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-3">
                        Payment Cancelled
                    </h1>

                    {/* Message */}
                    <p className="text-base sm:text-lg text-center text-gray-700 mb-8 max-w-lg mx-auto">
                        Your payment was cancelled. No money has been charged. You can try again anytime.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                        <Link href="/tenant-dashboard/requests">
                            <Button>Try Again</Button>
                        </Link>

                        <Link href="/tenant-dashboard">
                            <Button variant="outline">Back to Dashboard</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}