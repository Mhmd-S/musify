import { UrlBuilder } from '@bytescale/sdk';
import { UploadWidgetConfig } from '@bytescale/upload-widget';
import { UploadDropzone } from '@bytescale/upload-widget-react';

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

export default function UploadWidget() {
	return (
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
}
