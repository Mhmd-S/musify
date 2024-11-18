'use client';

import { useEffect } from 'react';
import { useAuth } from '@contexts/auth-context';
import { useRouter } from 'next/navigation';
import Spinner from '@components/Spinner';

export default function GoogleAuthSuccess() {
    const { checkAuth, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const runAuthSuccess = async () => {
            await checkAuth();

            if (user) {
                // Use global callback if available
                if ((window as any).authSuccessCallback) {
                    (window as any).authSuccessCallback(user);
                    
                    // Optional: Clean up the callback
                    delete (window as any).authSuccessCallback;
                }
            }
        };

        runAuthSuccess();
    }, [user]);

    return (
        <div className="flex h-screen items-center justify-center">
            <Spinner />
        </div>
    );
}