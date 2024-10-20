import { forwardRef } from 'react';

type FileUploadFieldProps = {
	name: string;
	file: File | string | null;
	accept: string;
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveFile: () => void;
};

const FileUploadField = forwardRef<HTMLVideoElement, FileUploadFieldProps>(
	({ name, file, accept, handleFileChange }, ref) => {
		return (
			<div
				className={`relative min-h-48 w-full md:w-3/4 px-4 grid grid-col-1 place-items-center border rounded-md border-gray-900/25 ${
					file ? 'border-solid bg-primary' : 'border-dashed bg-muted'
				}`}
			>
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
								MP4 up to 50MB
							</span>
						</div>
						<input
							type="file"
							accept={accept}
							name={name}
							onInput={handleFileChange}
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
