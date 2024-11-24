'use client';

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

	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		router.push('/dashboard');
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
