'use client'

import Link from "next/link"
import { useRouter } from "next/navigation"
import { LayoutDashboard, User, Settings, LogOut } from "lucide-react"
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
import { logoutAction } from "./userActions"

interface User {
    id: string
    name: string
    email: string
    role: string
}

export function UserDropdown({ user }: { user: User | null }) {
    const router = useRouter()

    const handleLogout = async () => {
        await logoutAction()
        router.push('/auth/login')
    }

    const getDashboardLink = (role: string) => {
        switch (role) {
            case 'TENANT': return '/tenant-dashboard'
            case 'LANDLORD': return '/landlord-dashboard'
            case 'ADMIN': return '/admin-dashboard'
            default: return '/'
        }
    }

    const getUserMenuItems = (role: string) => {
        const baseItems = [
            { label: "Dashboard", href: getDashboardLink(role), icon: LayoutDashboard },
            { label: "Profile", href: "/profile", icon: User },
            { label: "Settings", href: "/settings", icon: Settings },
        ]
        return baseItems
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage src="" alt="User avatar" />
                    <AvatarFallback>{user?.name?.[0] || 'U'}</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuGroup>
                    <DropdownMenuLabel className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-foreground">{user?.name || 'Guest'}</span>
                        <span className="text-xs font-normal text-muted-foreground">{user?.email || ''}</span>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {user && getUserMenuItems(user.role).map((item) => {
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
                {user && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 cursor-pointer">
                            <LogOut className="h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </>
                )}
                {!user && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/auth/login">Login</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/auth/register">Register</Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}