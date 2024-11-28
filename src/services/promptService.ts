import { api } from '@config/axiosConfig';
import errorHandler, { ErrorResponse } from '@request/errorHandler';
import {
	MusicGenerationBody,
	MusicGenerationResponse,
	MusicGenerationData,
	UserPromptsResponse,
	PromptQueryOptions,
	PaginatedResponse,
	UserPrompts,
	ApiResponse,
} from './types';

const buildQueryString = (options: PromptQueryOptions): string => {
	const params = new URLSearchParams();

	// Add pagination parameters
	if (options.page) params.append('page', options.page.toString());
	if (options.limit) params.append('limit', options.limit.toString());

	// Add sorting parameters
	if (options.sortBy) params.append('sortBy', options.sortBy);
	if (options.sortOrder) params.append('sortOrder', options.sortOrder);

	// Add filter parameters
	if (options.filters) {
		Object.entries(options.filters).forEach(([key, value]) => {
			if (value !== undefined && value !== null) {
				params.append(key, value.toString());
			}
		});
	}

	return params.toString();
};

export const getUserPrompts = async (
	options: PromptQueryOptions = {}
): Promise<UserPrompts> => {
	const queryString = buildQueryString(options);
	const url = `prompts/${queryString ? `?${queryString}` : ''}`;

	const response = await api.request<UserPromptsResponse>({
		method: 'GET',
		url,
	});

	return response.data.data;
};

export const getPrompt = async (
	id: string | string[]
): Promise<MusicGenerationData> => {
	const response = await api.request<MusicGenerationResponse>({
		method: 'GET',
		url: `prompts/${id}`,
	});
	return response.data.data;
};

export const getPromptVideo = async (id: string | string[]): Promise<Blob> => {
	const response = await api.request<Blob>({
		method: 'GET',
		url: `prompts/video/${id}`,
		responseType: 'blob', // Essential for binary data
		headers: {
			Accept: 'video/mp4', // Specify accepted content type
		},
	});

	if (!response) {
		throw new Error('No video data received');
	}

	return response.data;
};

export const generateMusic = async ({
	video,
	snapshots,
	duration,
	type,
	style,
}: MusicGenerationBody): Promise<MusicGenerationData> => {
	try {
		const formData = new FormData();

		// Snapshots file
		snapshots.forEach((snapshot: string, index: number) => {
			const byteCharacters = atob(snapshot.split(',')[1]);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			const blob = new Blob([byteArray], { type: 'image/jpeg' });

			formData.append(`snapshots`, blob, `snapshot_${index}.jpg`);
		});

		// Video file
		const videoBlob = await fetch(video).then((response) =>
			response.blob()
		);
		formData.append('video', videoBlob, 'video.mp4');

		formData.append('duration', duration);
		formData.append('type', type);
		formData.append('style', style);

		const response = await api.request<MusicGenerationResponse>({
			method: 'POST',
			url: `prompts/generate-music`,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data.data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};

export const generateFreeMusic = async ({
	video,
	snapshots,
	duration,
	type,
	style,
}: MusicGenerationBody): Promise<MusicGenerationData> => {
	try {
		const formData = new FormData();

		// Snapshots file
		snapshots.forEach((snapshot: string, index: number) => {
			const byteCharacters = atob(snapshot.split(',')[1]);
			const byteNumbers = new Array(byteCharacters.length);
			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i);
			}
			const byteArray = new Uint8Array(byteNumbers);
			const blob = new Blob([byteArray], { type: 'image/jpeg' });

			formData.append(`snapshots`, blob, `snapshot_${index}.jpg`);
		});

		// Video file
		const videoBlob = await fetch(video).then((response) =>
			response.blob()
		);
		formData.append('video', videoBlob, 'video.mp4');

		formData.append('duration', duration);
		formData.append('type', type);
		formData.append('style', style);

		const response = await api.request<MusicGenerationResponse>({
			method: 'POST',
			url: `prompts/trial/generate-music`,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		});

		return response.data.data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};