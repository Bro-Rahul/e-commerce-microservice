'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Suspense, useState } from 'react'
import {
    ArrowDownToLine,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Plus,
} from 'lucide-react'
import SearchFilterInputs from '@/components/sellers/products/SearchFilterInputs'
import { Skeleton } from '@/components/ui/skeleton'
import useFetchDebounce from '@/hooks/useFetchDebounce'
import { sellerRepository } from '@/http/seller/productHttp'
import { SellerProductListingType } from '@/types/products/SellerProductListType'
import { ProductStatusType, SellerProductListFilterType } from '@/types/searchFilter/sellerFilterTypes'
import { usePathname, useSearchParams } from 'next/navigation'

function getStockHealth(stock: number) {
    if (stock === 0) return { label: 'Empty', color: 'text-destructive', barColor: 'bg-destructive', width: '0%' }
    if (stock < 25) return { label: 'Critical low', color: 'text-destructive', barColor: 'bg-destructive', width: '8%' }
    if (stock < 600) return { label: 'Moderate', color: 'text-amber-700 dark:text-amber-300', barColor: 'bg-amber-500 dark:bg-amber-400', width: '45%' }
    return { label: 'Healthy', color: 'text-emerald-700 dark:text-emerald-400', barColor: 'bg-emerald-600 dark:bg-emerald-400', width: '85%' }
}

function getStatusStyle(status: ProductStatusType) {
    if (status === 'ACTIVE') return 'border-tertiary-container/30 bg-tertiary-container/10 text-tertiary-container dark:border-tertiary-container dark:bg-tertiary-container/50 dark:text-white'
    if (status === 'PENDING_REVIEW' || status === 'DRAFT') return 'border-secondary/30 bg-secondary/15 text-secondary-container dark:border-secondary-container dark:bg-secondary-container/50 dark:text-white'
    if (status === 'OUT_OF_STOCK') return 'border-destructive/30 bg-destructive/10 text-destructive'
    return 'border-outline-variant bg-surface-container-high text-on-surface-variant dark:border-outline dark:bg-surface-container-high dark:text-white'
}

