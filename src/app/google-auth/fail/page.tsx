'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@components/Spinner';

export default function GoogleAuthFail() {	

	const router = useRouter();

	useEffect(() => {
			router.push('/login');
	}, []);

	return (
		<div className="flex h-screen items-center justify-center">
			<Spinner />
		</div>
	);
}
