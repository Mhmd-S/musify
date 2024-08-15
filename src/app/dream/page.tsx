'use client';

import { useState, useRef, useEffect } from 'react';

export default function DreamPage() {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const [snapshots, setSnapshots] = useState<string[]>([]);
	const [theme, setTheme] = useState<string | null>(null);
	const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [generatedMusicLoaded, setGeneratedMusicLoaded] =
		useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [videoSrc, setVideoSrc] = useState<string | null>(null);

	const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const url = URL.createObjectURL(file);
			setVideoSrc(url);
		}
	};

	const captureSnapshot = (time: number): Promise<string> => {
		return new Promise((resolve) => {
			if (videoRef.current) {
				const video = videoRef.current;
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
		if (videoRef.current) {
			const video = videoRef.current;
			const duration = video.duration;

			let newSnapshots: string[] = [];
			for (let time = 0; time < duration; time += 2) {
				console.log(123);
				const snapshot = await captureSnapshot(time);
				newSnapshots.push(snapshot);
			}
			setSnapshots(newSnapshots);
		}
	};

	async function generateTheme(fileUrl: string) {
		await new Promise((resolve) => setTimeout(resolve, 200));
		setLoading(true);
		const res = await fetch('/generate-theme', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ imageUrl: fileUrl }),
		});

		let videoTheme = await res.json();
		if (res.status !== 200) {
			setError(videoTheme);
		} else {
			generateMusic(videoTheme);
		}
		setTimeout(() => {
			setLoading(false);
		}, 1300);
	}

	async function generateMusic(theme: String) {
		await new Promise((resolve) => setTimeout(resolve, 200));
		setLoading(true);
		const res = await fetch('/generate-music', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ theme }),
		});

		let videoTheme = await res.json();
		if (res.status !== 200) {
			setError(videoTheme);
		} else {
			setGeneratedMusic(videoTheme);
		}
		setTimeout(() => {
			setLoading(false);
		}, 1300);
	}

	const createMusic = () => {
		setLoading(true);
		generateSnapshots();
		generateTheme(snapshots[0]);
		generateMusic(theme);
	};

	return (
		<div className="h-screen bg-white isolate flex flex-col justify-evenly items-center">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				/>
			</div>
			<div>
				<div>
					<input
						type="file"
						accept="video/*"
						onChange={handleVideoUpload}
					/>
					{videoSrc && (
						<div>
							<video
								ref={videoRef}
								src={videoSrc}
								controls
								style={{ maxWidth: '100%' }}
								className="sr-only"
							/>
							<button onClick={generateMusic}>
								Generate Music
							</button>
						</div>
					)}
				</div>
			</div>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
				/>
			</div>
		</div>
	);
}
