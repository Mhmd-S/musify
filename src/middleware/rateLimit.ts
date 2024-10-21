import { NextRequest, NextResponse } from 'next/server';
import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';

const ratelimit = new Ratelimit({
	redis: kv,
	// 5 requests from the same IP in 24 hours
	limiter: Ratelimit.slidingWindow(5, '1440 m'),
});

// Define which routes you want to rate limit
export const config = {
	matcher: '/generate-brief',
};

export default async function middleware(request: NextRequest) {
	// You could alternatively limit based on user ID or similar
	const ip = request.ip ?? '127.0.0.1';
	const { success, pending, limit, reset, remaining } = await ratelimit.limit(
		ip
	);

	if (remaining) {
		return new Response(JSON.stringify({ error: 'Rate limit exceeded. Try again in 24 hours.' }), {
			status: 429,
			headers: {
				'X-RateLimit-Limit': limit.toString(),
				'X-RateLimit-Remaining': remaining.toString(),
				'X-RateLimit-Reset': reset.toString(),
			},
		});
	}

	return success
		? NextResponse.next()
		: NextResponse.redirect(new URL('/blocked', request.url));
}
