import { cookies } from "next/headers";

export interface UpdatePropertyPayload {
    title?: string;
    description?: string;
    address?: string;
    city?: string;
    rent?: number;
    bedrooms?: number;
    bathrooms?: number;
    amenities?: string[];
    isAvailable?: boolean;
    categoryId?: string;
}

export interface CreatePropertyPayLoad {
    title: string
    description: string
    address: string
    city: string
    rent: number
    bedrooms: number
    bathrooms: number
    amenities: string[]
    categoryId: string
    isAvailable?: boolean // Make it optional
    images?: string[] // Also make images optional if needed
}

export const createProperty = async (payload: CreatePropertyPayLoad) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    console.log("🔍 Sending payload:", JSON.stringify(payload, null, 2));

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });

    if (!res.ok) {
        let errorMessage = "Failed to create property";
        try {
            const errorData = await res.json();
            console.log("❌ Backend Error:", errorData);
            errorMessage = errorData.message || errorData.error || JSON.stringify(errorData);
        } catch (e) {
            console.error("❌ Error parsing backend response:", e);
        }
        throw new Error(errorMessage);
    }

    return res.json();
}

export const getProperties = async (query?: {
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    category?: string;
}) => {
    const params = new URLSearchParams();
    if (query?.city) params.set("city", query.city);
    if (query?.minPrice) params.set("minPrice", query.minPrice);
    if (query?.maxPrice) params.set("maxPrice", query.maxPrice);
    if (query?.category) params.set("category", query.category);
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties?${params.toString()}`, {
        cache: "no-store"
    });

    const result = await res.json();
    return result
};

// landlord properties
export const getPropertiesForLandlord = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/properties/myProperties`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const result = await res.json();
    return result;
}

// landlord 
export const updateProperty = async (
    propertyId: string,
    payload: UpdatePropertyPayload
) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties/${propertyId}`,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        }
    );

    if (!res.ok) {
        throw new Error("Failed to update property");
    }

    return res.json();
};

export const deleteProperty = async (propertyId: string) => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties/${propertyId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    return res.json();
}

// admin
export const getAllPropertyForAdmin = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/admin/properties`, {
        cache: "no-store",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    const result = await res.json();
    return result;
}