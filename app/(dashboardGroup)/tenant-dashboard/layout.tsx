"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    StarIcon,
    CreditCardIcon,
    ArrowRightOnRectangleIcon
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/tenant-dashboard", icon: HomeIcon },
    { name: "My Requests", href: "/tenant-dashboard/requests", icon: ClipboardDocumentListIcon },
    { name: "My Reviews", href: "/tenant-dashboard/reviews", icon: StarIcon },
    { name: "Payments", href: "/tenant-dashboard/payment", icon: CreditCardIcon },
];

export default function TenantDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        // Add your logout logic here
        console.log("Logging out...");
        router.push("/login");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar - fixed width */}
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-full">
                {/* Logo/Title */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-blue-600">RentNest</h1>
                    <p className="text-sm text-gray-500 mt-1">Tenant Portal</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors
                  ${isActive
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-700 hover:bg-gray-100"
                                    }
                `}
                            >
                                <item.icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content - flex-1 */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-8 py-4 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Welcome back, Tenant</h2>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">Tenant ID: #12345</span>
                    </div>
                </header>

                {/* Children Content */}
                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}