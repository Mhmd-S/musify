'use client';

import { useEffect } from 'react';
import { useAuth } from '@contexts/auth-context';
import Spinner from '@components/Spinner';

export default function GoogleAuthSuccess() {
    const { checkAuth } = useAuth();

    useEffect(() => {
        const sendAuthSuccess = async () => {
            try {
                await checkAuth();
                window.opener.postMessage({ type: 'GOOGLE_AUTH_SUCCESS' }, window.opener.location.origin);
            } catch (error) {
                console.error('Authentication failed:', error);
                window.opener.postMessage({ type: 'GOOGLE_AUTH_FAILED' }, window.opener.location.origin);
            } finally {
                window.close();
            }
        };

        sendAuthSuccess();
    }, [checkAuth]);

    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner />
        </div>
    );
}
