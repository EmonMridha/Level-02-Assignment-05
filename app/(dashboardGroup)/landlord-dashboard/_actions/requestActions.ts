'use server'

import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function approveRequest(formData: FormData) {
    const requestId = formData.get("requestId")
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentalRequests/${requestId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "APPROVED" })
        }
    )

    if (!res.ok) {
        throw new Error("Failed to approve request")
    }

    revalidatePath("/landlord-dashboard/requests")
    return { success: true }
}

export async function rejectRequest(formData: FormData) {
    const requestId = formData.get("requestId")
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/rentalRequests/${requestId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status: "REJECTED" })
        }
    )

    if (!res.ok) {
        throw new Error("Failed to reject request")
    }

    revalidatePath("/landlord-dashboard/requests")
    return { success: true }
}