import { useState, forwardRef } from 'react';

import { Badge } from './ui/badge';

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
			<div
				className={`relative min-h-60 w-full md:w-full px-4 grid grid-col-1 place-items-center border rounded-md border-gray-900/25 ${
					file ? 'border-solid bg-primary' : 'border-dashed bg-muted'
				}`}
			>
				{error && <Badge variant="destructive">{error}</Badge>}

				{file ? (
					<>
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
					</>
				) : (
					<>
						<div className="grid grid-rows-2 grid-cols-1 gap-2 place-items-center text-gray-600 text-center">
							<span className="text-sm">
								Click to <strong>upload a video </strong>
								or drag and drop
							</span>
							<span className="text-xs text-gray-400">
								Only MP4 files are allowed, and maximum 190 seconds.
							</span>
						</div>
						<input
							type="file"
							accept={accept}
							name={name}
							onInput={handleInput}
							className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
						/>
					</>
				)}
			</div>
		);
	}
);

FileUploadField.displayName = 'FileUploadField';

export default FileUploadField;
