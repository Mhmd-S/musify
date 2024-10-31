'use client';

import { useState, useRef, useEffect } from 'react';
import useFFmpeg from '@hooks/useFFmpeg';

import { MusicIcon, TrashIcon } from 'lucide-react';

import { Badge } from '@components/ui/badge';
import FileUploadField from '@components/FileUploadField';
import GeneratedVideo from '@components/GeneratedVideo';

import { generateMusic } from '@services/musicService';

import { useToast } from '@hooks/use-toast';
import { Button } from '@components/ui/button';

import NoSSRWrapper from '@components/NoSSRWrapper';

import { StyleVideoTypeSelect } from '@components/ui/StyleVideoTypeSelect';

const Lab = () => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const { toast } = useToast();

	const [style, setStyle] = useState('');
	const [videoType, setVideoType] = useState('');
	const [newVideo, setNewVideo] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);

	const { ffmpeg, fetchFile, loadFFmpeg, closeFFmpeg } = useFFmpeg();

	const styleOptions = [
		{ value: 'orchestral', label: 'Orchestral' },
		{ value: 'chamber', label: 'Chamber Music' },
		{ value: 'ambient', label: 'Ambient' },
		{ value: 'pop', label: 'Modern Pop' },
		{ value: 'hip-hop', label: 'Hip Hop' },
	];

	const videoTypeOptions = [
		{ value: 'promotional', label: 'Promotional' },
		{ value: 'tutorial', label: 'Tutorial' },
		{ value: 'vlog', label: 'Vlog' },
		{ value: 'product-showcase', label: 'Product Showcase' },
		{ value: 'testimonial', label: 'Testimonial' },
		{ value: 'teaser', label: 'Teaser/Preview' },
		{ value: 'announcement', label: 'Announcement' },
		{ value: 'event-highlight', label: 'Event Highlight' },
	];

	const validateInputs = () => {
		if (!videoSrc) {
			toast({
				variant: 'destructive',
				title: 'Video Required',
				description: 'Please upload a video first.',
			});
			return false;
		}

		if (!style) {
			toast({
				variant: 'destructive',
				title: 'Style Required',
				description: 'Please select a music style.',
			});
			return false;
		}

		if (!videoType) {
			toast({
				variant: 'destructive',
				title: 'Video Type Required',
				description: 'Please select a video type.',
			});
			return false;
		}

		return true;
	};

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

		if (!validateInputs()) {
			setLoading(false);
			return;
		}

		setNewVideo(null);

		if (!videoRef || !videoRef.current) {
			setLoading(false);
			return;
		}

		const snapshots = await generateSnapshots(videoRef?.current);

		try {
			const musicUrl = await generateMusic({
				snapshots,
				duration: `${Math.floor(videoRef.current.duration)}`,
				type: videoType,
				style,
			});

			if (!musicUrl) return;

			await replaceAudio(musicUrl);
		} catch (err) {
			toast({
				variant: 'destructive',
				title: 'Failed to generate music',
				description: 'Please try again.',
			});
		} finally {
			setLoading(false);
		}
	};

	const captureSnapshot = (
		video: HTMLVideoElement,
		time: number
	): Promise<string> => {
		return new Promise((resolve) => {
			const canvas = document.createElement('canvas');
			const ctx = canvas.getContext('2d');

			if (ctx) {
				video.currentTime = time;
				video.onseeked = () => {
					// Set the desired dimensions for the resized image
					const width = 800;
					const height =
						(video.videoHeight / video.videoWidth) * width;

					canvas.width = width;
					canvas.height = height;

					ctx.drawImage(video, 0, 0, width, height);
					const snapshot = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed
					resolve(snapshot);
				};
			}
		});
	};

	const generateSnapshots = async (video: HTMLVideoElement) => {
		const duration = video.duration;
		let newSnapshots: string[] = [];
		for (let time = 0; time < duration; time += duration / 12) {
			const snapshot = await captureSnapshot(video, time);
			newSnapshots.push(snapshot);
		}
		return newSnapshots;
	};

	const replaceAudio = async (music: string) => {
		try {
			await loadFFmpeg();

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
			closeFFmpeg();
		} catch (error) {
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

	return (
		<NoSSRWrapper>
			<div className="relative px-4 bg-white isolate flex flex-col items-center py-32 gap-14">
				<div className="flex flex-col items-center gap-12">
				<h2 className="text-xl md:text-4xl text-center w-4/5">
					Elevate Your Video with Curated AI-Generated Music!
				</h2>

				<Badge className="w-fit mx-5 py-2 text-center font-normal">
					Please be patient. Duraton for music processing is based on
					the length of the video.
				</Badge>
			</div>
			<div className="w-full px-8 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-14 place-items-start">
				<div className="h-fit w-full flex flex-col gap-8">
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
					<div className="grid grid-cols-1 gap-4">
						<StyleVideoTypeSelect
							id="style"
							label="Style"
							value={style}
							onValueChange={setStyle}
							options={styleOptions}
							placeholder="Select a style"
						/>
						<StyleVideoTypeSelect
							id="videoType"
							label="Video Type"
							value={videoType}
							onValueChange={setVideoType}
							options={videoTypeOptions}
							placeholder="Select video type"
						/>
					</div>
					<div className="w-full grid grid-cols-2 gap-4 place-items-center">
						<Button
							variant="destructive"
							className="w-full flex items-center justify-center"
							onClick={handleRemoveVideo}
							disabled={loading}
						>
							<TrashIcon className="size-18 cursor-pointer" />
							Remove Video
						</Button>
						<Button
							className="w-full flex items-center justify-center"
							variant="default"
							onClick={createMusic}
							disabled={loading}
						>
							<MusicIcon className="size-18" />
							{newVideo ? 'Regenerate Music' : 'Generate Music'}
						</Button>
					</div>
				</div>
				<div className="h-full w-full flex flex-col items-center gap-8">
					<h3 className="text-lg font-bold leading-6 text-primary">
						Your New Video
					</h3>

					<GeneratedVideo newVideo={newVideo} loading={loading} />

					<Button
						disabled={loading || !newVideo}
						variant="outline"
						className="w-full mt-8"
						onClick={handleDownload}
					>
						Download Video
					</Button>
				</div>
			</div>
			</div>
		</NoSSRWrapper>
	);
};

const LabPage = () => {
	return (
    <NoSSRWrapper>
      <Lab />
    </NoSSRWrapper>
  );
};

export default LabPage;
