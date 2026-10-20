"use client"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

interface ProductTableFooterProps {
    currentPage: number,
    totalPage: number,
    isLastPage: boolean,
    pageSize: number,
    isFirstPage: boolean,
}

const ProductTableFooter = ({ currentPage, isFirstPage, isLastPage, pageSize, totalPage }: ProductTableFooterProps) => {
    const searchParams = useSearchParams();
    const path = usePathname();
    const router = useRouter();

    const handleFilter = (key: string, pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set(key, String(pageNumber));

        router.replace(`${path}?${params.toString()}`, {
            scroll: false
        })
    }

    console.log(pageSize + " page size")
    return (
        <footer className="flex flex-col gap-3 border-t border-outline-variant bg-surface-container-low px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{currentPage + 1}</span> of <span className="font-semibold text-foreground">{totalPage}</span> products
            </p>
            <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                <label className="flex items-center gap-2 text-xs text-muted-foreground">
                    Rows per page
                    <select value={pageSize} onChange={(event) => handleFilter("pageSize", +event.target.value)} className="h-8 rounded-sm border border-outline-variant bg-card px-2 font-semibold text-foreground outline-none focus:border-secondary">
                        {[5, 10, 15, 20, 25, 50].map((size) => <option key={size} value={size}>{size}</option>)}
                    </select>
                </label>
                <div className="flex items-center gap-1">
                    <button type="button" title="First page" aria-label="First page" disabled={isFirstPage} onClick={() => handleFilter("page", 0)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronsLeft className="size-4" /></button>
                    <button type="button" title="Previous page" aria-label="Previous page" disabled={isFirstPage} onClick={() => handleFilter("page", currentPage - 1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronLeft className="size-4" /></button>
                    <span className="min-w-16 text-center text-xs font-semibold text-foreground">{currentPage + 1} / {totalPage}</span>
                    <button type="button" title="Next page" aria-label="Next page" disabled={isLastPage} onClick={() => handleFilter("page", currentPage + 1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronRight className="size-4" /></button>
                    <button type="button" title="Last page" aria-label="Last page" disabled={isLastPage} onClick={() => handleFilter("page", totalPage - 1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronsRight className="size-4" /></button>
                </div>
            </div>
        </footer>)
}

export default ProductTableFooter