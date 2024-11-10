'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import useResponsive from '@hooks/useResponsive';
import { Button } from '@components/ui/button';
import VideoPlayer from '@components/VideoPlayer';

const Hero = () => {
	const { screenSize, isMobile } = useResponsive();

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
	};

	return (
		<motion.div
			className="grid grid-cols-1 gap-24 md:gap-8 px-10 py-36 items-center lg:py-30 lg:grid-cols-2"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<motion.div
				className="flex gap-32 md:gap-6 flex-col items-center md:items-start"
				variants={itemVariants}
			>
				<motion.div
					className="flex gap-16 md:gap-8 flex-col"
					variants={itemVariants}
				>
					<motion.h1
						className="text-5xl md:text-6xl max-w-2xl tracking-tighter font-regular text-center md:text-left md:mr-20"
						variants={itemVariants}
					>
						<strong>AI-Powered</strong> Music That <strong>Understands</strong> Your
						Video
					</motion.h1>
					<motion.p
						className="text-lg text-center md:text-left leading-relaxed tracking-tight text-foreground max-w-md"
						variants={itemVariants}
					>
						Muzica doesn’t just make music; it understands your
						video’s context—whether it’s a fast-paced action scene,
						a heartwarming family moment, or an inspiring travel
						montage.
					</motion.p>
				</motion.div>
				<motion.div variants={itemVariants}>
					<Link href="/lab">
						<Button size="lg" className="gap-4" variant="default">
							Try for free now!
							<Wand2 className="w-4 h-4" />
						</Button>
					</Link>
				</motion.div>
			</motion.div>
			<motion.div variants={itemVariants}>
				<VideoPlayer
					src={isMobile ? '/home2.mp4' : '/home.mp4'}
					badgeText="Have a listen and see the magic!"
				/>
			</motion.div>
		</motion.div>
	);
};

export default Hero;
