import { getToken } from 'next-auth/jwt'
import { withAuth, type NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  async function middleware(req: NextRequestWithAuth) {
    const token = await getToken({ req })
    const isAuthenticated = !!token

    if (!isAuthenticated && req.nextUrl.pathname.startsWith('/leaderboards')) {
      return NextResponse.redirect(new URL('/home', req.nextUrl))
    }

    if (
      isAuthenticated &&
      (req.nextUrl.pathname.startsWith('/login') ||
        req.nextUrl.pathname.startsWith('/register'))
    ) {
      return NextResponse.redirect(new URL('/home', req.nextUrl))
    }
  },
  { callbacks: { authorized: () => true } }
)

export const config = {
  matcher: ['/login/:path*', '/register/:path*', '/leaderboards/:path*'],
}
