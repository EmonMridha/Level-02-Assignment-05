import { cookies } from "next/headers";

export const createReview = async (reviewData: {
  propertyId: string;
  rating: number;
  comment: string;
}) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/reviews`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    }
  );

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Failed to create review");
  }

  return result;
};