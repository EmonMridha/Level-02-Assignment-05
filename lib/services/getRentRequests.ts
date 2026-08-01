import { cookies } from "next/headers"

export const getMyRentalRequests = async () => {
    const cookieStore = await cookies();// license to access the cookies form browser

    const accessToken = cookieStore.get('accessToken')?.value; // getting the accessToken from the cookies in the browser

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentalRequests/myRequests`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })

    return res.json()
}

export const getRentalRequestById = async (requestId: string) => {
    const cookieStore = await cookies();// license to access the cookies form browser

    const accessToken = cookieStore.get('accessToken')?.value; // getting the accessToken from the cookies in the browser

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentalRequests/myRequests/${requestId}`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    return res.json()
}

// for landlord
export const getRentalRequestsForLandlord = async () => {
    const cookieStore = await cookies();// license to access the cookies form browser
    const accessToken = cookieStore.get('accessToken')?.value; // getting the accessToken from the cookies in the browser

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentalRequests`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    return res.json()
}