'use server'

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createRentalRequest(formData: FormData) {
    const propertyId = formData.get('propertyId') as string
    const moveInDate = formData.get('moveInDate') as string
    const message = formData.get('message') as string

    const cookieStore = await cookies()
    const accessToken = cookieStore.get('accessToken')?.value

    const payload = {
        propertyId,
        moveInDate: new Date(moveInDate).toISOString(),
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

    const data = await res.json()
    const requestId = data.data.id

    revalidatePath('/tenant-dashboard/requests')
    redirect(`/tenant-dashboard/requests/${requestId}`)
}