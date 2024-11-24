import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from 'react-toastify';

import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from '@contexts/auth-context';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Muzica - AI Music Creation for Videos',
	description:
		'Create perfect AI-generated music for your videos with Muzica. Professional quality, customizable music creation tool.',
	metadataBase: new URL('https://www.muzica.live'),
	openGraph: {
		title: 'Muzica - AI Music Creation for Videos',
		description:
			'Create perfect AI-generated music for your videos with Muzica. Professional quality, customizable music creation tool.',
		url: 'https://www.muzica.live',
		siteName: 'Muzica',
		images: [
			{
				url: '/logo.jpg',
				width: 800,
				height: 600,
				alt: 'Muzica - AI Music Creation Platform',
			},
		],
		locale: 'en_US',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Muzica - AI Music Creation for Videos',
		description:
			'Create perfect AI-generated music for your videos with Muzica',
		images: ['/logo.jpg'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
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
					<AuthProvider>
						<div className="relative">
						{children}
							<ToastContainer />
						</div>
					</AuthProvider>
				<Analytics />
			</body>
		</html>
	);
}
