'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as authService from '@services/authService';
import { api } from '@config/axiosConfig';

interface User {
	id: string;
	email: string;
	name?: string;
	// add other user properties
}

interface AuthContextType {
	user: User | null;
	isLoading: boolean;
	isAuthenticated: boolean;
	checkAuth: () => Promise<void>;
	googleAuth: () => Promise<void>;
	login: (email: string, password: string) => Promise<void>;
	signup: (email: string, password: string, name: string) => Promise<void>;
	logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	let isAuthenticated = false;
	useEffect(() => {
		checkAuth();
	}, []);

	const checkAuth = async () => {
		try {
			const response = await authService.me();
			setUser(response.data.user);
			isAuthenticated = true;
		} catch (error) {
			setUser(null);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			setIsLoading(true);
			const response = await authService.signin({ email, password });
			setUser(response.user);
			setIsLoading(false);
		} catch (error) {
			throw error;
		}
	};

	const googleAuth = async () => {
		try {
			setIsLoading(true);
			const response = await authService.googleAuth();
			setUser(response.user);
			setIsLoading(false);
		} catch (error) {
			throw error;
		}
	}

	const signup = async (email: string, password: string, name: string) => {
		try {
			setIsLoading(true);
			const response = await authService.signup({
				email,
				password,
				name,
			});
			setUser(response.user);
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
			isAuthenticated = false;
			setIsLoading(false);
			router.push('/login');
		} catch (error) {
			console.error('Logout error:', error);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				isLoading,
				isAuthenticated: !!user,
				checkAuth,
				googleAuth,
				login,
				signup,
				logout,
			}}
		>
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
