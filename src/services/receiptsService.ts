import { api } from '@config/axiosConfig';

export const getReciept = async (receiptId: string) => {
	const response = await api.request({
		method: 'GET',
		url: `receipts/${receiptId}`,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response.data;
};

export const getReciepts = async () => {
	const response = await api.request({
		method: 'GET',
		url: `receipts/user`,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	return response.data;
};
