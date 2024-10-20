'use client';

import { useEffect, useMemo, useState, useRef } from 'react';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { Wand2, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Hero = () => {
	const videoRef = useRef<HTMLVideoElement>(null);

	const [titleNumber, setTitleNumber] = useState(0);
	const [isMuted, setIsMuted] = useState(true);

	const titles = useMemo(
		() => ['electrical', 'wonderful', 'beautiful', 'melodious'],
		[]
	);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (titleNumber === titles.length - 1) {
				setTitleNumber(0);
			} else {
				setTitleNumber(titleNumber + 1);
			}
		}, 2000);
		return () => clearTimeout(timeoutId);
	}, [titleNumber, titles]);

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !videoRef.current.muted;
			setIsMuted(videoRef.current.muted);
		}
	};

	return (
		<div className="grid grid-cols-1 gap-8 px-10 py-10 mt-14 items-center lg:grid-cols-2">
			<div className="flex gap-4 flex-col items-center md:items-start">
				<div className="flex gap-8 flex-col">
					<h1 className="text-5xl md:text-6xl max-w-2xl tracking-tighter font-regular text-center md:text-left md:mr-20">
						<span className="text-spektr-cyan-50">
							Create music for your video that is
						</span>
						<span className="relative flex w-full overflow-hidden justify-center md:justify-start md:pb-4 md:pt-1">
							&nbsp;
							{titles.map((title, index) => (
								<motion.span
									key={index}
									className="absolute font-semibold"
									initial={{ opacity: 0, y: '-100' }}
									transition={{
										type: 'spring',
										stiffness: 50,
									}}
									animate={
										titleNumber === index
											? {
													y: 0,
													opacity: 1,
											  }
											: {
													y:
														titleNumber > index
															? -150
															: 150,
													opacity: 0,
											  }
									}
								>
									{title}
								</motion.span>
							))}
						</span>
					</h1>
					<p className="text-xl text-center md:text-left leading-relaxed tracking-tight text-muted-foreground max-w-md">
						Finding the right music for your video can be a daunting
						task. With our AI-powered music generator, you can
						create music that fits your video in seconds.
					</p>
				</div>
				<Link href="/dream">
					<Button size="lg" className="gap-4" variant="default">
						Musify your video!
						<Wand2 className="w-4 h-4" />
					</Button>
				</Link>
			</div>
			<div className="h-96 relative bg-muted rounded-md overflow-hidden">
				<Badge className="absolute top-4 left-4 text-white p-2 rounded-md">
					We made this windmill video more captivating with our music
				</Badge>
				<video
					ref={videoRef}
					className="object-center w-full h-full"
					src="/home.mp4"
					muted={isMuted}
					loop
					autoPlay
				/>
				<Button
					onClick={toggleMute}
					className="absolute bottom-4 right-4 bg-black text-white p-4 rounded-full"
				>
					{isMuted ? (
						<VolumeX className="w-6 h-6" />
					) : (
						<Volume2 className="w-6 h-6" />
					)}
				</Button>
			</div>
		</div>
	);
};

export default Hero;
