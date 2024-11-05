import { useState, forwardRef } from 'react';

import { Upload } from 'lucide-react';

import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';

type FileUploadFieldProps = {
	name: string;
	file: File | string | null;
	accept: string;
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveFile: () => void;
};

const FileUploadField = forwardRef<HTMLVideoElement, FileUploadFieldProps>(
	({ name, file, accept, handleFileChange }, ref) => {
		const [error, setError] = useState<string | null>(null);

		const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
			setError(null);

			const file = event.target.files?.[0];
			const maxDuration = 190; // 190 seconds

			if (file) {
				if (file.type !== 'video/mp4') {
					setError('Only MP4 files are allowed.');
					event.target.value = ''; // Clear the input
				} else {
					const video = document.createElement('video');
					video.preload = 'metadata';

					video.onloadedmetadata = () => {
						window.URL.revokeObjectURL(video.src);
						if (video.duration > maxDuration) {
							setError(
								'Video duration exceeds 190 seconds limit.'
							);
							event.target.value = ''; // Clear the input
						} else {
							handleFileChange(event);
						}
					};

					video.src = URL.createObjectURL(file);
				}
			}
		};

		return (
			<div className="flex items-center justify-center w-full">
				{error && <Badge variant="destructive">{error}</Badge>}

				{file ? (
					<video
						ref={ref}
						className="w-48 aspect-square object-center rounded-3xl"
						autoPlay
						loop
						muted
						src={
							typeof file === 'string'
								? file
								: URL.createObjectURL(file)
						}
					/>
				) : (
					<Label
						htmlFor={name}
						className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted/50"
					>
						<div className="flex flex-col items-center justify-center pt-5 pb-6">
							<Upload className="w-8 h-8 mb-4 text-muted-foreground" />
							<p className="mb-2 text-sm text-muted-foreground">
								<span className="font-semibold">
									Click to upload
								</span>{' '}
								or drag and drop
							</p>
							<p className="px-3 text-center text-xs text-muted-foreground">
								Only MP4 files are allowed, and maximum 190 seconds.
							</p>
						</div>
						<Input
							id={name}
							type="file"
							accept={accept}
							className="hidden"
							onChange={handleInput}
						/>
					</Label>
				)}
			</div>
		);
	}
);

FileUploadField.displayName = 'FileUploadField';

export default FileUploadField;
