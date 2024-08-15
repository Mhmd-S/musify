'use client';

import { useState, useRef, useEffect } from 'react';

import { Prediction } from 'replicate';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export default function DreamPage() {
	const videoRef = useRef<HTMLVideoElement | null>(null);

	const [generatedMusic, setGeneratedMusic] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
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
				const snapshot = await captureSnapshot(time);
				newSnapshots.push(snapshot);
			}
			return newSnapshots;
		}
	};

	async function generateTheme(
		imageURI: string
	): Promise<Prediction | undefined> {
		await new Promise((resolve) => setTimeout(resolve, 200));
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
		await new Promise((resolve) => setTimeout(resolve, 200));
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
		setLoading(true);
		const snapshots = await generateSnapshots();
		if (snapshots && snapshots.length > 0) {
			generateTheme(snapshots[0])
				.then((prediction) => {
					if (prediction) {
						generateMusic(prediction.output).then((music) => {
							if (music) {
								setGeneratedMusic(music?.output);
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
						<button onClick={createMusic}>Generate Music</button>
					</div>
				)}
				{loading && <p>Loading...</p>}
				{generatedMusic && (
					<audio controls>
						<source src={generatedMusic} type="audio/mp3" />
					</audio>
				)}
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
