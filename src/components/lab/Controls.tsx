import React, { SetStateAction, Dispatch } from 'react';

import { Music, RefreshCw } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CardFooter,
} from '@components/ui/card';
import InputSelect from '@components/ui/InputSelect';
import { Label } from '@components/ui/label';
import { Switch } from '@components/ui/switch';
import { Slider } from '@components/ui/slider';
import { Button } from '@components/ui/button';

const styleOptions = [
	{ value: 'orchestral', label: 'Orchestral' },
	{ value: 'chamber', label: 'Chamber Music' },
	{ value: 'ambient', label: 'Ambient' },
	{ value: 'pop', label: 'Modern Pop' },
	{ value: 'hip-hop', label: 'Hip Hop' },
];

const videoTypeOptions = [
	{ value: 'promotional', label: 'Promotional' },
	{ value: 'tutorial', label: 'Tutorial' },
	{ value: 'vlog', label: 'Vlog' },
	{ value: 'product-showcase', label: 'Product Showcase' },
	{ value: 'testimonial', label: 'Testimonial' },
	{ value: 'teaser', label: 'Teaser/Preview' },
	{ value: 'announcement', label: 'Announcement' },
	{ value: 'event-highlight', label: 'Event Highlight' },
];

type ControlsProps = {
	style: string;
	videoType: string;
	loading: boolean;
	createMusic: () => Promise<void>;
	setStyle: Dispatch<SetStateAction<string>>;
	setVideoType: Dispatch<SetStateAction<string>>;
};

const Controls = ({
	style,
	videoType,
	loading,
	createMusic,
	setStyle,
	setVideoType,
}: ControlsProps) => {
	return (
		<Card className="h-full">
			<CardHeader>
				<CardTitle>Music Generation Settings</CardTitle>

				<CardDescription>
					Customize the music for your video
				</CardDescription>
			</CardHeader>

			<CardContent className="space-y-6">
				<div className="grid grid-cols-1 gap-4">
					<InputSelect
						id="style"
						label="Style"
						value={style}
						onValueChange={setStyle}
						options={styleOptions}
						placeholder="Select a style"
					/>

					<InputSelect
						id="videoType"
						label="Video Type"
						value={videoType}
						onValueChange={setVideoType}
						options={videoTypeOptions}
						placeholder="Select video type"
					/>
				</div>

				{/* <div className="space-y-2">
					<Label>Mood</Label>
					<Slider defaultValue={[50]} max={100} step={1} />
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>Calm</span>
						<span>Neutral</span>
						<span>Energetic</span>
					</div>
				</div> */}

				{/* <div className="space-y-2">
					<Label>Tempo (BPM)</Label>
					<Slider defaultValue={[120]} min={60} max={200} step={1} />
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>60</span>
						<span>120</span>
						<span>200</span>
					</div>
				</div> */}

				<div className="flex items-center space-x-2">
					<Switch id="sync-video" />
					<Label htmlFor="sync-video">
						Sync music to video tempo
					</Label>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					onClick={createMusic}
					disabled={loading}
					className="w-full"
				>
					{loading ? (
						<>
							<RefreshCw className="mr-2 h-4 w-4 animate-spin" />
							Generating...
						</>
					) : (
						<>
							<Music className="mr-2 h-4 w-4" />
							Generate Music
						</>
					)}
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Controls;
