'use client'

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PropertiesFilter() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [city, setCity] = useState(searchParams.get("city") || "");
    const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
    const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");

    const applyFilters = () => {
        const params = new URLSearchParams();

        if (city) params.set("city", city);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (category) params.set("category", category);

        router.push(`/properties?${params.toString()}`);
    };

    return (
        <div className="mb-6 grid gap-4 rounded-lg border p-4 md:grid-cols-4">
            <select value={city} onChange={(e) => setCity(e.target.value)} className="rounded border p-2">
                <option value='' >All Locations</option>
                <option value='Dhaka' >Dhaka</option>
                <option value="Gazipur" >Gazipur</option>
                <option value='Barishal' >Barishal</option>
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

            <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded border p-2">
                <option value="">All Property Types</option>
                <option value="Apartment">Apartment</option>
                <option value="House">House</option>
                <option value="Studio">Studio</option>
            </select>
            <button
                onClick={applyFilters}
                className="rounded bg-black px-4 py-2 text-white"
            >
                Apply Filters
            </button>
        </div>
    );
}