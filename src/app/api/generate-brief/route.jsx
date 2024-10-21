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

  console.log("Fetch")

  if (!process.env.REPLICATE_API_TOKEN) {
    throw new Error(
      'The REPLICATE_API_TOKEN environment variable is not set.'
    );
  }
 
  const { theme, duration } = await request.json();
 
  const options = {
    model: "meta/meta-llama-3-8b-instruct",
    input: { 
      "top_p": 0.9,
      "prompt": `Make sense of  phrases which have been extracted from a video's snippets and generate me an suitable orchestral breif for the video which has the duration of ${duration} seconds. The snippets are: \n\n "${theme}". \n\n Only return a concise orchestral brief, do not mention the contents of the video. Just give technical details for the orchestral brief.`,
      "min_tokens": 0,
      "max_token": 30,
     }
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