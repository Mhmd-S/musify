'use client';

import { useState } from 'react';
import {
	Music,
	Play,
	Pause,
	MoreVertical,
	Plus,
	Search,
	Filter,
	ArrowUpDown,
} from 'lucide-react';
import { Button } from '@components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@components/ui/dropdown-menu';
import { Input } from '@components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@components/ui/select';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@components/ui/table';
import { Badge } from '@components/ui/badge';

export default function ProjectsTab() {
	const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});

	const projects = [
		{
			id: '1',
			name: 'Epic Adventure Score',
			duration: '2:34',
			status: 'In Progress',
			genre: 'Cinematic',
			created: '2023-11-01',
		},
		{
			id: '2',
			name: 'Relaxing Ambient',
			duration: '5:12',
			status: 'Completed',
			genre: 'Ambient',
			created: '2023-10-28',
		},
		{
			id: '3',
			name: 'Upbeat Pop Tune',
			duration: '3:45',
			status: 'Completed',
			genre: 'Pop',
			created: '2023-10-25',
		},
		{
			id: '4',
			name: 'Mysterious Soundtrack',
			duration: '4:20',
			status: 'In Progress',
			genre: 'Electronic',
			created: '2023-11-02',
		},
		{
			id: '5',
			name: 'Acoustic Love Song',
			duration: '3:30',
			status: 'Completed',
			genre: 'Acoustic',
			created: '2023-10-20',
		},
	];

	const togglePlay = (id: string) => {
		setIsPlaying((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	return (
		<div className="container mx-auto p-6 space-y-8">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Your Projects</h1>
				<Button>
					<Plus className="mr-2 h-4 w-4" /> New Project
				</Button>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Project Management</CardTitle>
					<CardDescription>
						View and manage all your music generation projects
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex space-x-2">
						<div className="flex-1">
							<Input
								type="text"
								placeholder="Search projects..."
							/>
						</div>
						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Status</SelectItem>
								<SelectItem value="in-progress">
									In Progress
								</SelectItem>
								<SelectItem value="completed">
									Completed
								</SelectItem>
							</SelectContent>
						</Select>
						<Select>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Sort by" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="name">Name</SelectItem>
								<SelectItem value="created">
									Date Created
								</SelectItem>
								<SelectItem value="duration">
									Duration
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[300px]">
									Name
								</TableHead>
								<TableHead>Genre</TableHead>
								<TableHead>Duration</TableHead>
								<TableHead>Status</TableHead>
								<TableHead>Created</TableHead>
								<TableHead className="text-right">
									Actions
								</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{projects.map((project) => (
								<TableRow key={project.id}>
									<TableCell className="font-medium">
										{project.name}
									</TableCell>
									<TableCell>{project.genre}</TableCell>
									<TableCell>{project.duration}</TableCell>
									<TableCell>
										<Badge
											variant={
												project.status === 'Completed'
													? 'default'
													: 'secondary'
											}
										>
											{project.status}
										</Badge>
									</TableCell>
									<TableCell>{project.created}</TableCell>
									<TableCell className="text-right">
										<div className="flex justify-end space-x-2">
											<Button
												variant="outline"
												size="icon"
												onClick={() =>
													togglePlay(project.id)
												}
											>
												{isPlaying[project.id] ? (
													<Pause className="h-4 w-4" />
												) : (
													<Play className="h-4 w-4" />
												)}
											</Button>
											<DropdownMenu>
												<DropdownMenuTrigger asChild>
													<Button
														variant="ghost"
														size="icon"
													>
														<MoreVertical className="h-4 w-4" />
													</Button>
												</DropdownMenuTrigger>
												<DropdownMenuContent align="end">
													<DropdownMenuLabel>
														Actions
													</DropdownMenuLabel>
													<DropdownMenuItem>
														Edit Project
													</DropdownMenuItem>
													<DropdownMenuItem>
														Duplicate Project
													</DropdownMenuItem>
													<DropdownMenuItem>
														Share Project
													</DropdownMenuItem>
													<DropdownMenuSeparator />
													<DropdownMenuItem className="text-red-600">
														Delete Project
													</DropdownMenuItem>
												</DropdownMenuContent>
											</DropdownMenu>
										</div>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Previous</Button>
					<Button variant="outline">Next</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
