'use client';

import { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import * as authService from '@services/authService';
import { api } from '@config/axiosConfig';
import { toast } from 'react-toastify';

import { User } from '@services/types';

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	checkAuth: () => Promise<void>;
	handleGoogleAuth: () => Promise<void>;
	setIsLoading: (isLoading: boolean) => void;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string, name: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const router = useRouter();

	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const user = await authService.me();
			setUser(user);
		} catch (error) {
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			const user = await authService.login({ email, password });
			console.log(user)
			setUser(user);
			router.push('/dashboard');
			setIsLoading(false);
		} catch (error) {
			throw error;
		}
	};

	const handleGoogleAuth = async () => {
		const width = 500;
		const height = 600;
		const left = window.screen.width / 2 - width / 2;
		const top = window.screen.height / 2 - height / 2;

		const popup = window.open(
			(process.env.NODE_ENV === 'production'
				? process.env.NEXT_PUBLIC_BACKEND_SERVER
				: process.env.NEXT_PUBLIC_DEV_BACKEND_SERVER) + '/auth/google',
			'Google Login',
			`width=${width},height=${height},top=${top},left=${left}`
		);

		if (popup) {
			const timer = setInterval(async() => {
				if (popup.closed) {
					clearInterval(timer);
					await checkAuth();
					router.push('/dashboard');
				}
			}, 3000);
		}
	};

	const signup = async (email: string, password: string, name: string) => {
		try {
			setIsLoading(true);
			const response = await authService.signup({
				email,
				password,
				name,
			});
			setUser(response);
			router.push('/dashboard');
			setIsLoading(false);
		} catch (error) {
			throw error;
		}
	};

	const logout = async () => {
		try {
			setIsLoading(true);
			await api.post('/auth/logout');
			setUser(null);
			router.push('/login');
			setIsLoading(false);
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	const contextValue = useMemo(
		() => ({
			user,
			isLoading,
			isAuthenticated: !!user,
			checkAuth,
			handleGoogleAuth,
			setIsLoading,
			login,
			signup,
			logout,
		}),
		[user, isLoading]
	);

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
}

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
