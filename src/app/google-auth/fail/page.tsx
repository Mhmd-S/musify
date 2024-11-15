'use client';

import { useEffect } from 'react';
import { useAuth } from '@contexts/auth-context';
import { useRouter } from 'next/navigation';
import Spinner from '@components/Spinner';

export default function GoogleAuthFail() {	
	useEffect(() => {
			window.opener.postMessage({ type: 'GOOGLE_AUTH_FAIL' }, '*');
	}, []);

	return (
		<div className="flex h-screen items-center justify-center">
			<Spinner />
		</div>
	);
}
