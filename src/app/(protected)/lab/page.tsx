'use client';

import { useState, useRef } from 'react';
import useFFmpeg from '@hooks/useFFmpeg';
import { toast } from 'react-toastify';

import { generateMusic } from '@services/promptService';

import VideoInput from '@components/lab/VideoInput';
import Controls from '@components/lab/Controls';
import Preview from '@components/lab/Preview';
import Context from '@components/lab/Context';

import NoSSRWrapper from '@components/NoSSRWrapper';

function VideoMusicGenerator() {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const [style, setStyle] = useState('');
	const [videoType, setVideoType] = useState('');
	const [newVideo, setNewVideo] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);
	const [contextExtracted, setContextExtracted] = useState<string | null>(
		null
	);

	const { ffmpeg, fetchFile, loadFFmpeg, closeFFmpeg } = useFFmpeg();

	const validateInputs = () => {
		if (!videoSrc) {
			toast.error('Please upload a video first.');
			return false;
		}

		if (!style) {
			toast.error('Please select a music style.');
			return false;
		}

		if (!videoType) {
			toast.error('Please select a video type.');
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
			const musicGenerated = await generateMusic({
				snapshots,
				duration: `${Math.floor(videoRef.current.duration)}`,
				type: videoType,
				style,
			});

			if (!musicGenerated) return;

			setContextExtracted(musicGenerated.combinedContext);
			await replaceAudio(musicGenerated.generatedMusic.url);
		} catch (err) {
			toast.error('Please try again.');
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
		<div className="container p-6 space-y-8">
			<h1 className="text-3xl font-bold">Lab</h1>

			<div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-4">
				<VideoInput
					videoRef={videoRef}
					videoSrc={videoSrc}
					handleRemoveVideo={handleRemoveVideo}
					handleVideoUpload={handleVideoUpload}
				/>

				<Controls
					style={style}
					videoType={videoType}
					loading={loading}
					createMusic={createMusic}
					setStyle={setStyle}
					setVideoType={setVideoType}
				/>

				<Preview
					newVideo={newVideo}
					loading={loading}
					handleDownload={handleDownload}
				/>

				<Context context={contextExtracted} />
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
