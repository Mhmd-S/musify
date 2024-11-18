'use client';

import { useEffect } from 'react';
import { useAuth } from '@contexts/auth-context';
import { useRouter } from 'next/navigation';
import Spinner from '@components/Spinner';

export default function GoogleAuthSuccess() {

	const { checkAuth, user } = useAuth();
	
	const router = useRouter();
	useEffect(() => {
		console.log(user)
		if (user) {
			window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, '*');
			window.close()
		}
		checkAuth();
	}, [user]);

	return (
		<div className="flex h-screen items-center justify-center">
			<Spinner />
		</div>
	);
}
