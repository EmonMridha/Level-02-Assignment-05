import { cookies } from "next/headers";


export const createCheckoutSession = async (requestId: string) => {
    const cookieStore = await cookies(); // license to access cookies
    const accessToken = cookieStore.get("accessToken")?.value; // getting accessToken from cookies

    // Implement payment logic here
    const res = await fetch(
        `${process.env.BACKEND_API_URL}POST /api/payment/create`,
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

    if (!res.ok) {
        throw new Error("Failed to process payment");
    }

    return res.json();
}