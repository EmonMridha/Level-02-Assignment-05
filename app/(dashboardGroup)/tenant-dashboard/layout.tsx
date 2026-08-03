"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
    HomeIcon,
    ClipboardDocumentListIcon,
    CreditCardIcon,
    ArrowRightOnRectangleIcon,
    Bars3Icon,
    XMarkIcon
} from "@heroicons/react/24/outline";

const navigation = [
    { name: "Dashboard", href: "/tenant-dashboard", icon: HomeIcon },
    { name: "My Requests", href: "/tenant-dashboard/requests", icon: ClipboardDocumentListIcon },
    { name: "Payments", href: "/tenant-dashboard/payment/history", icon: CreditCardIcon }
];

export default function TenantDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        router.push("/login");
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col h-full
                    transform transition-transform duration-300 ease-in-out
                    lg:relative lg:translate-x-0
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                {/* Logo/Title */}
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-blue-600">RentNest</h1>
                        <p className="text-sm text-gray-500 mt-1">Tenant Portal</p>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                    >
                        <XMarkIcon className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
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

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Top Bar */}
                <header className="bg-white border-b border-gray-200 px-4 sm:px-6 md:px-8 py-3 sm:py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
                        >
                            <Bars3Icon className="w-6 h-6 text-gray-700" />
                        </button>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 truncate">
                            Welcome back, Tenant
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">
                            Tenant ID: #12345
                        </span>
                        <span className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-sm">
                            T
                        </span>
                    </div>
                </header>

                {/* Children Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}