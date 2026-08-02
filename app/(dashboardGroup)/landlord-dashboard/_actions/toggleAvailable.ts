'use server'

import { revalidatePath } from 'next/cache'
import { updateProperty } from '@/lib/services/propertyService'

export async function toggleAvailabilityAction(formData: FormData) {
    const propertyId = formData.get('propertyId') as string
    const currentStatus = formData.get('currentStatus') === 'true'

    await updateProperty(propertyId, {
        isAvailable: !currentStatus
    })

    // Revalidate the page to show updated data
    revalidatePath('/landlord-dashboard/properties')

    // Don't return anything - just let the action complete
}