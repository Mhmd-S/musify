import { MutableRefObject } from 'react';

import FileUploadField from '@components/FileUploadField';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	CardHeader,
} from '@components/ui/card';
import { Tabs, TabsContent, TabsTrigger, TabsList } from '@components/ui/tabs';
import React from 'react';

type VideoInputProps = {
	videoSrc: string | null;
	videoRef: MutableRefObject<HTMLVideoElement | null>;
	handleVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveVideo: () => void;
}

const VideoInput = ({
	videoSrc,
	videoRef,
	handleVideoUpload,
	handleRemoveVideo,
}: VideoInputProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Video Input</CardTitle>
				<CardDescription>
					Upload your video or provide a link
				</CardDescription>
			</CardHeader>
			<CardContent className="min-h-60 space-y-4">
				<Tabs defaultValue="upload">
					<TabsList className="grid w-full grid-cols-2">
						<TabsTrigger value="upload">Upload Video</TabsTrigger>
						<TabsTrigger value="link">Video Link</TabsTrigger>
					</TabsList>
					<TabsContent value="upload" className="space-y-4">
						<FileUploadField
							accept="video/*"
							ref={videoRef}
							name="video"
							handleFileChange={handleVideoUpload}
							file={videoSrc}
							handleRemoveFile={handleRemoveVideo}
						/>
					</TabsContent>
					<TabsContent value="link" className="space-y-4">
						<div className="flex space-x-2">
							<Input
								type="url"
								placeholder="Paste video URL here"
							/>
							<Button>Load</Button>
						</div>
					</TabsContent>
				</Tabs>
			</CardContent>
			</Card>
	);
};

export default VideoInput;
