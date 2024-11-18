'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Spinner from '@components/Spinner';
import { toast } from 'react-toastify';

export default function GoogleAuthFail() {	
    const router = useRouter();

    useEffect(() => {
        // Use global callback or fallback to default handling
        if ((window as any).authFailCallback) {
            (window as any).authFailCallback();
            delete (window as any).authFailCallback;
        } else {
            toast.error('Google authentication failed');
            router.push('/login');
        }
    }, []);

    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner />
        </div>
    );
}