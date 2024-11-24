'use client';

import { useEffect } from 'react';
import { useAuth } from '@contexts/auth-context';
import Spinner from '@components/Spinner';

export default function GoogleAuthSuccess() {
	const { isLoading, user } = useAuth();

	useEffect(() => {
		if (user && !isLoading) {
			window.close();
		}
	}, [user, isLoading]);

	return (
		<div className="flex h-screen items-center justify-center">
			<Spinner />
		</div>
	);
}
