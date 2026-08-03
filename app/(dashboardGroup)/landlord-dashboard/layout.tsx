"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { 
    Bars3Icon, 
    XMarkIcon,
    HomeIcon,
    BuildingOfficeIcon,
    ClipboardDocumentListIcon,
    PlusCircleIcon
} from "@heroicons/react/24/outline";

const navLinks = [
    { href: "/landlord-dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/landlord-dashboard/properties", label: "Properties", icon: BuildingOfficeIcon },
    { href: "/landlord-dashboard/requests", label: "Rental Requests", icon: ClipboardDocumentListIcon },
    { href: "/landlord-dashboard/properties/create", label: "Create Property", icon: PlusCircleIcon },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Mobile sidebar backdrop */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-xl
                    transform transition-transform duration-300 ease-in-out
                    lg:relative lg:translate-x-0 lg:shadow-none
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Logo/Brand */}
                    <div className="flex items-center justify-between h-20 px-6 border-b border-gray-100">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                LandlordPortal
                            </h1>
                            <p className="text-xs text-gray-500">Manage your properties</p>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6 text-gray-600" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                        {navLinks.map((link) => {
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-medium text-sm transition-all duration-200 group"
                                >
                                    <Icon className="w-5 h-5 group-hover:text-blue-600" />
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Bottom Section */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
                            <p className="text-sm font-semibold text-gray-800">Need help?</p>
                            <p className="text-xs text-gray-500 mt-1">Contact support 24/7</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <Bars3Icon className="w-6 h-6 text-gray-700" />
                    </button>
                    <span className="ml-3 text-lg font-semibold text-gray-900">
                        LandlordPortal
                    </span>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}