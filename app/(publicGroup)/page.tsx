// app/(publicGroup)/page.tsx
export interface IProperty {
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
  images: {
    id: string;
    url: string;
    publicId: string | null;
    altText: string | null;
    order: number;
    isPrimary: boolean;
    propertyId: string;
    createdAt: string;
  }[];
  landlord: {
    name: string;
    email: string;
  };
  category: {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
}

import Hero from "./_components/Hero";
import { getProperties } from "@/lib/services/propertyService";
import PropertyCard from "./_components/PropertyCard";

export default async function Home() {
  const res = await getProperties();

  const properties = res.data;

  return (
    <div>

      <Hero />

      <section
        aria-labelledby="properties-heading"
        className="mx-auto max-w-7xl px-6 py-10"
      >
        <h2
          id="properties-heading"
          className="mb-6 text-2xl font-bold text-slate-900"
        >
          Available Properties
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {properties.map((property: IProperty) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </section>
    </div>
  );
}