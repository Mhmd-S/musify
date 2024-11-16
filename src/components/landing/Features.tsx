'use client';

import { Check } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const features = [
	{
		title: 'Context-Aware Composition',
		description:
			'Muzica reads your video to generate music that matches the vibe and story of each scene.',
		icon: Check,
	},
	{
		title: 'Copyright-Free Music',
		description:
			'Muzica’s music is royalty-free, so you can use it in your videos without worrying about copyright issues.',
		icon: Check,
	},
	{
		title: 'Time-Saving and Unique',
		description:
			'No need to search for hours for the right track—Muzica creates custom music instantly, giving each video a unique sound.',
		icon: Check,
	},
];

const Feature = () => {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, amount: 0.3 });

	const containerVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.5,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<section
			aria-label="Features Section"
			itemScope
			itemType="https://schema.org/ItemList"
		>
			<meta itemProp="name" content="AI Music Generator Features" />
			<meta
				itemProp="description"
				content="Key features of our AI music generation platform"
			/>

			<motion.div
				ref={ref}
				initial="hidden"
				animate={isInView ? 'visible' : 'hidden'}
				variants={containerVariants}
				className="w-full px-20"
			>
				<div className="container mx-auto">
					<div className="flex gap-4 py-30 flex-col items-start">
						<motion.div variants={itemVariants}>
							<Badge>Our Features</Badge>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="flex gap-2 flex-col"
						>
							<h2
								className="text-3xl md:text-5xl py-4 tracking-tighter lg:max-w-xl font-regular"
								itemProp="headline"
							>
								Transform Your Videos with Music!
							</h2>
							<p
								className="hidden md:block text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-foreground"
								itemProp="description"
							>
								Enhancing your video content has never been
								easier with our AI-powered music generation.
							</p>
						</motion.div>

						<motion.div
							variants={itemVariants}
							className="flex gap-10 pt-12 flex-col w-full"
						>
							<div className="grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 gap-10">
								{features.map((feature, index) => (
									<motion.div
										key={index}
										variants={itemVariants}
										className="flex flex-row gap-6 w-full items-start"
										itemProp="itemListElement"
										itemScope
										itemType="https://schema.org/ListItem"
									>
										<feature.icon className="w-8 h-8 text-lg text-primary" />
										<div>
											<meta
												itemProp="position"
												content={String(index + 1)}
											/>
											<div itemProp="item">
												<p
													itemProp="name"
													className="font-medium"
												>
													{feature.title}
												</p>
												<p
													itemProp="description"
													className="hidden md:block text-foreground text-sm"
												>
													{feature.description}
												</p>
											</div>
										</div>
									</motion.div>
								))}
							</div>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</section>
	);
};

export default Feature;
