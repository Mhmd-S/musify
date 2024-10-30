import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import Header from '@components/Header';
import Footer from '@components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Muzica',
	description: 'Create music for your video that is perfect for you.',
	openGraph: {
		title: 'Muzica',
		description: 'Create AI music for your video that is perfect for you.',
		url: 'https://www.muzica.live',
		siteName: 'Muzica',
		images: [
			{
				url: 'https://www.muzica.live/logo1.jpg', // URL to an image for your site
				width: 800,
				height: 600,
				alt: 'Muzica',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header />
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
}
