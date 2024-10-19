'use client';

import { useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';

import { MoveRight, PhoneCall } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Hero = () => {
	const [titleNumber, setTitleNumber] = useState(0);
	const titles = useMemo(
		() => ['promotional', 'graduate', 'wonderful', 'beautiful', 'smart'],
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

	return (
		<div className="grid grid-cols-1 gap-8 px-10 py-10 mt-14 items-center lg:grid-cols-2">
			<div className="flex gap-4 flex-col">
				<div className="flex gap-8 flex-col">
					<h1 className="text-5xl md:text-6xl max-w-2xl tracking-tighter font-regular">
						<span className="text-spektr-cyan-50">
							Musify
						</span>
						<span className="relative flex w-full overflow-hidden md:pb-4 md:pt-1">
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
					<p className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-md text-left">
						Finding the write music for your video can be a daunting
						task. With our AI-powered music generator, you can
						create music that fits your video in seconds.
					</p>
				</div>
				<div className="flex flex-row gap-4">
					<Button size="lg" className="gap-4" variant="outline">
						Jump on a call <PhoneCall className="w-4 h-4" />
					</Button>
					<Button size="lg" className="gap-4">
						Sign up here <MoveRight className="w-4 h-4" />
					</Button>
				</div>
			</div>
			<div className="bg-muted rounded-md aspect-square"></div>
		</div>
	);
};

export default Hero;
