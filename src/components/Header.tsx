'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'

import { Button } from '@components/ui/button';

import { X, Menu, MoveRight } from 'lucide-react';

interface NavigationSubItem {
  title: string;
  href: string;
}

interface NavigationItem {
  title: string;
  href?: string;
  items?: NavigationSubItem[];
}

const Header = () => {

  const navigationItems: NavigationItem[] = [
		{
			title: 'Login',
			href: '/login',
		},
		{
			title: 'Sign up',
			href: '/signup',
		},
    // {
    // 	title: 'Product',
    // 	description: 'Managing a small business today is already tough.',
    // 	items: [
    // 		{
    // 			title: 'Reports',
    // 			href: '/reports',
    // 		},
    // 		{
    // 			title: 'Statistics',
    // 			href: '/statistics',
    // 		},
    // 		{
    // 			title: 'Dashboards',
    // 			href: '/dashboards',
    // 		},
    // 		{
    // 			title: 'Recordings',
    // 			href: '/recordings',
    // 		},
    // 	],
    // },
    // {
    // 	title: 'Company',
    // 	description: 'Managing a small business today is already tough.',
    // 	items: [
    // 		{
    // 			title: 'About us',
    // 			href: '/about',
    // 		},
    // 		{
    // 			title: 'Fundraising',
    // 			href: '/fundraising',
    // 		},
    // 		{
    // 			title: 'Investors',
    // 			href: '/investors',
    // 		},
    // 		{
    // 			title: 'Contact us',
    // 			href: '/contact',
    // 		},
    // 	],
    // },
  ];


  const [isOpen, setOpen] = useState(false);

  return (
    <header className="w-full md:w-[95%] ml-4 px-10 z-40 fixed mx-auto top-0 left-0 md:top-7 md:left-1/2 md:-translate-x-1/2 bg-gray-200 bg-opacity-50 backdrop-blur-md rounded-lg">
      <div className="container relative min-h-20 flex justify-between items-center">
        {/* <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
					<NavigationMenu className="flex justify-start items-start">
						<NavigationMenuList className="flex justify-start gap-4 flex-row">
							{navigationItems.map((item) => (
								<NavigationMenuItem key={item.title}>
									{item.href ? (
										<>
											<NavigationMenuLink>
												<Button variant="ghost">
													{item.title}
												</Button>
											</NavigationMenuLink>
										</>
									) : (
										<>
											<NavigationMenuTrigger className="font-medium text-sm">
												{item.title}
											</NavigationMenuTrigger>
											<NavigationMenuContent className="!w-[450px] p-4">
												<div className="flex flex-col lg:grid grid-cols-2 gap-4">
													<div className="flex flex-col h-full justify-between">
														<div className="flex flex-col">
															<p className="text-base">
																{item.title}
															</p>
															<p className="text-muted-foreground text-sm">
																{
																	item.description
																}
															</p>
														</div>
														<Button
															size="sm"
															className="mt-10"
														>
															Book a call today
														</Button>
													</div>
													<div className="flex flex-col text-sm h-full justify-end">
														{item.items?.map(
															(subItem) => (
																<NavigationMenuLink
																	href={
																		subItem.href
																	}
																	key={
																		subItem.title
																	}
																	className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
																>
																	<span>
																		{
																			subItem.title
																		}
																	</span>
																	<MoveRight className="w-4 h-4 text-muted-foreground" />
																</NavigationMenuLink>
															))
														)}
													</div>
												</div>
											</NavigationMenuContent>
										</>
									)}
								</NavigationMenuItem>
							))}
						</NavigationMenuList>
					</NavigationMenu>
				</div> */}
        <div className="flex items-center gap-2">
          <Image src='/logo.png' height={40} width={40} alt="Logo" className="rounded-md" />
          <Link href="/">
            <h2 className="text-xl tracking-tighter font-regular text-primary">Muzica</h2>
          </Link>
        </div>

				<div className="hidden md:flex items-center gap-2">
					<Button variant="default">
						<Link href="/login">Login</Link>
					</Button>
					<Button variant="outline">
						<Link href="/signup">Sign up</Link>
					</Button>
				</div>

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
											item.items.map((subItem: NavigationSubItem) => (
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
											))}
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
