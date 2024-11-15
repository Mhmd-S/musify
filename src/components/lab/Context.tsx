import React from 'react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import { Badge } from '@components/ui/badge';
import { Skeleton } from '@components/ui/skeleton';

import { MessageCircle } from 'lucide-react';

type ContextProps = {
	context: string | null;
};

const Context: React.FC<ContextProps> = ({ context }) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<MessageCircle className="h-5 w-5" />
					Context
					<Badge variant="secondary" className="ml-2">
						Beta
					</Badge>
				</CardTitle>
				<CardDescription>
					Context extracted from the video may not be 100% accurate.
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-2">
				{context || (
					<>
						<Skeleton className="h-4 w-full" />
						<Skeleton className="h-4 w-[90%]" />
						<Skeleton className="h-4 w-[95%]" />
						<Skeleton className="h-4 w-[85%]" />
					</>
				)}
			</CardContent>
		</Card>
	);
};

export default Context;
