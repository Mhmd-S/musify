'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@contexts/auth-context';

import Header from '@components/Header';
import Footer from '@components/Footer';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const router = useRouter();
	const { user, isLoading } = useAuth();

	// Use useEffect to handle navigation
	useEffect(() => {
		if (user && !isLoading) {
			router.push('/dashboard');
		}
	}, [user, isLoading, router]);

	if (user && !isLoading) {
		// While redirecting, prevent rendering the layout
		return null;
	}

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer />
		</>
	);
}
