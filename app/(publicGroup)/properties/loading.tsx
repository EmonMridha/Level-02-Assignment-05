export default function Loading() {
    return (
        <div className="mx-auto max-w-7xl p-6">
            <div className="mb-8 h-10 w-60 animate-pulse rounded bg-gray-200" />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="h-80 animate-pulse rounded-xl border border-gray-200 bg-gray-100 shadow-md"
                    />
                ))}
            </div>
        </div>
    );
}