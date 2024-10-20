'use client';

import Link from 'next/link';

import { Wand2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import Hero from '@/components/Hero';
import Features from '@/components/Features';

export default function Home() {
	return (
		<div className="w-full">
			<Hero />
			<Features />
			<div className="w-full py-24 flex flex-col items-center gap-12">
				<h3 className="text-2xl md:text-5xl text-center font-regular">
					What are you waiting for? <br /> Get started now!
				</h3>
				<Link href="/dream">
					<Button size="lg" className="gap-4" variant="default">
						Get Started!
						<Wand2 className="w-4 h-4" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
