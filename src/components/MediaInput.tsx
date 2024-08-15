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
		<div className="h-fit">
			<label
				htmlFor={name}
				className="block mb-2 text-sm font-medium leading-6 text-gray-900"
			>
				{label}
			</label>
			<div
				className={`relative h-full w-full px-4 pt-4 border rounded-md border-gray-900/25 ${
					file ? 'border-solid' : 'border-dashed'
				}`}
			>
				{file ? (
					<div className="w-full grid grid-cols-[10%_80%_10%] grid-rows-2 items-center">
						<video
							className="size-24 object-cover rounded-md"
							src={
								typeof file == 'string'
									? file
									: URL.createObjectURL(file)
							}
							alt="Preview"
						/>
						<div className="flex flex-col">
							<text className="text-sm">File_Name</text>
							<text className="text-xs text-gray-400">6 MB</text>
						</div>
						<div className="flex justify-center items-center gap-2 text-gray-300">
							{file ? (
								<CheckIcon className="p-1 size-3 cursor-pointer rounded-full text-white bg-green-500" />
							) : (
								<PauseIcon className="p-1 size-3 cursor-pointer rounded-full" />
							)}
							<TrashIcon
								className="p-1 size-4 cursor-pointer"
								onClick={() => handleRemoveFile()}
							/>
						</div>
					</div>
				) : (
					<>
						<div
							htmlFor={name}
							className={`h-full py-3 grid grid-rows-3 grid-cols-1 gap-2 place-items-center items-center text-gray-600 text-center ${
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
