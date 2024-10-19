import { forwardRef } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Spinner from '@/components/Spinner';

type FileUploadFieldProps = {
	name: string;
	label: string;
	file: File | string | null;
	accept: string;
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveFile: () => void;
};

const FileUploadField = forwardRef<HTMLVideoElement, FileUploadFieldProps>(
	(
		{
			name,
			label,
			file,
			accept,
			loading,
			handleFileChange,
			handleRemoveFile,
		},
		ref
	) => {
		return (
			<div className="h-fit w-full">
				<label
					htmlFor={name}
					className="block mb-6 text-lg font-medium leading-6 text-gray-900"
				>
					{label}
				</label>
				<div
					className={`relative min-h-48 w-full p-1 grid grid-col-1 place-items-center border rounded-md border-gray-900/25 ${
						file ? 'border-solid bg-gray-400/25' : 'border-dashed'
					}`}
				>
					{loading ? (
						<>
							<div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
								<Spinner />
							</div>
						</>
					) : file ? (
						<>
							<div className="place-self-start w-full px-2 flex justify-between items-center gap-2">
								<span>Uploaded video</span>
								<TrashIcon
									className="p-1 size-8 cursor-pointer"
									onClick={() => handleRemoveFile()}
								/>
							</div>
							<video
								ref={ref}
								className="w-64 aspect-square object-center rounded-3xl"
								src={
									typeof file === 'string'
										? file
										: URL.createObjectURL(file)
								}
								controls
							/>
						</>
					) : (
						<>
							<div
								className={`grid grid-rows-2 grid-cols-1 gap-2 place-items-center text-gray-600 text-center ${
									file && 'hidden'
								}`}
							>
								<span className="text-sm">
									<span className="font-semibold text-pink-700 text-brand-700">
										Upload a File{' '}
									</span>
									or drag and drop
								</span>
								<span className="text-xs text-gray-400">
									PNG, JPG, GIF up to 3MB
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
			</div>
		);
	}
);

FileUploadField.displayName = 'FileUploadField';

export default FileUploadField;
