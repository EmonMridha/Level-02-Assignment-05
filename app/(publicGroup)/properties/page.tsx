'use client';

import { useEffect, useState, Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import PropertyCard from "../_components/PropertyCard";
import PropertiesFilter from "../_components/PropertiesFilter";
import { fetchProperties } from './propertyAction';

interface IProperty {
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
}

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<IProperty[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProperties();
        setProperties(data || []);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProperties = useMemo(() => {
    const city = searchParams.get("city") || "";
    const minPrice = searchParams.get("minPrice") || "";
    const maxPrice = searchParams.get("maxPrice") || "";
    const category = searchParams.get("category") || "";
    const amenitiesParams = searchParams.getAll("amenities");

    let filtered = [...properties];

    if (city) {
      filtered = filtered.filter(p =>
        p.city?.toLowerCase() === city.toLowerCase()
      );
    }

    if (minPrice) {
      filtered = filtered.filter(p =>
        Number(p.rent) >= Number(minPrice)
      );
    }

    if (maxPrice) {
      filtered = filtered.filter(p =>
        Number(p.rent) <= Number(maxPrice)
      );
    }

    if (category) {
      filtered = filtered.filter(p =>
        p.category?.name?.toLowerCase() === category.toLowerCase()
      );
    }

    if (amenitiesParams.length > 0) {
      filtered = filtered.filter(p => {
        return amenitiesParams.every(selectedAmenity =>
          p.amenities?.some(pa =>
            pa.toLowerCase() === selectedAmenity.toLowerCase()
          )
        );
      });
    }

    return filtered;
  }, [properties, searchParams]);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-slate-600">
        Loading properties...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Find Your Next Home
          </h1>
          <p className="mt-2 text-slate-600">
            Browse available rental properties and find a place that fits your needs.
          </p>
        </div>

        <PropertiesFilter />

        {filteredProperties.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white px-6 py-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No properties found
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Try changing or removing some of your filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProperties.map((property: IProperty) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[50vh] items-center justify-center text-slate-600">
          Loading properties...
        </div>
      }
    >
      <PropertiesContent />
    </Suspense>
  );
}