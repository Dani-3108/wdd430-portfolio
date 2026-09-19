'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
    const pathname = usePathname();

    return (
        <nav className="px-4 flex gap-6">
            <Link
                href="/"
                className={pathname === "/" ? 'active' : ""}
                aria-current={pathname === '/' ? 'page' : undefined} >Home
            </Link>
            <Link
                href="/about"
                className={pathname === "/about" ? 'active' : ""}
                aria-current={pathname === '/about' ? 'page' : undefined} >About
            </Link>
            <Link
                href="/projects"
                className={pathname === "/projects" ? 'active' : ""}
                aria-current={pathname === '/projects' ? 'page' : undefined} >Projects
            </Link>
            <Link
                href="/contact"
                className={pathname === "/contact" ? 'active' : ""}
                aria-current={pathname === '/contact' ? 'page' : undefined} >Contact Us
            </Link>
        </nav>
    );

}