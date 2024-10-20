import { Prediction } from 'replicate';

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const captureSnapshot = (
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
				const height = (video.videoHeight / video.videoWidth) * width;

				canvas.width = width;
				canvas.height = height;

				ctx.drawImage(video, 0, 0, width, height);
				const snapshot = canvas.toDataURL('image/jpeg', 0.7); // Adjust quality as needed
				resolve(snapshot);
			};
		}
	});
};

export const generateSnapshots = async (video: HTMLVideoElement) => {
	const duration = video.duration;
	let newSnapshots: string[] = [];
	for (let time = 0; time < duration; time += 6) {
		const snapshot = await captureSnapshot(video, time);
		newSnapshots.push(snapshot);
	}
	return newSnapshots;
};

const fetchPredictionStatus = async (
	url: string,
	sleepDuration: number,
	setError: (error: string) => void
): Promise<Prediction | null> => {
	try {
		const response = await fetch(url);
		const prediction = await response.json();

		if (response.status !== 200) {
			setError(prediction.detail);
			return null;
		}

		if (
			prediction.status === 'succeeded' ||
			prediction.status === 'failed'
		) {
			return prediction;
		}

		await sleep(sleepDuration); // Adjust the delay as needed
		return fetchPredictionStatus(url, sleepDuration, setError);
	} catch (error) {
		setError('An error occurred while fetching the prediction status.');
		return null;
	}
};

export const generateTheme = async (
	imageURI: string,
	setError: (error: string) => void
) => {
	await sleep(250);
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
		return null;
	}

	return fetchPredictionStatus(
		'/api/generate-theme/' + prediction.id,
		2000,
		setError
	);
};

export const generateOrchestralBrief = async (
	theme: string,
	duration: number,
	setError: (error: string) => void
) => {
	await sleep(1000);

	const res = await fetch('/api/generate-brief', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ theme, duration }),
	});

	let prediction = await res.json();

	if (res.status !== 201) {
		setError(prediction.detail);
		return;
	}

	return fetchPredictionStatus(
		'/api/generate-brief/' + prediction.id,
		7000,
		setError
	);
};

export const generateMusic = async (
	theme: string,
	duration: number,
	setError: (error: string) => void
) => {
	await sleep(1000);

	const res = await fetch('/api/generate-music', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ prompt: theme, duration }),
	});

	let prediction = await res.json();

	if (res.status !== 201) {
		setError(prediction.detail);
		return;
	}

	return fetchPredictionStatus(
		'/api/generate-music/' + prediction.id,
		10000,
		setError
	);
};
