import { Check } from 'lucide-react';
import { Badge } from '@components/ui/badge';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

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
				staggerChildren: 0.1 
			} 
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 }
	};

	return (
		<motion.div
			ref={ref}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			variants={containerVariants}
			className="w-full px-20 lg:py-20"
		>
			<div className="container mx-auto">
				<div className="flex gap-4 py-20 lg:py-40 flex-col items-start">
					<motion.div variants={itemVariants}>
						<Badge>Our Features</Badge>
					</motion.div>
					<motion.div variants={itemVariants} className="flex gap-2 flex-col">
						<h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
							Transform Your Videos with Music!
						</h2>
						<p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
							Enhancing your video content has never been easier.
						</p>
					</motion.div>
					<motion.div variants={itemVariants} className="flex gap-10 pt-12 flex-col w-full">
						<div className="grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 gap-10">
							{[
								{ title: "Simple Upload Process", description: "Upload your video effortlessly." },
								{ title: "Quick Music Integration", description: "Attach music tracks to your videos instantly." },
								{ title: "User-Friendly Interface", description: "Enjoy a straightforward and intuitive experience." }
							].map((feature, index) => (
								<motion.div key={index} variants={itemVariants} className="flex flex-row gap-6 w-full items-start">
									<Check className="w-4 h-4 mt-2 text-primary" />
									<div className="flex flex-col gap-1">
										<p>{feature.title}</p>
										<p className="text-muted-foreground text-sm">{feature.description}</p>
									</div>
								</motion.div>
							))}
						</div>
					</motion.div>
				</div>
			</div>
		</motion.div>
	);
};

export default Feature;
