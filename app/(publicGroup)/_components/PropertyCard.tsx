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
        <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md">
            <Image
                src="/images/property.jpg"
                alt={`Property: ${property.title}`}
                width={500}
                height={300}
                className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="space-y-3 p-5">
                <h2 className="line-clamp-1 text-xl font-bold tracking-tight text-slate-900">
                    {property.title}
                </h2>

                <p className="line-clamp-1 text-sm text-slate-600">
                    <span aria-hidden="true">📍</span> {property.address}
                </p>

                <p className="text-lg font-bold text-slate-900">
                    <span aria-hidden="true">৳</span> {property.rent}
                    <span className="ml-1 text-sm font-normal text-slate-500">
                        /month
                    </span>
                </p>

                <p className="text-sm text-slate-600">
                    <span aria-hidden="true">🏠</span> {property.category.name}
                </p>

                <Link href={`/properties/${property.id}`}>
                    <Button
                        className="w-full bg-slate-900 text-white transition-colors hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                        View Details
                    </Button>
                </Link>
            </div>
        </div>
    );
}