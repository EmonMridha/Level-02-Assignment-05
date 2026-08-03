'use server'

import { cookies } from "next/headers"

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    if (!accessToken) {
        return null
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store'
    })

    if (!res.ok) {
        return null
    }

    const result = await res.json()
    return result.data || null
}

export const logoutAction = async () => {
    const cookieStore = await cookies()
    cookieStore.delete('accessToken')
    cookieStore.delete('refreshToken')
    cookieStore.delete('userRole')
}