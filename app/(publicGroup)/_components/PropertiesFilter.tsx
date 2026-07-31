'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PropertiesFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get("city") || "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");
    const [amenities, setAmenities] = useState<string[]>([]);

    const toggleAmenity = (amenity: string) => {
        setAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((a) => a !== amenity)
                : [...prev, amenity]
        );
    };

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (city) params.set("city", city);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (category) params.set("category", category);

        amenities.forEach((amenity) => {
            params.append("amenities", amenity);
        });

        router.push(`/properties?${params.toString()}`);
    };

    return (
        <div className="mb-6 rounded-lg border p-4">
            <div className="grid gap-4 md:grid-cols-4">
                <select
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="rounded border p-2"
                >
                    <option value="">All Locations</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Gazipur">Gazipur</option>
                    <option value="Barishal">Barishal</option>
                </select>

                <input
                    type="number"
                    placeholder="Min Price"
                    className="rounded border p-2"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    className="rounded border p-2"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                />

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded border p-2"
                >
                    <option value="">All Property Types</option>
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Studio">Studio</option>
                </select>
            </div>

            <div className="mt-4 flex flex-wrap gap-4">
                {["Gym", "Parking", "Swimming Pool", "Security", "Elevator"].map(
                    (amenity) => (
                        <label key={amenity} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={amenities.includes(amenity)}
                                onChange={() => toggleAmenity(amenity)}
                            />
                            {amenity}
                        </label>
                    )
                )}
            </div>

            <button
                onClick={applyFilters}
                className="mt-4 rounded bg-black px-4 py-2 text-white"
            >
                Apply Filters
            </button>
        </div>
    );
}