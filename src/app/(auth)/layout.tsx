import Image from 'next/image';
import Link from 'next/link';
import Footer from '@components/Footer';

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              height={40}
              width={40}
              alt="Muzica Logo"
              className="rounded-md"
            />
            <h1 className="text-2xl font-bold tracking-tighter text-primary">
              Muzica
            </h1>
          </Link>
          <nav>
            <ul className="flex gap-4">
              <li>
                <Link href="/login" className="text-gray-600 hover:text-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/signup" className="text-gray-600 hover:text-primary">
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
			<main>{children}</main>
			<Footer />
		</>
	);
}
