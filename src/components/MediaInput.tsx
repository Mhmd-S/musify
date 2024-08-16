import React, { useState } from 'react';

import {
	TrashIcon,
	PauseIcon,
	ArrowUpTrayIcon,
	CheckIcon,
} from '@heroicons/react/24/outline';

type FileUploadFieldProps = {
	name: string;
	label: string;
	file: File | string | null;
	accept: string;
	handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleRemoveFile: () => void;
};

const FileUploadField = ({
	name,
	label,
	file,
	accept,
	handleFileChange,
	handleRemoveFile,
}: FileUploadFieldProps) => {
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
				{file ? (
					<>
						<div className="place-self-start w-full px-2 flex justify-between items-center gap-2">
							<span>
								Uploaded video
							</span>
							<TrashIcon
								className="p-1 size-8 cursor-pointer"
								onClick={() => handleRemoveFile()}
							/>
						</div>
						<video
							className="w-64 aspect-square object-center rounded-3xl"
							src={
								typeof file == 'string'
									? file
									: URL.createObjectURL(file)
							}
							alt="Preview"
						/>
					</>
				) : (
					<>
						<div
							htmlFor={name}
							className={`grid grid-rows-2 grid-cols-1 gap-2 place-items-center text-gray-600 text-center ${
								file && 'hidden'
							} `}
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
							className={`opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer`}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default FileUploadField;
