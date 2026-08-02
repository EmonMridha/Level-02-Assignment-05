'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createPropertyAction } from '../../_actions/createPropertyAction'
import { toast } from 'sonner'
import Link from 'next/link'

// Hardcoded categories with real IDs from your backend
const CATEGORIES = [
  { id: 'e931e32b-1048-441b-80b7-e0d65449984d', name: 'Apartment' },
  { id: '4ff6e73e-7fbc-434f-a809-756923b3be49', name: 'Apartment' },
  { id: '8425d904-0b9f-4c62-ade4-142cf71ecbfd', name: 'Condo' },
  { id: 'd04671b6-871d-4649-a487-06a2b7ee7266', name: 'Villa' },
  { id: 'f523789e-fb76-434f-918a-91b0c0c07a92', name: 'Studio' },
]

const CreatePropertyPage = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    rent: '',
    bedrooms: '',
    bathrooms: '',
    amenities: '',
    categoryId: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setErrors({})

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, String(value))
      })

      await createPropertyAction(formDataToSend)
      toast.success('Property created successfully! 🎉')
      router.push('/landlord-dashboard/properties')
    } catch (error: any) {
      try {
        const errorData = JSON.parse(error.message)
        if (errorData.errors) {
          setErrors(errorData.errors)
          toast.error('Please fix the validation errors')
        } else {
          toast.error(errorData.message || 'Failed to create property')
        }
      } catch {
        toast.error(error.message || 'Failed to create property')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Property
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            List Your <span className="text-blue-600">Property</span>
          </h1>
          <p className="text-gray-500 mt-2">Fill in the details to list your property</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <form onSubmit={handleSubmit} className="p-8 space-y-6">

            {/* Basic Information Section */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Property Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g., Beautiful Apartment in Downtown"
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.title ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    required
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your property in detail..."
                    rows="3"
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.description ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none`}
                    required
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Location</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.address ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    required
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="City"
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.city ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    required
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Property Details Section */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Property Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rent ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="rent"
                    value={formData.rent}
                    onChange={handleChange}
                    placeholder="Monthly rent"
                    min="1"
                    step="0.01"
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.rent ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    required
                  />
                  {errors.rent && (
                    <p className="text-red-500 text-sm mt-1">{errors.rent}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bedrooms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="Number of bedrooms"
                    min="1"
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.bedrooms ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    required
                  />
                  {errors.bedrooms && (
                    <p className="text-red-500 text-sm mt-1">{errors.bedrooms}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bathrooms <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="Number of bathrooms"
                    min="1"
                    className={`w-full px-4 py-3 bg-gray-50 border ${errors.bathrooms ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                    required
                  />
                  {errors.bathrooms && (
                    <p className="text-red-500 text-sm mt-1">{errors.bathrooms}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Category Selection - HARDCODED CATEGORY IDs */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Category</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.categoryId ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  required
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId && (
                  <p className="text-red-500 text-sm mt-1">{errors.categoryId}</p>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">Amenities</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amenities <span className="text-red-500">*</span>
                </label>
                <input
                  name="amenities"
                  value={formData.amenities}
                  onChange={handleChange}
                  placeholder="e.g., Pool, Gym, Parking, Wi-Fi (comma separated)"
                  className={`w-full px-4 py-3 bg-gray-50 border ${errors.amenities ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  required
                />
                <p className="text-xs text-gray-400 mt-1">Separate amenities with commas</p>
                {errors.amenities && (
                  <p className="text-red-500 text-sm mt-1">{errors.amenities}</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <span className="flex items-center justify-center gap-2">
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating...
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Create Property
                    </>
                  )}
                </span>
              </button>
              <Link
                href="/landlord-dashboard/properties"
                className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-xl transition-all duration-200 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePropertyPage