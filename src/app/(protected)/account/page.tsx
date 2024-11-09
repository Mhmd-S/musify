'use client';

import { useAuth } from '@contexts/auth-context';

import Link from 'next/link';
import { useState } from 'react';
import { CreditCard, Download, User, Mail, Coins } from 'lucide-react';
import { Button } from '@components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@components/ui/avatar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@components/ui/table';
import { Badge } from '@components/ui/badge';

import Spinner from '@components/Spinner';

interface Invoice {
	id: string;
	date: string;
	amount: number;
}

interface User {
	name: string;
	email: string;
	credits: number;
}

export default function AccountPage() {
	const { user, isLoading } = useAuth();

	const [invoices, setInvoices] = useState<Invoice[]>([]);

	return (
		<div className="container mx-auto p-6 space-y-8">
			<h1 className="text-3xl font-bold">Account</h1>

			<div className="grid gap-6 md:grid-cols-2">
				{isLoading ? (
					<Spinner />
				) : (
					<>
						<Card>
							<CardHeader>
								<CardTitle>User Information</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center space-x-4">
									<Avatar>
										<AvatarImage
											src={user.avatarUrl}
											alt={user.name}
										/>
										<AvatarFallback>
											{user.name.charAt(0)}
										</AvatarFallback>
									</Avatar>
									<div>
										<p className="text-lg font-medium">
											{user.name}
										</p>
										<p className="text-sm text-muted-foreground">
											{user.email}
										</p>
									</div>
								</div>
								<div className="flex items-center space-x-2">
									<User className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">
										Name:
									</span>
									<span>{user.name}</span>
								</div>
								<div className="flex items-center space-x-2">
									<Mail className="h-4 w-4 text-muted-foreground" />
									<span className="text-sm text-muted-foreground">
										Email:
									</span>
									<span>{user.email}</span>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Account Credits</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center space-x-2">
										<Coins className="h-6 w-6 text-yellow-500" />
										<span className="text-2xl font-bold">
											{user.credits}
										</span>
									</div>
									<Link href="products">
										<Button>Buy More Credits</Button>
									</Link>
								</div>
								<p className="text-sm text-muted-foreground">
									Credits are used for generating music. Each
									credit allows you to create one minute of
									music.
								</p>
							</CardContent>
						</Card>
					</>
				)}
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Billing</CardTitle>
					<CardDescription>View your invoices</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Invoice</TableHead>
								<TableHead>Date</TableHead>
								<TableHead>Amount</TableHead>
								<TableHead className="text-right">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{invoices.map((invoice) => (
								<TableRow key={invoice.id}>
									<TableCell>{invoice.id}</TableCell>
									<TableCell>{invoice.date}</TableCell>
									<TableCell>
										${invoice.amount.toFixed(2)}
									</TableCell>
									<TableCell className="text-right">
										<Button variant="ghost" size="sm">
											<Download className="mr-2 h-4 w-4" />
											Download
										</Button>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter>
					<p className="text-sm text-muted-foreground">
						For any billing inquiries, please contact our support
						team.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
