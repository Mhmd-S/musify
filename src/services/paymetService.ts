import { api } from '@config/axiosConfig';

import successHandler from '@request/successHandler';

import { PaymentFields } from './types';

export const submitPayment = async (paymentDetails: PaymentFields) => {
	const response = await api.request({
		method: 'POST',
		url: 'payments',
		headers: {
			'Content-Type': 'application/json',
		},
		data: {
			...paymentDetails,
		},
	});

	return response.data.data;
};


