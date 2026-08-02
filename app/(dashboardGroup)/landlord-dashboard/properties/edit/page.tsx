import { getPropertyById } from '@/lib/services/getPropertyById'
import { Button } from '@/components/ui/button';
import { updatePropertyAction } from '../../_actions/updatePropertyAction';

const EditProperties = async ({ searchParams }: { searchParams: Promise<{ propertyId: string }> }) => {

  const { propertyId } = await searchParams

  const res = await getPropertyById(propertyId);
  const property = res.data
  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6">
          Update Property
        </h1>

        <form action={updatePropertyAction} className="space-y-4">

          <input type="hidden" name="propertyId" value={property.id} />

          <input
            name="title"
            defaultValue={property.title}
            placeholder="Title"
            className="border p-2 w-full"
          />

          <textarea
            name="description"
            defaultValue={property.description}
            className="border p-2 w-full"
          />

          <input
            name="address"
            defaultValue={property.address}
            className="border p-2 w-full"
          />

          <input
            name="city"
            defaultValue={property.city}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="rent"
            defaultValue={property.rent}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="bedrooms"
            defaultValue={property.bedrooms}
            className="border p-2 w-full"
          />

          <input
            type="number"
            name="bathrooms"
            defaultValue={property.bathrooms}
            className="border p-2 w-full"
          />

          <input
            name="amenities"
            defaultValue={property.amenities.join(", ")}
            className="border p-2 w-full"
          />

          <label>
            <input
              type="checkbox"
              name="isAvailable"
              defaultChecked={property.isAvailable}
            />
            Available
          </label>

          <div>
            <Button type="submit">
              Update Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProperties