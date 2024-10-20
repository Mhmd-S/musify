export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const captureSnapshot = (
	video: HTMLVideoElement,
	time: number
): Promise<string> => {
	return new Promise((resolve) => {
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
	});
};

export const generateSnapshots = async (video: HTMLVideoElement) => {
	const duration = video.duration;
	let newSnapshots: string[] = [];
	for (let time = 0; time < duration; time += 10) {
		const snapshot = await captureSnapshot(video, time);
		newSnapshots.push(snapshot);
	}
	return newSnapshots;
};

export const generateTheme = async (
	imageURI: string,
	setError: (error: string) => void
) => {
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
		const response = await fetch('/api/generate-theme/' + prediction.id);
		prediction = await response.json();
		if (response.status !== 200) {
			setError(prediction.detail);
			return;
		}
	}
	return prediction;
};

export const generateOrchestralBrief = async (
	theme: string,
	setError: (error: string) => void
) => {
	await sleep(200);
	const res = await fetch('/api/generate-brief', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ theme }),
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
		const response = await fetch('/api/generate-brief/' + prediction.id);
		prediction = await response.json();
		if (response.status !== 200) {
			setError(prediction.detail);
			return;
		}
	}
	return prediction;
};

export const generateMusic = async (
	theme: string,
	duration: number,
	setError: (error: string) => void
) => {
	await sleep(200);
	const res = await fetch('/api/generate-music', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ prompt: theme, duration: duration }),
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
		const response = await fetch('/api/generate-music/' + prediction.id);
		prediction = await response.json();
		if (response.status !== 200) {
			setError(prediction.detail);
			return;
		}
	}
	return prediction;
};
