import Link from "next/link";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Left Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed top-0 left-0 h-full">
                <div className="flex flex-col h-full">
                    {/* Logo/Brand */}
                    <div className="flex items-center h-16 px-6 border-b border-gray-200">
                        <span className="text-xl font-bold text-gray-900">
                            LandlordPortal
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 space-y-2">
                        <Link
                            href="/landlord-dashboard"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                        >
                            Dashboard
                        </Link>
                        <Link
                            href="/landlord-dashboard/properties"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                        >
                            Properties
                        </Link>
                        <Link
                            href="/landlord-dashboard/requests"
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium text-sm transition-colors"
                        >
                            Rental Requests
                        </Link>
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64">
                <div className="p-6 sm:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}