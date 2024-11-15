'use client';

import { useAuth } from '@contexts/auth-context';
import Image from 'next/image';
import Link from 'next/link';
import Spinner from '@components/Spinner';
import {
	Home,
	TestTube2,
	FolderArchive,
	LogOut,
	User,
	CreditCard,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import { Button } from '@components/ui/button';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
} from '@components/ui/sidebar';
import useResponsive from '@hooks/useResponsive';

// Menu items.
const items = [
	{
		title: 'Dashboard',
		url: '/dashboard',
		icon: Home,
	},
	{
		title: 'Lab',
		url: '/lab',
		icon: TestTube2,
	},
	{
		title: 'Projects',
		url: '/projects',
		icon: FolderArchive,
	},
	{
		title: 'Account',
		url: '/account',
		icon: User,
	},
];

export function AppSidebar() {
	const { user, isLoading, logout } = useAuth();
	const { isMobile } = useResponsive();

	return (
		<Sidebar
			side={isMobile ? 'right' : 'left'}
			className="border-l border-border"
		>
			<SidebarHeader>
				<div className="flex items-center justify-between p-4">
					<div className="flex items-center space-x-3">
						<Image
							className="rounded-md"
							src="/logo.jpg"
							alt="Muzica"
							width={40}
							height={40}
						/>
						<h1 className="text-xl font-semibold">Muzica</h1>
					</div>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<Link
											href={item.url}
											className="flex items-center py-2 px-4 rounded-md hover:bg-accent transition-colors duration-200"
										>
											<item.icon
												className="mr-3 h-5 w-5"
												aria-hidden="true"
											/>
											<span className="font-medium">
												{item.title}
											</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="border-t p-4 space-y-4">
				<Button
					asChild
					variant="outline"
					className="w-full justify-start"
				>
					<Link href="/pricing">
						<CreditCard className="mr-2 h-4 w-4" />
						Buy Credits
					</Link>
				</Button>
				{isLoading ? (
					<Spinner />
				) : (
					<div className="flex items-center justify-between">
						<div className="flex items-center">
							<Avatar className="h-10 w-10">
								<AvatarFallback>
									{user?.name?.charAt(0) ?? ''}
								</AvatarFallback>
							</Avatar>
							<div className="ml-3">
								<p className="text-sm font-medium">
									{user?.name ?? ''}
								</p>
							</div>
						</div>
						<button
							onClick={logout}
							className="flex items-center justify-center p-1 rounded-md bg-accent hover:bg-accent-foreground hover:text-accent transition-colors duration-200"
							aria-label="Logout"
						>
							<LogOut className="size-4" />
						</button>
					</div>
				)}
			</SidebarFooter>
		</Sidebar>
	);
}
