'use client'

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-red-600">Something went wrong!</h1>
                <p className="text-gray-600 mt-2">{error.message}</p>
                <button onClick={reset} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                    Try again
                </button>
            </div>
        </div>
    )
}