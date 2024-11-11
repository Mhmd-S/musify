import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const protectedRoutes = ['dashboard', 'lab', 'projects', 'settings', 'checkout'];
const publicRoutes = ['/', '/login', '/signup', '/trial'];

export default async function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;

	const isProtectedRoute = protectedRoutes.includes(path.split('/')[1]);
	const isPublicRoute = publicRoutes.includes(path);

	const cookie = (await cookies()).get('connect.sid')?.value;

	if (!cookie && isProtectedRoute) {
		return NextResponse.redirect(new URL('/login', request.url));
	}

	if (cookie && isPublicRoute) {
		return NextResponse.redirect(new URL('/dashboard', request.url));
	}

	return NextResponse.next();
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)', '/google-auth-success'],
};
