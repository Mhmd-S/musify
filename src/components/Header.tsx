'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Button } from '@components/ui/button';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@components/ui/navigation-menu';

import { X, Menu, MoveRight } from 'lucide-react';

interface NavigationSubItem {
	title: string;
	href: string;
}

interface NavigationItem {
	title: string;
	href?: string;
	description?: string;
	items?: NavigationSubItem[];
}

const Header = () => {
	const navigationItems: NavigationItem[] = [
		{
			title: 'Login',
			href: '/login',
		},
		{
			title: 'Try for free',
			href: '/trial',
		},
		{
			title: 'Sign up',
			href: '/signup',
		},
		{
			title: 'Pricing',
			href: '/pricing',
		},
	];

	const [isOpen, setOpen] = useState(false);

	return (
		<header className="w-full md:w-[95%] px-10 z-40 fixed mx-auto top-0 left-0 md:top-7 md:left-1/2 md:-translate-x-1/2 bg-gray-200 bg-opacity-50 backdrop-blur-md rounded-lg">
			<div className="container relative min-h-20 flex justify-between items-center">
				<div className="flex items-center gap-2">
					<Image
						src="/logo.jpg"
						height={40}
						width={40}
						alt="Logo"
						className="rounded-md"
					/>
					<Link href="/">
						<h2 className="text-xl tracking-tighter font-regular text-primary">
							Muzica
						</h2>
					</Link>
				</div>
				<nav className="hidden lg:block" aria-label="Main navigation">
					<ul className="flex items-center gap-4">
						<li>
							<Button variant="ghost" asChild>
								<Link href="/pricing">Pricing</Link>
							</Button>
						</li>
						<li>
							<Button variant="ghost" asChild>
								<Link href="/signup">Sign up</Link>
							</Button>
						</li>
						<li>
							<Button variant="ghost" asChild>
								<Link href="/login">Login</Link>
							</Button>
						</li>
						<li>
							<Button variant="default" asChild>
								<Link href="/trial">Give it a try!</Link>
							</Button>
						</li>
					</ul>
				</nav>
				<div className="flex w-12 shrink lg:hidden items-end justify-end">
					<Button variant="ghost" onClick={() => setOpen(!isOpen)}>
						{isOpen ? (
							<X className="w-5 h-5" />
						) : (
							<Menu className="w-5 h-5" />
						)}
					</Button>
					{isOpen && (
						<div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg p-4 container gap-8">
							{navigationItems.map((item) => (
								<div key={item.title}>
									<div className="flex flex-col gap-2">
										{item.href ? (
											<Link
												href={item.href}
												className="flex justify-between items-center"
											>
												<span className="text-lg">
													{item.title}
												</span>
												<MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
											</Link>
										) : (
											<p className="text-lg">
												{item.title}
											</p>
										)}
										{item.items &&
											item.items.map(
												(
													subItem: NavigationSubItem
												) => (
													<Link
														key={subItem.title}
														href={subItem.href}
														className="flex justify-between items-center"
													>
														<span className="text-muted-foreground">
															{subItem.title}
														</span>
														<MoveRight className="w-4 h-4 stroke-1" />
													</Link>
												)
											)}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</header>
	);
};

export default Header;
