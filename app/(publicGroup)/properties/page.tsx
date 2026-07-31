import { getProperties } from "@/lib/services/propertyService";

import { IProperty } from "../page";
import PropertyCard from "../_components/PropertyCard";
import PropertiesFilter from "../_components/PropertiesFilter";
import { SearchParams } from "next/dist/server/request/search-params";

const PropertiesPage = async ({ searchParams }: { searchParams: Promise<SearchParams>; }) => {
  const params = await searchParams;
  const result = await getProperties(params);
  const properties = result.data; // getting all properties

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        All Properties
      </h1>

      <PropertiesFilter />

      {properties.length === 0 ? (
        <p className="text-center text-gray-500">
          No properties found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property: IProperty) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      )}

    </div>
  );
};

export default PropertiesPage;