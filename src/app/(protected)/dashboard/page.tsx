'use client';

import { useState, useEffect, useMemo } from 'react';

import Link from 'next/link';

import { Music, User, Loader2, Plus, Coins, Book } from 'lucide-react';

import { Button } from '@components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@components/ui/card';
import PromptPreview from '@components/PromptPreview';

import { getUserPrompts } from '@services/promptService';

import { useAuth } from '@contexts/auth-context';

import { MusicGenerationData, UserPrompts } from '@services/types';

interface PromptMetrics {
	totalMinutes: number;
	monthlyPrompts: number;
}

const ClientMusicGenerationDashboard = () => {
	const { isLoading, user } = useAuth();

	const [loading, setLoading] = useState(true);
	const [id, setId] = useState<string>('');
	const [metrics, setMetrics] = useState<PromptMetrics>({
		totalMinutes: 0,
		monthlyPrompts: 0,
	});

	useEffect(() => {
		const fetchMonthlyPrompts = async () => {
			if (!user) {
				setLoading(false);
				return;
			}

			try {
				const now = new Date();
				const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
				const lastDay = new Date(
					now.getFullYear(),
					now.getMonth() + 1,
					0
				);

				const response = await getUserPrompts({
					filters: {
						createdAt: {
							$gte: firstDay.toISOString(),
							$lte: lastDay.toISOString(),
						},
					},
					sortBy: 'createdAt',
					sortOrder: 'desc',
					limit: 100, // Adjust based on your needs
				});

				if (!response || response.prompts.length === 0) {
					setLoading(false);
					return;
				}

				const prompts = response.prompts;

				// Calculate metrics
				const totalSec = prompts.reduce(
					(sum, prompt) => sum + (prompt.duration || 0),
					0
				);

				const totalMinutes = Math.floor(totalSec / 60);

				setMetrics({
					totalMinutes,
					monthlyPrompts: prompts.length,
				});

				if (prompts.length > 0) {
					setId(prompts[0]._id);
				}
			} catch (error) {
				console.error('Error fetching prompts:', error);
				// Handle error appropriately
			} finally {
				setLoading(false);
			}
		};

		fetchMonthlyPrompts();
	}, [user]);

	return (
		<div className="flex flex-col min-h-screen bg-background">
			{(!isLoading || !loading) && (
				<>
					<main className="flex-1 p-6 space-y-6">
						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Prompts
									</CardTitle>
									<Music className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{metrics.monthlyPrompts}
									</div>
									<p className="text-xs text-muted-foreground">
										This month
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Music Generated
									</CardTitle>
									<Loader2 className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">
										{metrics.totalMinutes} mins
									</div>
									<p className="text-xs text-muted-foreground">
										This month
									</p>
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
												{user?.credits}
											</span>
										</div>
										<Link href="pricing">
											<Button>Buy More Credits</Button>
										</Link>
									</div>
								</CardContent>
							</Card>
						</div>

						<Card>
							<CardHeader>
								<CardTitle>Quick Actions</CardTitle>
							</CardHeader>
							<CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
								<Link href="/lab">
									<Button className="w-full">
										<Plus className="mr-2 h-4 w-4" /> New
										Project
									</Button>
								</Link>
								<Link href="/projects">
									<Button
										variant="outline"
										className="w-full"
									>
										<Book className="mr-2 h-4 w-4" /> View
										Projects
									</Button>
								</Link>
								<Link href="/account">
									<Button
										variant="outline"
										className="w-full"
									>
										<User className="mr-2 h-4 w-4" /> View
										Account Details
									</Button>
								</Link>
							</CardContent>
						</Card>

						{id && <PromptPreview id={id} />}
					</main>
				</>
			)}
		</div>
	);
};

export default ClientMusicGenerationDashboard;
