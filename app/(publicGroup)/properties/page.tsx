import { getProperties } from "@/lib/services/propertyService";
import PropertyCard from "../_components/PropertyCard";
import { IProperty } from "../page";

const Properties = async () => {
  const result = await getProperties();
  const properties = result.data;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        All Properties
      </h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {properties.map((property: IProperty) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default Properties;