import { IProperty } from '@/app/(publicGroup)/page'
import { Button } from '@/components/ui/button'
import { getPropertiesForLandlord } from '@/lib/services/propertyService'
import Link from 'next/link'
import Image from 'next/image'
import SuccessToast from '../_components/success'
import { deletePropertyAction } from '../_actions/deletePropertyAction'
import { toggleAvailabilityAction } from '../_actions/toggleAvailable'

const LandlordProperties = async ({
  searchParams,
}: {
  searchParams: Promise<{ updated?: string, deleted?: string }>;
}) => {
  const { updated, deleted } = await searchParams;
  const res = await getPropertiesForLandlord()
  const myProperties = res.data

  return (
    <>
      <SuccessToast updated={updated} deleted={deleted} />
      <div className='flex justify-center'>
        <div className="space-y-4 w-full max-w-4xl">
          {myProperties.map((property: IProperty) => (
            <div key={property.id} className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-6">
                {/* Static Image Section */}
                <div className="flex-shrink-0 w-48 h-48 relative">
                  <Image
                    src="/images/property.jpg"
                    alt={property.title}
                    fill
                    className="rounded-lg object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=No+Image'
                    }}
                  />
                </div>

                {/* Property Details */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-800">{property.title}</h3>
                    <span className={`px-2 py-1 text-xs rounded ${
                      property.isAvailable ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {property.isAvailable ? '✓ Available' : '✗ Unavailable'}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm mb-2">{property.description}</p>
                  <p className="text-gray-500 text-sm mb-3">{property.address}, {property.city}</p>

                  <div className="flex gap-4 text-sm">
                    <span className="font-bold text-blue-600">${property.rent}</span>
                    <span className="text-gray-600">{property.bedrooms} beds</span>
                    <span className="text-gray-600">{property.bathrooms} baths</span>
                  </div>

                  {property.amenities.length > 0 && (
                    <div className="mt-3 flex gap-1 flex-wrap">
                      {property.amenities.map((item, i) => (
                        <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 mt-4">
                    <Link href={`/landlord-dashboard/properties/edit?propertyId=${property.id}`}>
                      <Button>Edit</Button>
                    </Link>

                    <form action={deletePropertyAction}>
                      <input type="hidden" name="propertyId" value={property.id} />
                      <Button variant="destructive">Delete</Button>
                    </form>

                    <form action={toggleAvailabilityAction}>
                      <input type="hidden" name="propertyId" value={property.id} />
                      <input type="hidden" name="currentStatus" value={String(property.isAvailable)} />
                      <Button
                        variant={property.isAvailable ? "outline" : "default"}
                        className={property.isAvailable ? "border-amber-500 text-amber-600 hover:bg-amber-50" : "bg-green-600 hover:bg-green-700"}
                      >
                        {property.isAvailable ? "Mark Unavailable" : "Mark Available"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default LandlordProperties