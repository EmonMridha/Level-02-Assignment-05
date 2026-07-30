"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, User, Settings, CreditCard, LogOut } from "lucide-react"

import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Team", href: "/team" },
  { label: "Docs", href: "/docs" },
]

const userMenuItems = [
  { label: "Profile", href: "/profile", icon: User },
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Billing", href: "/billing", icon: CreditCard },
  { label: "Settings", href: "/settings", icon: Settings },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-sm font-bold text-primary-foreground">
            RN
          </span>
          <span className="text-lg font-semibold tracking-tight text-foreground">Rent Nest</span>
        </Link>

        {/* Nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                    isActive ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* User dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/diverse-avatars.png" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="flex flex-col gap-1">
                <span className="text-sm font-medium text-foreground">Jane Doe</span>
                <span className="text-xs font-normal text-muted-foreground">jane@acme.com</span>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {userMenuItems.map((item) => {
              const Icon = item.icon
              return (
                <DropdownMenuItem key={item.href} asChild>
                  <Link href={item.href} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                </DropdownMenuItem>
              )
            })}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <button className="flex w-full items-center gap-2 text-destructive hover:text-destructive">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
