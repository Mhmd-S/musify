import { Wand2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@components/ui/button';

import Hero from '@components/landing/Hero';
import Features from '@components/landing/Features';
import Samples from '@components/landing/Samples';

export default async function Home() {
	return (
		<div className="w-full">
			<Hero />
			<Features />
			<Samples />
			<div className="w-full pt-20 pb-40 md:py-40 flex flex-col items-center gap-12">
				<h3 className="text-2xl md:text-5xl text-center font-regular">
					What are you waiting for? <br /> Get started now!
				</h3>
				<Link href="/lab">
					<Button size="lg" className="gap-4" variant="default">
						Try for free! No Acount needed!
						<Wand2 className="w-4 h-4" />
					</Button>
				</Link>
			</div>
		</div>
	);
}
