import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['dashboard', 'lab', 'projects', 'settings', 'checkout'];
const publicRoutes = ['/', '/login', '/signup', '/trial'];

export default async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isProtectedRoute = protectedRoutes.includes(path.split('/')[1]);
	const isPublicRoute = publicRoutes.includes(path);

	const { cookies } = request;

  const sessionCookie = cookies.get('connect.sid');

	if (!sessionCookie && isProtectedRoute) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (sessionCookie && isPublicRoute) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/google-auth-success', '/google-auth-fail'],
};
