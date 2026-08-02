"use server";

import { updateProperty } from "@/lib/services/propertyService";
import { redirect } from "next/navigation";

export async function updatePropertyAction(formData: FormData) {
    const propertyId = formData.get("propertyId") as string;

    const payload = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        address: formData.get("address") as string,
        city: formData.get("city") as string,
        rent: Number(formData.get("rent")),
        bedrooms: Number(formData.get("bedrooms")),
        bathrooms: Number(formData.get("bathrooms")),
        amenities: (formData.get("amenities") as string).split(",").map(a => a.trim()),
        isAvailable: formData.get("isAvailable") === "on",
    };

    await updateProperty(propertyId, payload);

    redirect('/landlord-dashboard/properties?updated=true');
}