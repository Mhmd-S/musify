'use client';

import { useAuth } from '@contexts/auth-context';
import { SidebarProvider, SidebarTrigger } from '@components/ui/sidebar';
import { AppSidebar } from '@components/app-sidebar';
import Spinner from '@components/Spinner';
import { usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  const pathname = usePathname();

  const getHeaderTitle = (path: string) => {
    const segments = path.split('/').filter(Boolean);
    if (segments.length === 0) return 'Dashboard';
		if (segments[0] === 'checkout') return 'Checkout';
    return segments[segments.length - 1].charAt(0).toUpperCase() + segments[segments.length - 1].slice(1);
  };

  return (
    <SidebarProvider>
      {isLoading ? (
        <div className="w-screen h-screen flex items-center justify-center min-h-screen">
          <Spinner />
        </div>
      ) : (
        <div className="flex w-full h-screen overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="flex flex-col h-full">
              <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                  <h1 className="text-2xl font-semibold text-gray-900">
                    {getHeaderTitle(pathname)}
                  </h1>
                  <SidebarTrigger className="md:hidden" />
                </div>
              </header>
              <div className="flex-1 p-4 sm:p-6 lg:p-8 *:rounded-md">
                {children}
              </div>
            </div>
          </main>
        </div>
      )}
    </SidebarProvider>
  );
}