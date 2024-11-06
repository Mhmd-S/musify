import { MutableRefObject } from 'react';

import FileUploadField from '@components/FileUploadField';
import { Button } from '@components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardTitle,
	CardHeader,
	CardFooter,
} from '@components/ui/card';

import React from 'react';

type VideoInputProps = {
	videoSrc: string | null;
	videoRef: MutableRefObject<HTMLVideoElement | null>;
	handleVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveVideo: () => void;
};

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
			<CardContent className="h-60">
				<FileUploadField
					accept="video/*"
					ref={videoRef}
					name="video"
					handleFileChange={handleVideoUpload}
					file={videoSrc}
				/>
			</CardContent>
			<CardFooter className="flex items-center justify-center">
				<Button
					disabled={!videoSrc}
					variant="destructive"
					onClick={handleRemoveVideo}
				>
					Remove Video
				</Button>
			</CardFooter>
		</Card>
	);
};

export default VideoInput;
