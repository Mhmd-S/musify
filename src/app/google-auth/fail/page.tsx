import { useEffect } from 'react'
import Spinner from '@components/Spinner'

export function GoogleAuthFail() {
	useEffect(() => {
			window.close();
	}, []);

	return (
			<div className="flex h-screen items-center justify-center">
					<Spinner />
			</div>
	);
}