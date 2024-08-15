import { UploadWidgetConfig } from '@bytescale/upload-widget';
import { UploadDropzone } from '@bytescale/upload-widget-react';
import { UploadWidgetOnUpdateEvent } from '@bytescale/upload-widget';

type UploadWidgetProps = {
	handleOnUpdate: ({
		uploadedFiles,
	}: UploadWidgetOnUpdateEvent) => Promise<void>;
};

const options: UploadWidgetConfig = {
	apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
		? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
		: 'free',
	maxFileCount: 1,
	mimeTypes: ['image/jpeg', 'image/png', 'image/jpg'],
	editor: { images: { crop: false } },
	styles: {},
};

const UploadWidget: React.FC<UploadWidgetProps> = ({ handleOnUpdate }) => {
	return (
		<UploadDropzone
			options={options}
			onUpdate={handleOnUpdate}
			width="670px"
			height="250px"
		/>
	);
};

export default UploadWidget;
