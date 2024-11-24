import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['dashboard', 'lab', 'projects', 'settings', 'checkout'];
const publicRoutes = ['/', '/login', '/signup', '/trial'];

export default async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.includes(path.split('/')[1]);
    const isPublicRoute = publicRoutes.includes(path);

    const cookie = request.cookies.get('connect.sid')?.value;

    if (!cookie && isProtectedRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    if (cookie && (isProtectedRoute || isPublicRoute)) {
        const isValid = await validateSession(cookie);

        if (!isValid && isProtectedRoute) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        if (isValid && isPublicRoute) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    return NextResponse.next();
}

async function validateSession(cookie: string): Promise<boolean> {
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/auth/me`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Cookie: `connect.sid=${cookie}`,
            },
            credentials: 'include', // Ensures cookies are sent
        });

        if (!response.ok) return false;
        const data = await response.json();
        return data.valid;
    } catch (error) {
        console.error('Session validation failed:', error);
        return false;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/google-auth-success', '/google-auth-fail'],
};
