'use client';

import { useAuth } from '@contexts/auth-context';

import Image from 'next/image';


import { Home, TestTube2,FolderArchive, LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarFooter,
} from '@components/ui/sidebar';

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
	const { user, logout } = useAuth();

	return (
		<Sidebar>
			<SidebarHeader>
				<div className="flex items-center space-x-4 p-4">
					<Image
						className="rounded-md"
						src="/logo.jpg"
						alt="Muzica"
						width={40}
						height={40}
					/>

					<h1 className="text-xl">Muzica</h1>
				</div>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<a
											href={item.url}
											className="flex items-center"
										>
											<item.icon
												className="mr-2 h-4 w-4"
												aria-hidden="true"
											/>
											<span>{item.title}</span>
										</a>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="border-t p-4">
				<div className="grid grid-cols-[auto_1fr_auto] items-center">
					<Avatar className="size-9">
						<AvatarImage src={''} alt={user?.name ?? ''} />
						<AvatarFallback>{user?.name?.charAt(0) ?? ''}</AvatarFallback>
					</Avatar>
					<div className="pl-4">
						<p className="text-sm font-medium">{user?.name ?? ''}</p>
					</div>
					<LogOut
						className="h-fit p-1 cursor-pointer text-muted-foreground rounded-md hover:bg-red-500 hover:text-white "
						onClick={logout}
					/>
				</div>
			</SidebarFooter>
		</Sidebar>
	);
}