function formatStatus(status: ProductStatusType) {
    return status
        .toLowerCase()
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

function ProductTableSkeleton() {
    return (
        <section aria-label="Products" className="flex min-h-90 flex-1 flex-col border border-outline-variant bg-card">
            <div className="flex-1 overflow-x-auto">
                <table className="w-full min-w-220 border-collapse text-left">
                    <thead className="bg-surface-container-low">
                        <tr className="border-b border-outline-variant">
                            {['', 'Product details', 'SKU', 'Category', 'Price', 'Stock health', 'Status'].map((heading) => (
                                <th key={heading || 'selection'} className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                                    {heading}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {Array.from({ length: 5 }, (_, index) => (
                            <tr key={index} aria-hidden="true">
                                <td className="px-4 py-5"><Skeleton className="size-4" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-4 w-48" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-4 w-20" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-5 w-24" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-4 w-16" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-4 w-32" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-5 w-24" /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between border-t border-outline-variant bg-surface-container-low px-4 py-4">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-8 w-36" />
            </div>
        </section>
    )
}

function ProductsTable() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [selected, setSelected] = useState<string[]>([])
    const query = searchParams.toString()
    const filterKey = query ? `${pathname}?${query}` : pathname
    const [pagination, setPagination] = useState({ filterKey, page: 1 })
    const [pageSize, setPageSize] = useState(25)
    const searchFilter: SellerProductListFilterType = {
        category: searchParams.get('category'),
        createdAt: searchParams.get('createdAt'),
        productSearch: searchParams.get('productSearch'),
        status: searchParams.get('status'),
    }
    const { data, error, isLoading } = useFetchDebounce<string, SellerProductListingType[]>({
        deboundFn: () => sellerRepository.getSellerProductList(searchFilter),
        fallbackData: [],
        watch: filterKey,
        url: filterKey,
        duration: 2000,
    })

    const products = data
    const pageCount = Math.max(1, Math.ceil(products.length / pageSize))
    const page = pagination.filterKey === filterKey ? pagination.page : 1
    const currentPage = Math.min(page, pageCount)
    const visibleProducts = products.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const visibleVariantIds = visibleProducts.map((product) => product.variantId)
    const allVisibleSelected = visibleVariantIds.length > 0 && visibleVariantIds.every((id) => selected.includes(id))

    function changePage(nextPage: number) {
        setPagination({ filterKey, page: nextPage })
    }

    function exportCsv() {
        const csv = [
            ['Product', 'Description', 'Product ID', 'Variant ID', 'SKU', 'Category', 'Price', 'Stock', 'Status'],
            ...products.map((product) => [
                product.title,
                product.description,
                product.productId,
                product.variantId,
                product.inventory.sku,
                product.category,
                product.inventory.price.toFixed(2),
                String(product.inventory.quantity),
                formatStatus(product.productStatus),
            ]),
        ].map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n')

        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'product-catalog.csv'
        anchor.click()
        URL.revokeObjectURL(url)
    }

    return (
        <section aria-label="Products" className="flex min-h-90 flex-1 flex-col border border-outline-variant bg-card">
            <div className="flex justify-end border-b border-outline-variant p-3">
                <button
                    type="button"
                    onClick={exportCsv}
                    disabled={products.length === 0}
                    className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-outline-variant bg-card px-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-container disabled:opacity-50"
                >
                    <ArrowDownToLine className="size-4" />
                    Export CSV
                </button>
            </div>
            <div className="flex-1 overflow-x-auto">
                <table className="w-full min-w-220 border-collapse text-left">
                    <thead className="sticky top-0 z-10 bg-surface-container-low">
                        <tr className="border-b border-outline-variant">
                            <th className="w-12 px-4 py-3">
                                <input
                                    aria-label="Select all visible products"
                                    type="checkbox"
                                    checked={allVisibleSelected}
                                    onChange={(event) => setSelected(event.target.checked
                                        ? [...new Set([...selected, ...visibleVariantIds])]
                                        : selected.filter((id) => !visibleVariantIds.includes(id)))}
                                    className="size-4 rounded-sm border-input accent-secondary"
                                />
                            </th>
                            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Product details</th>
                            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">SKU</th>
                            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Category</th>
                            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Price</th>
                            <th className="w-48 px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Stock health</th>
                            <th className="px-3 py-3 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant">
                        {isLoading ? Array.from({ length: 5 }, (_, index) => (
                            <tr key={`skeleton-${index}`} aria-hidden="true">
                                <td className="px-4 py-5"><Skeleton className="size-4" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-4 w-48" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-4 w-20" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-5 w-24" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-4 w-16" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-4 w-32" /></td>
                                <td className="px-3 py-5"><Skeleton className="h-5 w-24" /></td>
                            </tr>
                        )) : error ? (
                            <tr>
                                <td colSpan={7} role="alert" className="px-6 py-16 text-center text-sm text-destructive">
                                    {error instanceof Error ? error.message : 'Unable to load products.'}
                                </td>
                            </tr>
                        ) : visibleProducts.map((product) => {
                            const health = getStockHealth(product.inventory.quantity)
                            const isSelected = selected.includes(product.variantId)
                            const status = formatStatus(product.productStatus)

                            return (
                                <tr key={product.variantId} className={`transition-colors hover:bg-surface-container-low/70 ${isSelected ? 'bg-secondary/10' : ''}`}>
                                    <td className="px-4 py-3.5">
                                        <input
                                            aria-label={`Select ${product.title}`}
                                            type="checkbox"
                                            checked={isSelected}
                                            onChange={(event) => setSelected(event.target.checked
                                                ? [...new Set([...selected, product.variantId])]
                                                : selected.filter((id) => id !== product.variantId))}
                                            className="size-4 rounded-sm border-input accent-secondary"
                                        />
                                    </td>
                                    <td className="px-3 py-3.5">
                                        <div className="flex min-w-64 items-center gap-3">
                                            {product.coverImage ? (
                                                <Image
                                                    src={`http://localhost:8080/catalog${product.coverImage}`}
                                                    alt={`${product.title} cover`}
                                                    width={56}
                                                    height={56}
                                                    unoptimized
                                                    className="size-14 shrink-0 border border-outline-variant/70 object-cover"
                                                />
                                            ) : (
                                                <div aria-hidden="true" className="size-14 shrink-0 border border-outline-variant/70 bg-surface-container-high" />
                                            )}
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-foreground">{product.title}</p>
                                                <p className="mt-0.5 truncate text-xs text-muted-foreground">{product.description}</p>
                                                <p className="mt-0.5 text-[10px] text-muted-foreground">Product ID: {product.productId}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3.5 text-sm text-foreground">{product.inventory.sku}</td>
                                    <td className="px-3 py-3.5">
                                        <span className="inline-block bg-surface-container-high px-2 py-1 text-[10px] font-bold uppercase text-on-surface-variant">{product.category}</span>
                                    </td>
                                    <td className="px-3 py-3.5 text-base font-semibold tabular-nums text-foreground">${product.inventory.price.toFixed(2)}</td>
                                    <td className="px-3 py-3.5">
                                        <div className="space-y-1.5">
                                            <div className="flex items-center justify-between gap-3 text-[11px] font-semibold">
                                                <span className="text-foreground">{product.inventory.quantity.toLocaleString()} units</span>
                                                <span className={health.color}>{health.label}</span>
                                            </div>
                                            <div className="h-1.5 overflow-hidden rounded-full bg-surface-container">
                                                <div className={`h-full rounded-full ${health.barColor}`} style={{ width: health.width }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-3 py-3.5">
                                        <span className={`inline-flex items-center gap-1.5 border px-2 py-1 text-[11px] font-bold ${getStatusStyle(product.productStatus)}`}>
                                            <span className={`size-1.5 rounded-full ${product.productStatus === 'ACTIVE' ? 'bg-tertiary-container dark:bg-on-tertiary-container' : product.productStatus === 'PENDING_REVIEW' || product.productStatus === 'DRAFT' ? 'bg-secondary dark:bg-on-secondary-container' : product.productStatus === 'OUT_OF_STOCK' ? 'bg-destructive' : 'bg-on-surface-variant dark:bg-on-surface'}`} />
                                            {status}
                                        </span>
                                    </td>
                                </tr>
                            )
                        })}
                        {!error && products.length === 0 && (
                            <tr>
                                <td colSpan={7} className="px-6 py-16 text-center">
                                    <p className="font-semibold text-foreground">No products found</p>
                                    <p className="mt-1 text-sm text-muted-foreground">Try changing your search or filters.</p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <footer className="flex flex-col gap-3 border-t border-outline-variant bg-surface-container-low px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-muted-foreground">
                    Showing <span className="font-semibold text-foreground">{products.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, products.length)}</span> of <span className="font-semibold text-foreground">{products.length}</span> products
                </p>
                <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                    <label className="flex items-center gap-2 text-xs text-muted-foreground">
                        Rows per page
                        <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); changePage(1) }} className="h-8 rounded-sm border border-outline-variant bg-card px-2 font-semibold text-foreground outline-none focus:border-secondary">
                            {[10, 25, 50].map((size) => <option key={size} value={size}>{size}</option>)}
                        </select>
                    </label>
                    <div className="flex items-center gap-1">
                        <button type="button" title="First page" aria-label="First page" disabled={currentPage === 1} onClick={() => changePage(1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronsLeft className="size-4" /></button>
                        <button type="button" title="Previous page" aria-label="Previous page" disabled={currentPage === 1} onClick={() => changePage(currentPage - 1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronLeft className="size-4" /></button>
                        <span className="min-w-16 text-center text-xs font-semibold text-foreground">{currentPage} / {pageCount}</span>
                        <button type="button" title="Next page" aria-label="Next page" disabled={currentPage === pageCount} onClick={() => changePage(currentPage + 1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronRight className="size-4" /></button>
                        <button type="button" title="Last page" aria-label="Last page" disabled={currentPage === pageCount} onClick={() => changePage(pageCount)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronsRight className="size-4" /></button>
                    </div>
                </div>
            </footer>
        </section>
    )
}

export default function ProductsPage() {
    return (
        <main className="min-w-0 flex-1 overflow-y-auto bg-background">
            <div className="mx-auto flex min-h-full w-full max-w-[1600px] flex-col px-4 py-5 sm:px-6 lg:px-8">
                <header className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">Inventory</p>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">Product catalog</h1>
                        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                            Manage listings, inventory levels, and product visibility.
                        </p>
                    </div>
                    <Link
                        href="/seller/add-product"
                        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-secondary px-4 text-sm font-bold text-secondary-foreground no-underline transition-colors hover:brightness-95"
                    >
                        <Plus className="size-4" />
                        Add product
                    </Link>
                </header>
                <Suspense fallback={null}>
                    <SearchFilterInputs />
                </Suspense>
                <Suspense fallback={<ProductTableSkeleton />}>
                    <ProductsTable />
                </Suspense>
            </div>
        </main>
    )
}
