import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/', '/properties']
const authRoutes = ['/auth/login', '/auth/register']

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const userRole = request.cookies.get('userRole')?.value
  const { pathname } = request.nextUrl

  // Public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith('/properties'))) {
    return NextResponse.next()
  }

  // Auth routes
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      const dashboard = getDashboardByRole(userRole)
      if (dashboard) return NextResponse.redirect(new URL(dashboard, request.url))
    }
    return NextResponse.next()
  }

  // Protect dashboards - role-dashboard pattern
  if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  if (pathname.startsWith('/landlord-dashboard') && userRole !== 'LANDLORD') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
  if (pathname.startsWith('/tenant-dashboard') && userRole !== 'TENANT') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Check authentication for all other protected routes
  if (!token && !publicRoutes.some(route => pathname === route) && !authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

function getDashboardByRole(role: string | undefined): string | null {
  switch (role?.toUpperCase()) {
    case 'TENANT': return '/tenant-dashboard'
    case 'LANDLORD': return '/landlord-dashboard'
    case 'ADMIN': return '/admin-dashboard'
    default: return null
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
}