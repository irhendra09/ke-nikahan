import { NextResponse, type NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secretKey = process.env.JWT_SECRET || "default_super_secret_key_change_me_in_production";
const key = new TextEncoder().encode(secretKey);

export async function middleware(request: NextRequest) {
    const sessionCookie = request.cookies.get('session')?.value
    let user = null

    if (sessionCookie) {
        try {
            const { payload } = await jwtVerify(sessionCookie, key, {
                algorithms: ['HS256'],
            })
            user = payload
        } catch {
            // Token invalid or expired
            user = null
        }
    }

    const { pathname } = request.nextUrl

    // Kalau belum login dan akses dashboard → redirect ke login
    if (!user && pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Kalau sudah login dan akses halaman auth → redirect ke dashboard
    if (user && (pathname === '/login' || pathname === '/register')) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/login',
        '/register',
    ],
}