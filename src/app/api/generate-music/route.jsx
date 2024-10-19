import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({
	auth: process.env.REPLICATE_API_TOKEN,
});

// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: process.env.NGROK_HOST;

export async function POST(request) {
	if (!process.env.REPLICATE_API_TOKEN) {
		throw new Error(
			'The REPLICATE_API_TOKEN environment variable is not set. See README.md for instructions on how to set it.'
		);
	}

	const { prompt, duration } = await request.json();

	const options = {
		version:
			'671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb',
		input: {
			prompt,
			duration: parseInt(duration),
			model_version: 'stereo-large',
			output_format: 'mp3',
			normalization_strategy: 'peak',
		},
	};

	if (WEBHOOK_HOST) {
		options.webhook = `${WEBHOOK_HOST}`;
		options.webhook_events_filter = ['start', 'completed'];
	}

	// A prediction is the result you get when you run a model, including the input, output, and other details
	const prediction = await replicate.predictions.create(options);

	if (prediction?.error) {
		return NextResponse.json({ detail: prediction.error }, { status: 500 });
	}

	return NextResponse.json(prediction, { status: 201 });
}
