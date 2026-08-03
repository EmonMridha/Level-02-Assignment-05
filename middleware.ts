import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Public routes that don't require authentication
const publicRoutes = ['/', '/properties']

// Auth routes
const authRoutes = ['/auth/login', '/auth/register']

// Role-based route access
const roleBasedRoutes = {
  TENANT: ['/tenant-dashboard'],
  LANDLORD: ['/landlord-dashboard'],
  ADMIN: ['/admin-dashboard'],
}

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value
  const userRole = request.cookies.get('userRole')?.value
  const { pathname } = request.nextUrl

  // Allow public routes
  if (publicRoutes.some(route => pathname === route || pathname.startsWith('/properties'))) {
    return NextResponse.next()
  }

  // Auth routes - redirect to dashboard if already logged in
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (token) {
      const dashboard = getDashboardByRole(userRole)
      if (dashboard) {
        return NextResponse.redirect(new URL(dashboard, request.url))
      }
    }
    return NextResponse.next()
  }

  // Check if user is authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // Role-based access control
  if (pathname.startsWith('/tenant-dashboard') && userRole !== 'TENANT') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (pathname.startsWith('/landlord-dashboard') && userRole !== 'LANDLORD') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (pathname.startsWith('/admin-dashboard') && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  return NextResponse.next()
}

function getDashboardByRole(role: string | undefined): string | null {
  switch (role) {
    case 'TENANT': return '/tenant-dashboard'
    case 'LANDLORD': return '/landlord-dashboard'
    case 'ADMIN': return '/admin-dashboard'
    default: return null
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}