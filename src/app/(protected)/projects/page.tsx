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
import ProjectFilters from '@components/project/PromptFilters';
import { MusicGenerationData } from '@services/types';

import { getUserPrompts } from '@services/promptService';

export default function ProjectsTab() {
	const [prompts, setPrompts] = useState<MusicGenerationData[] | null>(null);
	const [maxPage, setMaxPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const [page, setPage] = useState(1);

	useEffect(() => {
		const fetchPrompts = async () => {
			setLoading(true);
			const response = await getUserPrompts(page);
			setPrompts(response.prompts);
			setMaxPage(response.pages);
			setLoading(false);
		};
		fetchPrompts();
	}, [page]);

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
					{/* <ProjectFilters
						onSearch={() => {}}
						onFilterStatusChange={() => {}}
						onSortChange={() => {}}
					/> */}

					<ProjectTable prompts={prompts} />
				</CardContent>
				<CardFooter className="w-full">
					<PageNavigation
						onPreviousPage={() => {
							page > 1 && setPage(page - 1);
						}}
						onNextPage={() => {
							page < maxPage && setPage(page + 1);
						}}
					/>
				</CardFooter>
			</Card>
		</div>
	);
}
