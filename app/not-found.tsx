import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-gray-300">404</h1>
                <h2 className="text-2xl font-semibold mt-2">Page not found</h2>
                <p className="text-gray-500 mt-1">The page you are looking for does not exist.</p>
                <Link href="/" className="mt-4 inline-block text-blue-600 hover:underline">
                    Go back home
                </Link>
            </div>
        </div>
    )
}