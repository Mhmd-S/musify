'use client'

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';
import MediaInput from '@/components/MediaInput';
import GeneratedVideo from '@/components/GeneratedVideo';
import { Prediction } from 'replicate';

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface VideoProps {
	videoSrc: string | null;
	handleVideoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveVideo: () => void;
}

const Video: React.FC<VideoProps> = ({
	videoSrc,
	handleVideoUpload,
	handleRemoveVideo,
}) => {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		if (videoSrc && videoRef.current) {
			videoRef.current.src = videoSrc;
		}
	}, [videoSrc]);

	return (
		<>
			{videoSrc && (
				<video
					ref={videoRef}
					src={videoSrc}
					controls
					style={{ maxWidth: '100%' }}
					className="sr-only"
				/>
			)}
			{!videoSrc && (
				<div className="w-3/5 aspect-video bg-gray-600/35 rounded-2xl flex items-center justify-center">
					<p className="font-light">Your new video will appear here</p>
				</div>
			)}
		</>
	);
};



export default function DreamPage() {
	const ffmpegRef = useRef(new FFmpeg());

	const [newVideo, setNewVideo] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);

	useEffect(() => {
		load();
	}, []);

	const load = async () => {
		const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
		const ffmpeg = ffmpegRef.current;
		await ffmpeg.load({
			coreURL: await toBlobURL(
				`${baseURL}/ffmpeg-core.js`,
				'text/javascript'
			),
			wasmURL: await toBlobURL(
				`${baseURL}/ffmpeg-core.wasm`,
				'application/wasm'
			),
		});
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

	const captureSnapshot = (time: number): Promise<string> => {
		return new Promise((resolve) => {
			const video = videoRef.current;
			if (video) {
				const canvas = document.createElement('canvas');
				canvas.width = video.videoWidth;
				canvas.height = video.videoHeight;
				const ctx = canvas.getContext('2d');

				if (ctx) {
					video.currentTime = time;
					video.onseeked = () => {
						ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
						const snapshot = canvas.toDataURL('image/png');
						resolve(snapshot);
					};
				}
			}
		});
	};

	const generateSnapshots = async () => {
		const video = videoRef.current;
		if (video) {
			const duration = video.duration;

			let newSnapshots: string[] = [];
			for (let time = 0; time < duration; time += 2) {
				const snapshot = await captureSnapshot(time);
				newSnapshots.push(snapshot);
			}
			return newSnapshots;
		}
	};

	async function generateTheme(
		imageURI: string
	): Promise<Prediction | undefined> {
		await sleep(200);
		const res = await fetch('/api/generate-theme', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ image: imageURI }),
		});

		let prediction = await res.json();

		if (res.status !== 201) {
			setError(prediction.detail);
			return;
		}

		while (
			prediction.status !== 'succeeded' &&
			prediction.status !== 'failed'
		) {
			await sleep(2500);
			const response = await fetch(
				'/api/generate-theme/' + prediction.id
			);
			prediction = await response.json();
			if (response.status !== 200) {
				setError(prediction.detail);
				return;
			}
		}
		return prediction;
	}

	async function generateMusic(
		theme: string
	): Promise<Prediction | undefined> {
		await sleep(200);
		const res = await fetch('/api/generate-music', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ prompt: theme }),
		});

		let prediction = await res.json();

		if (res.status !== 201) {
			setError(prediction.detail);
			return;
		}

		while (
			prediction.status !== 'succeeded' &&
			prediction.status !== 'failed'
		) {
			await sleep(2500);
			const response = await fetch(
				'/api/generate-music/' + prediction.id
			);
			prediction = await response.json();
			if (response.status !== 200) {
				setError(prediction.detail);
				return;
			}
		}
		return prediction;
	}

	const createMusic = async () => {
		setNewVideo(null);
		setLoading(true);
		const snapshots = await generateSnapshots();
		if (snapshots && snapshots.length > 0) {
			generateTheme(snapshots[0])
				.then((prediction) => {
					if (prediction) {
						generateMusic(prediction.output).then((music) => {
							if (music) {
								replaceAudio(music.output);
								setLoading(false);
							}
						});
					}
				})
				.catch((error) => {
					setError(error);
					setLoading(false);
				});
		}
	};

	const replaceAudio = async (music: string) => {
		const ffmpeg = ffmpegRef.current;

		// Load video and audio files
		await ffmpeg.writeFile('video.mp4', await fetchFile(videoSrc));
		await ffmpeg.writeFile('audio.mp3', await fetchFile(music));

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
			'-longest',
			'output.mp4',
		]);

		// Get the resulting video
		const data = await ffmpeg.readFile('output.mp4', 'binary');

		// Create a URL for the resulting video
		const videoUrl = URL.createObjectURL(
			new Blob([data], { type: 'video/mp4' })
		);

		setNewVideo(videoUrl);
	};

	return (
		<div className="relative bg-white isolate flex flex-col items-center py-4 gap-12">
			{/* ... */}
			<Link
				href="#"
				className="flex items-center gap-2 -m-1.5 p-1.5 font-bold text-3xl"
			>
				<MusicalNoteIcon
					aria-hidden="true"
					className="size-14 p-2 border-2 border-pink-600 rounded-full"
				/>
				<span className="text-6xl border-b-2 border-pink-600 pb-2">
					Musify
				</span>
			</Link>
			<div className="w-full p-12 grid grid-cols-[30%_70%] gap-12">
				<div className="flex flex-col items-center gap-y-12 pt-8">
					<MediaInput
						name="uploadedVideo"
						label="Upload a video to add music to"
						accept="video/*"
						file={videoSrc}
						handleFileChange={handleVideoUpload}
						handleRemoveFile={handleRemoveVideo}
					/>
					<button
						className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						onClick={createMusic}
					>
						Generate Music
					</button>
				</div>
				<div className="flex flex-col items-center gap-8">
					<h2 className="text-4xl font-bold text-center w-4/5">
						Musify your{' '}
						<span className="text-pink-600">video</span> with
						AI-generated music in seconds
					</h2>
					<h3 className="font-light text-2xl">
						Upload a video and we will generate suitable music for
						it
					</h3>
					<Video
						videoSrc={videoSrc}
						handleVideoUpload={handleVideoUpload}
						handleRemoveVideo={handleRemoveVideo}
					/>
					<GeneratedVideo
						newVideo={newVideo}
						downloadVideo={() => {}}
						loading={loading}
					/>
				</div>
			</div>
			{/* ... */}
		</div>
	);
}
