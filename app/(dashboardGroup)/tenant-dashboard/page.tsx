// app/tenant-dashboard/page.tsx
import Link from 'next/link';

export default function TenantDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* 1. Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, Trevor 👋
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your rental requests, payments, and reviews.
          </p>
        </div>

        {/* 2. Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Rental Requests
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Pending Requests
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>

          <div className="bg-white rounded-lg shadow p-6 border border-gray-100">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
              Approved Requests
            </h3>
            <p className="text-3xl font-bold text-gray-900 mt-2">0</p>
          </div>
        </div>

        {/* 3. Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Quick Actions
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/tenant-dashboard/requests"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
            >
              View Requests
            </Link>
            <Link
              href="/tenant-dashboard/reviews"
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors"
            >
              Leave Reviews
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-md hover:bg-purple-700 transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}