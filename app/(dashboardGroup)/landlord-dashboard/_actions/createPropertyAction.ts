'use server'

import { revalidatePath } from 'next/cache'
import { createProperty } from '@/lib/services/propertyService'
import { z } from 'zod'

// Schema matching your backend exactly
const propertySchema = z.object({
    title: z.string()
        .min(1, 'Title is required')
        .max(255, 'Title must be less than 255 characters'),
    description: z.string()
        .min(1, 'Description is required'),
    address: z.string()
        .min(1, 'Address is required'),
    city: z.string()
        .min(1, 'City is required'),
    rent: z.number()
        .positive('Rent must be greater than 0'),
    bedrooms: z.number()
        .int()
        .min(1, 'Bedrooms must be at least 1'),
    bathrooms: z.number()
        .int()
        .min(1, 'Bathrooms must be at least 1'),
    amenities: z.array(z.string())
        .min(1, 'At least one amenity is required')
        .refine(
            (amenities) => amenities.every(a => a.trim() !== ''),
            'Amenities cannot contain empty values'
        ),
    categoryId: z.string()
        .min(1, 'Category is required'),
})

export async function createPropertyAction(formData: FormData) {
    const rawData = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        rent: formData.get('rent') ? parseFloat(formData.get('rent') as string) : 0,
        bedrooms: formData.get('bedrooms') ? parseInt(formData.get('bedrooms') as string) : 0,
        bathrooms: formData.get('bathrooms') ? parseInt(formData.get('bathrooms') as string) : 0,
        amenities: (formData.get('amenities') as string)
            ? (formData.get('amenities') as string).split(',').map(item => item.trim()).filter(Boolean)
            : [],
        categoryId: formData.get('categoryId') as string,
    }

    try {
        const validatedData = propertySchema.parse(rawData)

        const backendData = {
            title: validatedData.title,
            description: validatedData.description,
            address: validatedData.address,
            city: validatedData.city,
            rent: validatedData.rent,
            bedrooms: validatedData.bedrooms,
            bathrooms: validatedData.bathrooms,
            amenities: validatedData.amenities,
            categoryId: validatedData.categoryId,
            isAvailable: true,
        }
        await createProperty(backendData)

        revalidatePath('/landlord-dashboard/properties')
        return { success: true, message: 'Property created successfully!' }
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.issues.reduce<Record<string, string>>(
                (acc, issue) => {
                    const path = issue.path.join('.')
                    acc[path] = issue.message
                    return acc
                },
                {}
            )
            throw new Error(JSON.stringify({
                message: 'Validation failed',
                errors: formattedErrors
            }))
        }
        throw error
    }
}