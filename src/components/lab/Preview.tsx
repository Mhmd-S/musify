import React from 'react';

import { Download } from 'lucide-react';

import { Button } from '@components/ui/button';
import GeneratedVideo from '@components/GeneratedVideo';
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	CardHeader,
	CardFooter,
} from '@components/ui/card';

type PreviewProps = {
	newVideo: string | null;
	loading?: boolean;
	handleDownload?: () => void;
};

const Preview = ({ newVideo, loading, handleDownload }: PreviewProps) => {
	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>Preview</CardTitle>
				<CardDescription>
					Listen to your generated music with the video
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<GeneratedVideo newVideo={newVideo} loading={loading} />
			</CardContent>
			<CardFooter className="w-full flex justify-center">
				<Button onClick={handleDownload}>
					<Download className="mr-2 h-4 w-4" />
					Download
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Preview;
