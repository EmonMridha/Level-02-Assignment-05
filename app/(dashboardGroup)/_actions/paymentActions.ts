"use server";

import { redirect } from "next/navigation";
import { createCheckoutSession } from "@/lib/services/paymentService";

export const handlePayment = async (formData: FormData) => {
    const requestId = formData.get("requestId") as string; // Getting the request id from the form data

    const result = await createCheckoutSession(requestId);

    if (!result.success) {
        throw new Error(result.message);
    }

    redirect(result.data.checkoutUrl);
};