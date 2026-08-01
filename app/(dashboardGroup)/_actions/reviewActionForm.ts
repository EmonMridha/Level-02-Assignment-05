"use server";

import { createReview } from "@/lib/services/reviewService";
import { redirect } from "next/navigation";

export async function submitReview(formData: FormData) {
    const propertyId = formData.get("propertyId") as string;
    const rating = Number(formData.get("rating"));
    const comment = formData.get("comment") as string;

    await createReview({
        propertyId,
        rating,
        comment,
    });

    redirect("/tenant-dashboard/payment/history");
}