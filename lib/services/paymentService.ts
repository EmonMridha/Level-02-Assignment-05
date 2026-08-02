import { cookies } from "next/headers";


export const createCheckoutSession = async (requestId: string) => {
    const cookieStore = await cookies(); // license to access cookies
    const accessToken = cookieStore.get("accessToken")?.value; // getting accessToken from cookies

    // Implement payment logic here
    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/payment/create`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                rentalRequestId: requestId
            })
        }
    );

    const result = await res.json();

    if (!result.success) {
        throw new Error(result.message);
    }

    return result;
}


export const confirmPayment = async (sessionId: string) => {
    const cookieStore = await cookies(); // license to access cookies in browser
    const accessToken = cookieStore.get("accessToken")?.value;
    // getting the accessToken from the cookies

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/payment/confirm`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                sessionId,
            }),
        }
    );

    const result = await res.json();

    if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to confirm payment");
    }

    return result;
};

export const getTotalEarnings = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/payment/totalEarnings`,
        {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    const result = await res.json();
    return result;
};

export const getPaymentHistory = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/payment/histories`,
        {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch payment history");
    }

    return res.json();
};