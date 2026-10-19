
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IProperty } from "../properties/page";
import PropertyGallery from "@/components/Property-Gallery";


export default function SinglePropertyCard({ property }: { property: IProperty }) {
    return (
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <PropertyGallery images={property.images ?? []} />

            <div className="space-y-6 p-5 sm:p-6">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                    {property.title}
                </h1>

                <p className="text-base leading-7 text-slate-600">
                    {property.description}
                </p>

                <div className="grid gap-3 rounded-xl bg-slate-50 p-4 sm:grid-cols-2">
                    <p className="text-sm text-slate-700">📍 Address: {property.address}</p>
                    <p className="text-sm text-slate-700">🏙️ City: {property.city}</p>
                    <p className="text-sm text-slate-700">💰 Rent: BDT {property.rent}/month</p>
                    <p className="text-sm text-slate-700">🏠 Category: {property.category.name}</p>
                    <p className="text-sm text-slate-700">🛏️ Bedrooms: {property.bedrooms}</p>
                    <p className="text-sm text-slate-700">🚿 Bathrooms: {property.bathrooms}</p>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">Amenities</h2>

                    <div className="mt-2 flex flex-wrap gap-2">
                        {property.amenities.map((amenity) => (
                            <span
                                key={amenity}
                                className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
                            >
                                {amenity}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        Landlord Information
                    </h2>
                    <p>Name: {property.landlord.name}</p>
                    <p>Email: {property.landlord.email}</p>
                </div>

                <p>
                    Status:{" "}
                    {property.isAvailable ? "✅ Available" : "❌ Not Available"}
                </p>

                <Link href={`/tenant-dashboard/requests/create?propertyId=${property.id}`}>
                    <Button
                        className="w-full bg-slate-900 text-white hover:bg-slate-800 focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                        Request to Rent
                    </Button>
                </Link>
            </div>
        </div>
    );
}