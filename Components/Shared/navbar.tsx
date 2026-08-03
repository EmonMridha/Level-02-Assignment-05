import Link from "next/link"
import { UserDropdown } from "./UserDropdown"
import { getCurrentUser } from "./userActions"

interface NavItem {
  label: string
  href: string
}

const publicNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Properties", href: "/properties" },
]

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
}

export default async function Navbar() {
  const userRes = await getCurrentUser()
  console.log('hello', userRes)
  const user = userRes || null  // ✅ userRes is already the user data
  const userRole = user?.role || null

  const navItems = userRole
    ? [...publicNavItems, ...roleBasedNavItems[userRole]]
    : publicNavItems

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            RN
          </span>
          <span className="text-lg font-semibold tracking-tight">Rent Nest</span>
        </Link>

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

        <UserDropdown user={user} />
      </nav>
    </header>
  )
}