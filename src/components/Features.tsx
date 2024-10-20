import { Check, Link, Wand2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Feature = () => (
	<div className="w-full px-10 lg:py-20">
		<div className="container mx-auto">
			<div className="flex gap-4 py-20 lg:py-40 flex-col items-start">
				<div>
					<Badge>Our Features</Badge>
				</div>
				<div className="flex gap-2 flex-col">
					<h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
						Transform Your Videos with Music!
					</h2>
					<p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
						Enhancing your video content has never been easier.
					</p>
				</div>
				<div className="flex gap-10 pt-12 flex-col w-full">
					<div className="grid grid-cols-1 md:grid-cols-2 items-start lg:grid-cols-3 gap-10">
						<div className="flex flex-row gap-6 w-full items-start">
							<Check className="w-4 h-4 mt-2 text-primary" />
							<div className="flex flex-col gap-1">
								<p>Simple Upload Process</p>
								<p className="text-muted-foreground text-sm">
									Upload your video effortlessly.
								</p>
							</div>
						</div>
						<div className="flex flex-row gap-6 items-start">
							<Check className="w-4 h-4 mt-2 text-primary" />
							<div className="flex flex-col gap-1">
								<p>Quick Music Integration</p>
								<p className="text-muted-foreground text-sm">
									Attach music tracks to your videos
									instantly.
								</p>
							</div>
						</div>
						<div className="flex flex-row gap-6 items-start">
							<Check className="w-4 h-4 mt-2 text-primary" />
							<div className="flex flex-col gap-1">
								<p>User-Friendly Interface</p>
								<p className="text-muted-foreground text-sm">
									Enjoy a straightforward and intuitive
									experience.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full py-24 flex flex-col items-center gap-12">
				<h3 className="text-3xl md:text-5xl tracking-tighter font-regular">
					What are you waiting for? Get started now!
				</h3>
				<Link href="/dream">
					<Button size="lg" className="gap-4" variant="default">
						Musify your video!
						<Wand2 className="w-4 h-4" />
					</Button>
				</Link>
			</div>
		</div>
	</div>
);

export default Feature;
