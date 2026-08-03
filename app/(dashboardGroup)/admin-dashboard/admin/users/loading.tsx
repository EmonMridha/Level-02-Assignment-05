// app/landlord-dashboard/properties/loading.tsx
export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-500">Loading...</p>
            </div>
        </div>
    )
}