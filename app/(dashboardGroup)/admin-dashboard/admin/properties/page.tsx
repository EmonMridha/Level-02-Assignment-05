import { getAllPropertyForAdmin } from '@/lib/services/propertyService'

interface Property {
  id: string
  title: string
  description: string
  address: string
  city: string
  rent: string
  bedrooms: number
  bathrooms: number
  amenities: string[]
  isAvailable: boolean
  landlordId: string
  categoryId: string
  createdAt: string
  updatedAt: string
}

const PropertiesForAdmin = async () => {
  const res = await getAllPropertyForAdmin();
  const properties = res.data || [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {properties.map((property: Property) => (
          <div key={property.id} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-semibold">{property.title}</h2>
            <p className="text-gray-600 text-sm">{property.description}</p>
            <p className="text-gray-500 text-sm">{property.address}, {property.city}</p>
            <p className="text-lg font-bold text-blue-600">${property.rent}</p>
            <div className="flex gap-2 text-sm text-gray-600">
              <span>{property.bedrooms} beds</span>
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">
              {property.amenities.map((item, i) => (
                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-2">
              <span className={`text-sm ${property.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {property.isAvailable ? 'Available' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PropertiesForAdmin