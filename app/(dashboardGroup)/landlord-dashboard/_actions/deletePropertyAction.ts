"use server";

import { deleteProperty } from "@/lib/services/propertyService";
import { redirect } from "next/navigation";

export async function deletePropertyAction(formData: FormData) {
    const propertyId = formData.get("propertyId") as string;

    await deleteProperty(propertyId); // your frontend service

    redirect("/landlord-dashboard/properties?deleted=true");
}