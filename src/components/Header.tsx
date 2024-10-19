import Link from 'next/link';
import { MusicalNoteIcon } from '@heroicons/react/24/outline';

const Header = () => (
    <Link href="#" className="flex items-center gap-2 -m-1.5 p-1.5 font-bold text-3xl">
        <MusicalNoteIcon aria-hidden="true" className="size-14 p-2 border-2 border-pink-600 rounded-full" />
        <span className="text-6xl border-b-2 border-pink-600 pb-2">Musify</span>
    </Link>
);

export default Header;