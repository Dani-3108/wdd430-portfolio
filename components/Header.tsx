import Link from 'next/link';

export default function Header() {
    return (
        <header className="bg-[#043063] text-white py-4 shadow-md">
            <div className="flex justify-between items-center">
                <div id="header-title" className="text-2xl font-bold">Daniel Osorio</div>
                <nav className="px-4">
                    <ul className="flex gap-6">
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                    </ul>
                </nav> 
            </div>
        </header>
  );
}