import { cookies } from "next/headers";

export const getPropertyById = async (id: string) => {
    const cookieStore = await cookies(); // license to access cookies
    const accessToken = cookieStore.get("accessToken")?.value; // getting accessToken from cookies

    const res = await fetch(
        `${process.env.BACKEND_API_URL}/api/properties/${id}`,
        {
            cache: "no-store",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch property");
    }

    return res.json();
};