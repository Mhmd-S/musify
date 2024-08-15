import { useState } from 'react';


export default function DreamPage() {
	const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
	const [restoredImage, setRestoredImage] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
	const [sideBySide, setSideBySide] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [photoName, setPhotoName] = useState<string | null>(null);

	const options: UploadWidgetConfig = {
		apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
			? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
			: 'free',
		maxFileCount: 1,
		mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
		editor: { images: { crop: false } },
		styles: {
			colors: {
				primary: '#2563EB', // Primary buttons & links
				error: '#d23f4d', // Error messages
				shade100: '#fff', // Standard text
				shade200: '#fffe', // Secondary button text
				shade300: '#fffd', // Secondary button text (hover)
				shade400: '#fffc', // Welcome text
				shade500: '#fff9', // Modal close button
				shade600: '#fff7', // Border
				shade700: '#fff2', // Progress indicator background
				shade800: '#fff1', // File item background
				shade900: '#ffff', // Various (draggable crop buttons, etc.)
			},
		},
	};

	const uploadWidget = () => (
		<UploadDropzone
			options={options}
			onUpdate={({ uploadedFiles }) => {
				if (uploadedFiles.length !== 0) {
					const image = uploadedFiles[0];
					const imageName = image.originalFile.originalFileName;
					const imageUrl = UrlBuilder.url({
						accountId: image.accountId,
						filePath: image.filePath,
						options: {
							transformation: 'preset',
							transformationPreset: 'thumbnail',
						},
					});
					setPhotoName(imageName);
					setOriginalPhoto(imageUrl);
					generateMusic(imageUrl);
				}
			}}
			width="670px"
			height="250px"
		/>
	);

	async function generateMusic(fileUrl: string) {
		await new Promise((resolve) => setTimeout(resolve, 200));
		setLoading(true);
		const res = await fetch('/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ imageUrl: fileUrl, theme, room }),
		});

		let newPhoto = await res.json();
		if (res.status !== 200) {
			setError(newPhoto);
		} else {
			setRestoredImage(newPhoto[1]);
		}
		setTimeout(() => {
			setLoading(false);
		}, 1300);
	}

	return (
		<div className="h-screen bg-white isolate flex flex-col justify-evenly items-center">
			<div
				aria-hidden="true"
				className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
				/>
			</div>
			<div>
				<UploadWidget />
			</div>
			<div
				aria-hidden="true"
				className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
			>
				<div
					style={{
						clipPath:
							'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
					}}
					className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
				/>
			</div>
		</div>
	);
}
