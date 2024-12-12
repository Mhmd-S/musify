'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@contexts/auth-context';
import Spinner from '@components/Spinner';

export default function GoogleAuthSuccess() {

	const router = useRouter();

	const { isLoading, user } = useAuth();

	useEffect(() => {
		if (user && !isLoading) {
			router.push('/dashboard');
		}
	}, [user, isLoading]);

	return (
		<div className="flex h-screen items-center justify-center">
			<Spinner />
		</div>
	);
}
