export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="h-96 animate-pulse rounded-xl bg-gray-200" />

      <div className="mt-6 space-y-4">
        <div className="h-10 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="h-20 animate-pulse rounded bg-gray-200" />

        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-8 animate-pulse rounded bg-gray-200"
            />
          ))}
        </div>
      </div>
    </div>
  );
}