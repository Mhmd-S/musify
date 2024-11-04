import { api } from '@config/axiosConfig';
import errorHandler, { ErrorResponse } from '@request/errorHandler';
import successHandler from '@request/successHandler';
import {
	SignupFields,
	SigninFields,
	SigninResponse,
	User,
} from './types';

export const me = async (): Promise<User> => {
	try {
		const response = await api.request({
			method: 'GET',
			url: `/auth/me`,
		});

		const { status, data } = response;

		successHandler(
			{ data, status },
			{
				notifyOnSuccess: false,
				notifyOnFailed: false,
			}
		);

		return data.data.user;
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

		const { data } = response;

		successHandler(
			response,
			{
				notifyOnSuccess: true,
				notifyOnFailed: true,
			}
		);

		return data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};

export const signin = async (signinFields: SigninFields) => {
	try {
		const response = await api.request({
			method: 'POST',
			url: `auth/login`,
			data: signinFields,
		});

		const { status, data } = response;

		successHandler(
			{ data, status },
			{
				notifyOnSuccess: true,
				notifyOnFailed: true,
			}
		);

		return data;
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

		const { status, data } = response;

		successHandler(
			{ data, status },
			{
				notifyOnSuccess: false,
				notifyOnFailed: true,
			}
		);

		return data;
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

		const { status, data } = response;

		successHandler(
			{ data, status },
			{
				notifyOnSuccess: true,
				notifyOnFailed: true,
			}
		);

		return data;
	} catch (error) {
		return errorHandler(error as ErrorResponse);
	}
};
