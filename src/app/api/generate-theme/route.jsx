import { NextResponse } from "next/server";
import Replicate from "replicate";
 
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
      'The REPLICATE_API_TOKEN environment variable is not set.'
    );
  }
 
  const { image } = await request.json();
 
  const options = {
    version: '2e1dddc8621f72155f24cf2e0adbde548458d3cab9f00c0139eea840d0ac4746',
    input: { image }
  }
 
  if (WEBHOOK_HOST) {
    options.webhook = `${WEBHOOK_HOST}`
    options.webhook_events_filter = ["start", "completed"]
  }

  const prediction = await replicate.predictions.create(options);

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 });
  }
 
  return NextResponse.json(prediction, { status: 201 });
}