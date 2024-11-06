'use client';

import { useAuth } from '@contexts/auth-context';
import { SidebarProvider, SidebarTrigger } from '@components/ui/sidebar';
import { AppSidebar } from '@components/app-sidebar';

import Spinner from '@components/Spinner';

export default function Layout({ children }: { children: React.ReactNode }) {
	const { isLoading } = useAuth();
	return (
		<SidebarProvider>
			{isLoading ? (
				<div className="w-screen h-screen flex items-center justify-center min-h-screen">
					<Spinner />
				</div>
			) : (
				<>
					<AppSidebar />
					<main className="w-full">
						<SidebarTrigger />
						{children}
					</main>
				</>
			)}
		</SidebarProvider>
	);
}
