'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { toast } from 'sonner'
import { createRentalRequest } from './RentalRequestAction'

interface FormData {
  propertyId: string
  moveInDate: string
  message: string
}

interface FormErrors {
  propertyId?: string
  moveInDate?: string
  message?: string
}

export default function CreateRequest() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    propertyId: searchParams.get('propertyId') || '',
    moveInDate: '',
    message: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.propertyId || formData.propertyId.trim() === '') {
      newErrors.propertyId = 'Property ID is required'
    }

    if (!formData.moveInDate) {
      newErrors.moveInDate = 'Move-in date is required'
    } else {
      const selectedDate = new Date(formData.moveInDate)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.moveInDate = 'Move-in date cannot be in the past'
      }
    }

    if (formData.message && formData.message.length > 500) {
      newErrors.message = 'Message cannot exceed 500 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validate()) {
      toast.error('Please fix the errors')
      return
    }

    setLoading(true)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append('propertyId', formData.propertyId)
      formDataToSend.append('moveInDate', formData.moveInDate)
      if (formData.message) {
        formDataToSend.append('message', formData.message)
      }

      await createRentalRequest(formDataToSend)
      toast.success('Rental request submitted successfully! 🎉')
      router.push('/tenant-dashboard/requests')
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit request'
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Create Rental Request
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Property ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="propertyId"
                value={formData.propertyId}
                onChange={handleChange}
                readOnly
                placeholder="Enter property ID"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 cursor-not-allowed ${errors.propertyId ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.propertyId && (
                <p className="text-red-500 text-sm mt-1">{errors.propertyId}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Move-in Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.moveInDate ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.moveInDate && (
                <p className="text-red-500 text-sm mt-1">{errors.moveInDate}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Add any additional details about your request..."
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              <div className="flex justify-between">
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
                <p className="text-gray-400 text-sm mt-1 ml-auto">
                  {formData.message.length}/500
                </p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}