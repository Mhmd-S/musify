'use client';
import { useParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import useFFmpeg from '@hooks/useFFmpeg';

import Spinnter from '@components/Spinner';

import { getPromptVideo } from '@services/promptService';

import VideoInput from '@components/lab/VideoInput';
import Controls from '@components/lab/Controls';
import Preview from '@components/lab/Preview';
import Context from '@components/lab/Context';

import NoSSRWrapper from '@components/NoSSRWrapper';

import { getPrompt } from '@services/promptService';
import { MusicGenerationData } from '@services/types';

function VideoMusicGenerator() {
	const { ffmpeg, fetchFile, loadFFmpeg, closeFFmpeg } = useFFmpeg();

	const videoRef = useRef<HTMLVideoElement | null>(null);
	const params = useParams();

	const [initialLoading, setInitialLoading] = useState(true);
	const [newVideo, setNewVideo] = useState<string | null>(null);
	const [fetchedPrompt, setFetchedPrompt] =
		useState<MusicGenerationData | null>(null);

	useEffect(() => {
		const { id } = params;

		const fetchPrompt = async () => {
			const response = await getPrompt(id);
			setFetchedPrompt(response);

			const video = await getPromptVideo(id);

			await loadFFmpeg();
			await replaceAudio(response.generatedMusic.url, video);

			setInitialLoading(false);
		};

		fetchPrompt();
	}, []);

	const replaceAudio = async (music: string, video: Blob) => {
		try {
			await loadFFmpeg();
			console.log(music, video);
			if (!video || !music) {
				throw new Error('No video or music source provided');
			}

			// Load video and audio files
			const videoFile = await fetchFile(video);

			const audioFile = await fetchFile(music);

			await ffmpeg.writeFile('video.mp4', videoFile);
			await ffmpeg.writeFile('audio.mp3', audioFile);

			// Replace audio in the video
			await ffmpeg.exec([
				'-i',
				'video.mp4',
				'-i',
				'audio.mp3',
				'-c:v',
				'copy',
				'-map',
				'0:v:0',
				'-map',
				'1:a:0',
				'-shortest',
				'output.mp4',
			]);

			// Get the resulting video
			const data = await ffmpeg.readFile('output.mp4', 'binary');

			// Create a URL for the resulting video
			const videoUrl = URL.createObjectURL(
				new Blob([data], { type: 'video/mp4' })
			);

			setNewVideo(videoUrl);
			closeFFmpeg();
		} catch (error) {
			console.log(error)
			console.error('Error in replaceAudio:', error);
		}
	};

	const handleDownload = () => {
		if (newVideo) {
			const link = document.createElement('a');
			link.href = newVideo;
			link.download = 'generated-video.mp4';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	const renderNotFound = () => {
		return (
			<div className="flex items-center justify-center h-full">
				<p className="text-lg font-bold">Prompt not found</p>
			</div>
		);
	};

	return (
		<div className="container p-6 space-y-8">
			<h1 className="text-3xl font-bold">Prompt Lab</h1>

			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
				{initialLoading ? (
					<Spinnter />
				) : fetchedPrompt ? (
					<>
						<VideoInput
							videoRef={videoRef}
							videoSrc={fetchedPrompt?.video}
							handleRemoveVideo={() => {}}
							handleVideoUpload={() => {}}
						/>

						<Controls
							style={fetchedPrompt?.style}
							videoType={fetchedPrompt?.type}
						/>

						<Preview
							newVideo={newVideo}
							handleDownload={handleDownload}
						/>

						<Context context={fetchedPrompt?.combinedContext} />
					</>
				) : (
					renderNotFound()
				)}
			</div>
		</div>
	);
}

export default function LabPage() {
	return (
		<NoSSRWrapper>
			<VideoMusicGenerator />
		</NoSSRWrapper>
	);
}
