import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Only protect /admin routes (except login)
  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    const sessionCookie = request.cookies.get('admin_session')

    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    // Basic validation (detailed validation in API routes)
    try {
      const decoded = Buffer.from(sessionCookie.value, 'base64').toString()
      if (!decoded.startsWith('admin:')) {
        return NextResponse.redirect(new URL('/admin/login', request.url))
      }

      // Check if session is expired (24 hours)
      const parts = decoded.split(':')
      if (parts.length >= 2) {
        const timestamp = parseInt(parts[1])
        const sessionAge = Date.now() - timestamp
        if (sessionAge > 24 * 60 * 60 * 1000) {
          const response = NextResponse.redirect(
            new URL('/admin/login', request.url)
          )
          response.cookies.delete('admin_session')
          return response
        }
      }
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
