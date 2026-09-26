'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export function Pagination({ totalPages }: { totalPages: number }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;

    function createPageURL(pageNumber: number) {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    }

    return (
        <div className="flex justify-center gap-4 py-8">
            {currentPage > 1 && (
                <Link href={createPageURL(currentPage - 1)}>Previous</Link>
            )}
            <span>Page {currentPage} of {totalPages}</span>
            {currentPage < totalPages && (
                <Link href={createPageURL(currentPage + 1)}>Next</Link>
            )}
        </div>
    );
}