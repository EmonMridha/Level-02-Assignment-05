import { Button } from "@/components/ui/button";
import Image from "next/image";
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
            name: string;
            email: string;
        };

        category: {
            id: string,
            name: string,
            createdAt: string,
            updatedAt: string
        }
    };
}

export default function PropertyCard({ property }: OProperty) {
    return (
        <div className="overflow-hidden rounded-xl border shadow-sm">
            <Image
                src="/house-placeholder.jpg"
                alt={property.title}
                width={500}
                height={300}
                className="h-56 w-full object-cover"
            />

            <div className="space-y-2 p-4">
                <h2 className="text-xl font-semibold">{property.title}</h2>

                <p>📍 {property.address}</p>

                <p>💰 BDT {property.rent}/month</p>

                <p>🏠 {property.category.name}</p>

                <Link href={`/properties/${property.id}`}>
                    <Button className="w-full">
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}