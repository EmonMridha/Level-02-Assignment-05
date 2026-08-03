// app/(publicGroup)/page.tsx
export type IProperty = {
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
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

import Hero from "./_components/Hero";
import { getProperties } from "@/lib/services/propertyService";
import PropertyCard from "./_components/PropertyCard";

export default async function Home() {
  const res = await getProperties();

  const properties = res.data;

  return (
    <div>
      <Hero />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property: IProperty) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </div>
  );
}