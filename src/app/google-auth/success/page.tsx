'use client';

import { useEffect } from 'react';
import { useAuth } from '@contexts/auth-context';
import { useRouter } from 'next/navigation';
import Spinner from '@components/Spinner';

export default function GoogleAuthSuccess() {

	const { checkAuth, user } = useAuth();
	
	useEffect(() => {
		
		checkAuth();
		if (user) {
			console.log('User is authenticated:', user);
			console.log('User is authenticated:', window);
			window.close()
		}
	}, [user]);

	return (
		<div className="flex h-screen items-center justify-center">
			<Spinner />
		</div>
	);
}
