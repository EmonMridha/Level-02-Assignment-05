import Link from 'next/link'
import {
    LayoutDashboard,
    Users,
    Building,
    List,
    LogOut
} from 'lucide-react'

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">Admin Panel</h2>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-1">
                    <Link
                        href="/admin-dashboard"
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>

                    <Link
                        href="/admin-dashboard/admin/users"
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <Users className="w-4 h-4" />
                        Users
                    </Link>

                    <Link
                        href="/admin-dashboard/admin/properties"
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <Building className="w-4 h-4" />
                        Properties
                    </Link>

                    <Link
                        href="/admin-dashboard/admin/rentalRequests"
                        className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                    >
                        <List className="w-4 h-4" />
                        Rental Requests
                    </Link>
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-200">
                    <Link
                        href="/auth/logout"
                        className="flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top Navbar */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}