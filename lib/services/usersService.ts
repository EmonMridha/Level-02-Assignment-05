import { cookies } from "next/headers"

export const getAllUsers = async () => {
    const cookieStore = await cookies();// license to access the cookies in browser
    const accessToken = cookieStore.get('accessToken')?.value; // getting the accessToken from the cookies in the browser

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/users`, {
        cache: 'no-store',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    })
    return res.json()
}

