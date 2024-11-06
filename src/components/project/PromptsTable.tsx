import { useRouter } from 'next/navigation';

import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@components/ui/table';

import { Button } from '@components/ui/button';

import { FlaskConical } from 'lucide-react';

import { MusicGenerationData } from '@services/types';

type PromptTableProps = {
	prompts: MusicGenerationData[] | null;
};

const PromptTable: React.FC<PromptTableProps> = ({
	prompts,
}) => {

	const Router = useRouter();

	const handleClick = (id: string) => {
		Router.push(`/lab/${id}`);
	}

	return (
		<Table className="h-full">
			<TableHeader>
				<TableRow>
					<TableHead className="w-[300px]">Style</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Duration</TableHead>
					<TableHead>Created At</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{prompts && prompts.map((prompt: MusicGenerationData) => (
					<TableRow key={prompt._id}>
						<TableCell>{prompt.style}</TableCell>
						<TableCell>{prompt.type}</TableCell>
						<TableCell>{prompt.duration}</TableCell>
						<TableCell>{prompt.createdAt}</TableCell>
						<TableCell className="text-right">
							<div className="flex justify-end space-x-2">
								<Button
									variant="outline"
									size="icon"
									onClick={() => handleClick(prompt._id)}
								>
									<FlaskConical
										className="size-4"
										/>
								</Button>
								{/* <DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="ghost" size="icon">
											<MoreVertical className="h-4 w-4" />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuLabel>
											Actions
										</DropdownMenuLabel>
										<DropdownMenuItem>
											Edit prompt
										</DropdownMenuItem>
										<DropdownMenuItem>
											Duplicate prompt
										</DropdownMenuItem>
										<DropdownMenuItem>
											Share prompt
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="text-red-600">
											Delete prompt
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu> */}
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default PromptTable;
