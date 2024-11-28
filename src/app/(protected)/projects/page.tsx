'use client';

import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';

import ProjectTable from '@components/project/PromptsTable';
import PageNavigation from '@components/project/PageNavigation';
import { MusicGenerationData } from '@services/types';
import { getUserPrompts } from '@services/promptService';

export default function ProjectsTab() {
	const [prompts, setPrompts] = useState<MusicGenerationData[] | null>(null);
	const [loading, setLoading] = useState(true);
	const [pagination, setPagination] = useState({
		currentPage: 1,
		totalPages: 1,
		totalItems: 0,
	});
	useEffect(() => {
		const fetchPrompts = async () => {
			setLoading(true);
			try {
				const response = await getUserPrompts({
					page: pagination.currentPage,
					limit: 10, // You can adjust this or make it configurable
				});

				setPrompts(response.prompts);
				setPagination({
					currentPage: response.pagination.page,
					totalPages: response.pagination.pages,
					totalItems: response.pagination.totalItems,
				});
			} catch (error) {
				console.error('Error fetching prompts:', error);
				// Handle error appropriately
			} finally {
				setLoading(false);
			}
		};

		fetchPrompts();
	}, [pagination.currentPage]);

	const handlePageChange = (newPage: number) => {
		setPagination((prev) => ({ ...prev, currentPage: newPage }));
	};

	return (
		<div className="container mx-auto">
			<div className="flex justify-between items-center">
				{/* <Button>
          <Plus className="mr-2 h-4 w-4" /> New Project
        </Button> */}
			</div>

			<Card className="h-full">
				<CardHeader>
					<CardTitle>Prompt History</CardTitle>
					<CardDescription>
						View and manage all your music generation projects
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4 h-full">
					{loading ? (
						<div>Loading...</div>
					) : (
						<ProjectTable prompts={prompts} />
					)}
				</CardContent>
				<CardFooter className="w-full">
					<PageNavigation
						currentPage={pagination.currentPage}
						totalPages={pagination.totalPages}
						hasNextPage={
							pagination.currentPage < pagination.totalPages
						}
						hasPrevPage={pagination.currentPage > 1}
						onPreviousPage={() =>
							handlePageChange(pagination.currentPage - 1)
						}
						onNextPage={() =>
							handlePageChange(pagination.currentPage + 1)
						}
					/>
				</CardFooter>
			</Card>
		</div>
	);
}
