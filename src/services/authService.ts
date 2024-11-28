import { api } from '@config/axiosConfig';
import errorHandler, { ErrorResponse } from '@request/errorHandler';

import {
	SignupFields,
	SigninFields,
	SigninResponse,
} from './types';

export const me = async () => {
	try {
		const response = await api.request({
			method: 'GET',
			url: `/auth/me`,
		});

		return response.data.data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};

export const signup = async (signupFields: SignupFields) => {
	try {
		const response = await api.request({
			method: 'POST',
			url: `auth/signup`,
			data: signupFields,
		});

		return response.data.data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};

export const login = async (signinFields: SigninFields) => {
	try {
		const response = await api.request({
			method: 'POST',
			url: `auth/login`,
			data: signinFields,
		});

		return response.data.data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};


export const googleAuth = async (): Promise<SigninResponse> => {
	try {
		const response = await api.request({
			method: 'GET',
			url: `/auth/google`,
		});

		return response.data.data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};

export const signout = async (): Promise<void> => {
	try {
		const response = await api.request({
			method: 'POST',
			url: `/signout`,
		});

		return response.data.data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};
