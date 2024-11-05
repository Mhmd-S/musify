'use client';

import { useState, useRef } from 'react';
import useFFmpeg from '@hooks/useFFmpeg';
import { toast } from 'react-toastify';

import { Music, RefreshCw, Download } from 'lucide-react';

import { generateMusic } from '@services/promptService';

import { Button } from '@components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@components/ui/card';
import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import { Slider } from '@components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@components/ui/tabs';

import FileUploadField from '@components/FileUploadField';
import InputSelect from '@components/ui/InputSelect';
import { Switch } from '@components/ui/switch';
import GeneratedVideo from '@components/GeneratedVideo';

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

export default function VideoMusicGenerator() {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const [style, setStyle] = useState('');
	const [videoType, setVideoType] = useState('');
	const [newVideo, setNewVideo] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);

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
			const musicUrl = await generateMusic({
				snapshots,
				duration: `${Math.floor(videoRef.current.duration)}`,
				type: videoType,
				style,
			});

			if (!musicUrl) return;

			await replaceAudio(musicUrl);
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
		<div className="container mx-auto p-6 space-y-8">
			<h1 className="text-3xl font-bold">
				Generate Music for Your Video
			</h1>

			<Card>
				<CardHeader>
					<CardTitle>Video Input</CardTitle>
					<CardDescription>
						Upload your video or provide a link
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<Tabs defaultValue="upload">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="upload">
								Upload Video
							</TabsTrigger>
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

			<Card>
				<CardHeader>
					<CardTitle>Music Generation Settings</CardTitle>
					<CardDescription>
						Customize the music for your video
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="grid grid-cols-1 gap-4">
						<InputSelect
							id="style"
							label="Style"
							value={style}
							onValueChange={setStyle}
							options={styleOptions}
							placeholder="Select a style"
						/>
						<InputSelect
							id="videoType"
							label="Video Type"
							value={videoType}
							onValueChange={setVideoType}
							options={videoTypeOptions}
							placeholder="Select video type"
						/>
					</div>

					<div className="space-y-2">
						<Label>Mood</Label>
						<Slider defaultValue={[50]} max={100} step={1} />
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>Calm</span>
							<span>Neutral</span>
							<span>Energetic</span>
						</div>
					</div>

					<div className="space-y-2">
						<Label>Tempo (BPM)</Label>
						<Slider
							defaultValue={[120]}
							min={60}
							max={200}
							step={1}
						/>
						<div className="flex justify-between text-xs text-muted-foreground">
							<span>60</span>
							<span>120</span>
							<span>200</span>
						</div>
					</div>

					<div className="flex items-center space-x-2">
						<Switch id="sync-video" />
						<Label htmlFor="sync-video">
							Sync music to video tempo
						</Label>
					</div>
				</CardContent>
				<CardFooter>
					<Button
						onClick={createMusic}
						disabled={loading}
						className="w-full"
					>
						{loading ? (
							<>
								<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
								Generating...
							</>
						) : (
							<>
								<Music className="mr-2 h-4 w-4" />
								Generate Music
							</>
						)}
					</Button>
				</CardFooter>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Preview</CardTitle>
					<CardDescription>
						Listen to your generated music with the video
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<GeneratedVideo newVideo={newVideo} loading={loading} />
				</CardContent>
				<CardFooter className="flex justify-between">
					<Button variant="outline">Regenerate</Button>
					<Button>
						<Download className="mr-2 h-4 w-4" />
						Download
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
