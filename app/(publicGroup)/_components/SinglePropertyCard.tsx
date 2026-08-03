import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export type OProperty = {
    property: {
        id: string;
        title: string;
        description: string;
        address: string;
        city: string;
        rent: string;
        bedrooms: number;
        bathrooms: number;
        amenities: string[];
        isAvailable: boolean;
        landlordId: string;
        categoryId: string;
        createdAt: string;
        updatedAt: string;

        landlord: {
            id: string;
            name: string;
            email: string;
        };

        category: {
            id: string;
            name: string;
            createdAt: string;
            updatedAt: string;
        };
    };
};

export default function SinglePropertyCard({ property }: OProperty) {
    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border shadow-sm">
            <Image
                src="/images/property.jpg"
                alt={property.title}
                width={800}
                height={500}
                className="h-96 w-full object-cover"
            />

            <div className="space-y-4 p-6">
                <h1 className="text-3xl font-bold">
                    {property.title}
                </h1>

                <p className="text-gray-600">
                    {property.description}
                </p>

                <div className="grid gap-3 md:grid-cols-2">
                    <p>📍 Address: {property.address}</p>
                    <p>🏙️ City: {property.city}</p>
                    <p>💰 Rent: BDT {property.rent}/month</p>
                    <p>🏠 Category: {property.category.name}</p>
                    <p>🛏️ Bedrooms: {property.bedrooms}</p>
                    <p>🚿 Bathrooms: {property.bathrooms}</p>
                </div>

                <div>
                    <h2 className="font-semibold">Amenities</h2>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {property.amenities.map((amenity) => (
                            <span
                                key={amenity}
                                className="rounded bg-gray-100 px-3 py-1"
                            >
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold">Landlord Information</h2>
                    <p>Name: {property.landlord.name}</p>
                    <p>Email: {property.landlord.email}</p>
                </div>

                <p>
                    Status:{" "}
                    {property.isAvailable ? "✅ Available" : "❌ Not Available"}
                </p>

                <Link href={`/tenant-dashboard/requests/create?propertyId=${property.id}`}>
                    <Button className="w-full">
                        Request to Rent
                    </Button>
                </Link>
            </div>
        </div>
    );
}