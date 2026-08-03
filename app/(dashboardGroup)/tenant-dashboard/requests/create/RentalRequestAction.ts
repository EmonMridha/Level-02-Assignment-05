'use server'

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export async function createRentalRequest(formData: FormData) {
    const propertyId = formData.get('propertyId') as string
    const moveInDate = formData.get('moveInDate') as string
    const message = formData.get('message') as string

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    // Convert to ISO string with time to pass validation
    const moveInDateISO = new Date(moveInDate).toISOString()

    const payload = {
        propertyId,
        moveInDate: moveInDateISO,
        message: message || undefined
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/rentalRequests`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
    })

    if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.message || 'Failed to create request')
    }

    revalidatePath('/tenant-dashboard/requests')
    return { success: true }
}