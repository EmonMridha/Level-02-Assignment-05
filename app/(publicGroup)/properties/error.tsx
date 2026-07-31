'use client';

export default function Error({
    error,
    reset,
}: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4">
            <h2 className="text-2xl font-bold">
                Something went wrong!
            </h2>

            <p>{error.message}</p>

            <button
                onClick={reset}
                className="rounded bg-black px-4 py-2 text-white"
            >
                Try Again
            </button>
        </div>
    );
}