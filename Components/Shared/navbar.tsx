"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { UserDropdown } from "./UserDropdown";
import { getCurrentUser } from "./userActions";
import { Menu, X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const publicNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
];

const roleBasedNavItems: Record<string, NavItem[]> = {
  TENANT: [
    { label: "Dashboard", href: "/tenant-dashboard" },
    { label: "My Requests", href: "/tenant-dashboard/requests" },
    { label: "Payments", href: "/tenant-dashboard/payment/history" },
  ],
  LANDLORD: [
    { label: "Dashboard", href: "/landlord-dashboard" },
    { label: "My Properties", href: "/landlord-dashboard/properties" },
    { label: "Requests", href: "/landlord-dashboard/requests" },
  ],
  ADMIN: [
    { label: "Dashboard", href: "/admin-dashboard" },
    { label: "Users", href: "/admin-dashboard/admin/users" },
    { label: "Properties", href: "/admin-dashboard/admin/properties" },
    { label: "Requests", href: "/admin-dashboard/admin/rentalRequests" },
  ],
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);  // ✅ Fixed
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getCurrentUser();
      setUser(userData || null);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const userRole = user?.role || null;
  const navItems = userRole
    ? [...publicNavItems, ...roleBasedNavItems[userRole]]
    : publicNavItems;

  if (loading) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
              RN
            </span>
            <span className="text-lg font-semibold tracking-tight">Rent Nest</span>
          </div>
          <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            RN
          </span>
          <span className="text-lg font-semibold tracking-tight">Rent Nest</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side: UserDropdown + Mobile Menu Button */}
        <div className="flex items-center gap-2">
          <UserDropdown user={user} />

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}