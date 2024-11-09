import { api } from '@config/axiosConfig';
import successHandler from '@request/successHandler';

export const getReciept = async (receiptId: string) => {
	const response = await api.request({
		method: 'GET',
		url: `receipts/${receiptId}`,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const { status, data } = response;

	successHandler(
		{ data, status },
		{
			notifyOnSuccess: false,
			notifyOnFailed: true,
		}
	);

	return data;
};

export const getReciepts = async () => {
	const response = await api.request({
		method: 'GET',
		url: `receipt/user`,
		headers: {
			'Content-Type': 'application/json',
		},
	});

	const { status, data } = response;

	successHandler(
		{ data, status },
		{
			notifyOnSuccess: false,
			notifyOnFailed: true,
		}
	);

	return data;
};
