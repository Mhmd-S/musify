'use client';

import { useState, useRef } from 'react';
import useFFmpeg from '@/hooks/useFFmpeg';

import {
	generateSnapshots,
	generateTheme,
	generateMusic,
	generateOrchestralBrief,
} from '@/utils';

import { ArrowDownIcon, TrashIcon } from '@heroicons/react/24/outline';

import FileUploadField from '@/components/FileUploadField';
import GeneratedVideo from '@/components/GeneratedVideo';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Prediction } from 'replicate';

export default function DreamPage() {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const [newVideo, setNewVideo] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);

	const { ffmpeg, loading: ffmpegLoading, fetchFile } = useFFmpeg();

	const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setVideoSrc(url);
		}
	};

	const handleRemoveVideo = () => {
		setVideoSrc(null);
	};

	const createMusic = async () => {
		setNewVideo(null);
		setLoading(true);

		if (!videoRef || !videoRef.current) {
			setLoading(false);
			return;
		}

		const snapshots = await generateSnapshots(videoRef?.current);

		if (snapshots && snapshots.length > 0) {
			const snapshotsTheme: Promise<Prediction>[] | null = [];

			snapshots.forEach(async (snapshot) => {
				const theme = generateTheme(snapshot, setError);
				snapshotsTheme.push(theme);
			});

			const themes = await Promise.all(snapshotsTheme);

			// Remove duplicates themes and the string "Caption:" and then combining them.
			const combinedThemes = themes
				.filter(
					(item, index, self) =>
						index ===
						self.findIndex((t) => t.output === item.output)
				)
				.map((t) => t.output.replace('Caption:', ''))
				.join(', ');

			const orchestralBrief = await generateOrchestralBrief(
				combinedThemes,
				Math.floor(videoRef.current.duration),
				setError
			);

			// Combine
			const brief = orchestralBrief.output.map((t: string) => t).join('');

			try {
				const music = await generateMusic(
					brief,
					videoRef.current.duration,
					setError
				);
				replaceAudio(music.output);
			} catch (err) {
				setError('Failed to generate music');
			} finally {
				setLoading(false);
			}
		}
	};

	const replaceAudio = async (music: string) => {
		try {
			if (!videoSrc) {
				throw new Error('No video source provided');
			}

			// Load video and audio files
			const videoFile = await fetchFile(videoSrc);
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
		} catch (error) {
			console.error('Error in replaceAudio:', error);
			setError('Failed to replace audio in the video');
		}
	};

	return (
		<div className="relative bg-white isolate flex flex-col items-center py-32 gap-8">
			<div className="flex flex-col items-center gap-8">
				<h2 className="text-4xl text-center w-4/5">
					Musify your <strong>video</strong> with AI-generated music
				</h2>
				<h3 className="font-light text-lg text-center w-4/5 md:text-2xl">
					Upload a video and we will generate suitable music for it
				</h3>
			</div>
			<div className="w-full px-8 grid grid-cols-1 md:grid-cols-[45%_10%_45%] gap-14 md:gap-0 place-items-center">
				<div className="h-fit w-full flex flex-col items-center gap-8">
					<label
						htmlFor="video"
						className="block text-lg font-bold leading-6 text-gray-900"
					>
						Upload a video
					</label>
					<FileUploadField
						accept="video/*"
						ref={videoRef}
						name="video"
						handleFileChange={handleVideoUpload}
						file={videoSrc}
						handleRemoveFile={handleRemoveVideo}
					/>
					<div className="w-fit grid grid-cols-[30%_70%] gap-4 place-items-center">
						<Button
							variant="destructive"
							className="w-fit flex justify-end"
							onClick={handleRemoveVideo}
							disabled={loading}
						>
							<TrashIcon className="size-18 cursor-pointer" />
						</Button>
						<Button
							className="w-fit"
							variant="default"
							onClick={createMusic}
							disabled={loading}
						>
							{newVideo ? 'Regenerate Music' : 'Generate Music'}
						</Button>
					</div>
				</div>
				<div>
					{error && <Badge variant="destructive">{error}</Badge>}
					<ArrowDownIcon className="size-14 text-primary md:-rotate-90" />
				</div>
				<div className="h-fit w-full flex flex-col items-center gap-8">
					<h3 className="text-lg font-bold leading-6 text-primary">
						Your New Video
					</h3>
					<GeneratedVideo
						newVideo={newVideo}
						loading={loading || ffmpegLoading}
					/>
					<Button
						disabled={loading || !newVideo}
						variant="outline"
						className="w-fit"
					>
						<a
							href={newVideo ? newVideo : ''}
							target="_blank"
							download
						>
							Download Video
						</a>
					</Button>
				</div>
			</div>
		</div>
	);
}
