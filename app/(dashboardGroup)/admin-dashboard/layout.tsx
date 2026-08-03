"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Users,
    Building,
    List,
    LogOut,
    Menu,
    X,
    ShieldCheck
} from "lucide-react";

const navLinks = [
    { href: "/admin-dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin-dashboard/admin/users", label: "Users", icon: Users },
    { href: "/admin-dashboard/admin/properties", label: "Properties", icon: Building },
    { href: "/admin-dashboard/admin/rentalRequests", label: "Rental Requests", icon: List },
];

export default function AdminDashboardLayout({
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
            {/* Mobile backdrop */}
            {sidebarOpen && isMobile && (
                <div
                    className="fixed inset-0 z-40 bg-black/50"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-2xl
                    transform transition-transform duration-300 ease-in-out
                    lg:relative lg:translate-x-0 lg:shadow-none
                    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                `}
            >
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                                <ShieldCheck className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-800">Admin Panel</h2>
                                <p className="text-xs text-gray-500">Manage platform</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
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

                    {/* Logout Button */}
                    <div className="p-4 border-t border-gray-100">
                        <Link
                            href="/auth/logout"
                            className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm transition-all duration-200 group"
                        >
                            <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navbar */}
                <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <Menu className="w-5 h-5 text-gray-700" />
                        </button>
                        <h1 className="text-lg sm:text-xl font-semibold text-gray-800">
                            Admin Dashboard
                        </h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-xs sm:text-sm text-gray-500 hidden sm:inline">
                            Welcome, Admin
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                            A
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}