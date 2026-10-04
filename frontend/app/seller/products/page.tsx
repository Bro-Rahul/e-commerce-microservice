'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
    Armchair,
    ArrowDownToLine,
    BookOpen,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Headphones,
    Plus,
    Droplets,
    Search,
    X,
} from 'lucide-react'

const products = [
    {
        id: '1',
        name: 'ErgoPro Elite Series 2',
        asin: 'B08X1K9L2P',
        sku: 'EP-ES2-MNB',
        category: 'Office Products',
        price: 249.99,
        stock: 1420,
        status: 'Active',
        modifiedAt: '2026-09-27',
        Icon: Armchair,
        imageStyle: 'bg-surface-container-high text-primary',
    },
    {
        id: '2',
        name: 'Handcrafted Leather Journal',
        asin: 'B07N4W2M8V',
        sku: 'HLJ-ESP-01',
        category: 'Stationery',
        price: 34.5,
        stock: 12,
        status: 'Low Stock',
        modifiedAt: '2026-09-18',
        Icon: BookOpen,
        imageStyle: 'bg-surface-container-high text-primary',
    },
    {
        id: '3',
        name: 'SonicFlow Wireless ANC Headphones',
        asin: 'B09Y5T1G4W',
        sku: 'SF-ANC-SLT',
        category: 'Electronics',
        price: 189,
        stock: 0,
        status: 'Out of Stock',
        modifiedAt: '2026-09-11',
        Icon: Headphones,
        imageStyle: 'bg-surface-container-high text-primary',
    },
    {
        id: '4',
        name: 'ArcticStream Insulated Bottle',
        asin: 'B04L9P2V0X',
        sku: 'AS-WB-32-SS',
        category: 'Kitchen',
        price: 24.95,
        stock: 450,
        status: 'Active',
        modifiedAt: '2026-09-05',
        Icon: Droplets,
        imageStyle: 'bg-surface-container-high text-primary',
    },
]

const categories = [...new Set(products.map((product) => product.category))]
const statuses = ['Active', 'Low Stock', 'Out of Stock']

function getStockHealth(stock: number) {
    if (stock === 0) return { label: 'Empty', color: 'text-destructive', barColor: 'bg-destructive', width: '0%' }
    if (stock < 25) return { label: 'Critical low', color: 'text-destructive', barColor: 'bg-destructive', width: '8%' }
    if (stock < 600) return { label: 'Moderate', color: 'text-amber-700 dark:text-amber-300', barColor: 'bg-amber-500 dark:bg-amber-400', width: '45%' }
    return { label: 'Healthy', color: 'text-emerald-700 dark:text-emerald-400', barColor: 'bg-emerald-600 dark:bg-emerald-400', width: '85%' }
}

function getStatusStyle(status: string) {
    if (status === 'Active') return 'border-tertiary-container/30 bg-tertiary-container/10 text-tertiary-container dark:border-tertiary-container dark:bg-tertiary-container/50 dark:text-white'
    if (status === 'Low Stock') return 'border-secondary/30 bg-secondary/15 text-secondary-container dark:border-secondary-container dark:bg-secondary-container/50 dark:text-white'
    return 'border-outline-variant bg-surface-container-high text-on-surface-variant dark:border-outline dark:bg-surface-container-high dark:text-white'
}

export default function ProductsPage() {
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All Categories')
    const [status, setStatus] = useState('All Statuses')
    const [dateRange, setDateRange] = useState('30')
    const [selected, setSelected] = useState<string[]>([])
    const [page, setPage] = useState(1)
    const [pageSize, setPageSize] = useState(25)

    const cutoff = new Date()
    cutoff.setDate(cutoff.getDate() - Number(dateRange))
    const filteredProducts = products.filter((product) => {
        const query = search.trim().toLowerCase()
        const matchesSearch = !query || [product.name, product.sku, product.asin].some((value) => value.toLowerCase().includes(query))
        const matchesCategory = category === 'All Categories' || product.category === category
        const matchesStatus = status === 'All Statuses' || product.status === status
        const matchesDate = dateRange === 'all' || new Date(`${product.modifiedAt}T00:00:00`) >= cutoff
        return matchesSearch && matchesCategory && matchesStatus && matchesDate
    })
    const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
    const currentPage = Math.min(page, pageCount)
    const visibleProducts = filteredProducts.slice((currentPage - 1) * pageSize, currentPage * pageSize)
    const allVisibleSelected = visibleProducts.length > 0 && visibleProducts.every((product) => selected.includes(product.id))

    function clearFilters() {
        setSearch('')
        setCategory('All Categories')
        setStatus('All Statuses')
        setDateRange('30')
        setPage(1)
    }

    function exportCsv(ids?: string[]) {
        const rows = ids ? filteredProducts.filter((product) => ids.includes(product.id)) : filteredProducts
        const csv = [
            ['Product', 'ASIN', 'SKU', 'Category', 'Price', 'Stock', 'Status'],
            ...rows.map((product) => [product.name, product.asin, product.sku, product.category, product.price.toFixed(2), String(product.stock), product.status]),
        ].map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(',')).join('\n')
        const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
        const anchor = document.createElement('a')
        anchor.href = url
        anchor.download = 'product-catalog.csv'
        anchor.click()
        URL.revokeObjectURL(url)
    }

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
                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => exportCsv()}
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-outline-variant bg-card px-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-container"
                        >
                            <ArrowDownToLine className="size-4" />
                            Export CSV
                        </button>
                        <Link
                            href="/seller/add-product"
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-secondary px-4 text-sm font-bold text-secondary-foreground no-underline transition-colors hover:brightness-95"
                        >
                            <Plus className="size-4" />
                            Add product
                        </Link>
                    </div>
                </header>

                <section aria-label="Product filters" className="mb-3 border border-outline-variant bg-card p-4">
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[1fr_1fr_1fr_1.5fr]">
                        <label className="block">
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Category</span>
                            <span className="relative block">
                                <select
                                    value={category}
                                    onChange={(event) => { setCategory(event.target.value); setPage(1) }}
                                    className="h-10 w-full appearance-none rounded-sm border border-input bg-background px-3 pr-9 text-sm text-foreground outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                                >
                                    <option>All Categories</option>
                                    {categories.map((item) => <option key={item}>{item}</option>)}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
                            </span>
                        </label>
                        <label className="block">
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Status</span>
                            <span className="relative block">
                                <select
                                    value={status}
                                    onChange={(event) => { setStatus(event.target.value); setPage(1) }}
                                    className="h-10 w-full appearance-none rounded-sm border border-input bg-background px-3 pr-9 text-sm text-foreground outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                                >
                                    <option>All Statuses</option>
                                    {statuses.map((item) => <option key={item}>{item}</option>)}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
                            </span>
                        </label>
                        <label className="block">
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Date modified</span>
                            <span className="relative block">
                                <select
                                    value={dateRange}
                                    onChange={(event) => { setDateRange(event.target.value); setPage(1) }}
                                    className="h-10 w-full appearance-none rounded-sm border border-input bg-background px-3 pr-9 text-sm text-foreground outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
                                >
                                    <option value="30">Last 30 days</option>
                                    <option value="90">Last 90 days</option>
                                    <option value="all">Any time</option>
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-3 top-3 size-4 text-muted-foreground" />
                            </span>
                        </label>
                        <label className="block">
                            <span className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-muted-foreground">Search products</span>
                            <span className="relative block">
                                <Search className="pointer-events-none absolute left-3 top-3 size-4 text-muted-foreground" />
                                <input
                                    value={search}
                                    onChange={(event) => { setSearch(event.target.value); setPage(1) }}
                                    placeholder="Search by SKU, title, or ASIN"
                                    className="h-10 w-full rounded-sm border border-input bg-background pl-9 pr-9 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-secondary focus:ring-1 focus:ring-secondary"
                                />
                                {search && <button type="button" aria-label="Clear search" onClick={() => setSearch('')} className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"><X className="size-4" /></button>}
                            </span>
                        </label>
                    </div>
                    <div className="mt-3 flex min-h-8 items-center justify-between border-t border-outline-variant pt-3">
                        <button type="button" onClick={clearFilters} className="text-sm font-semibold text-secondary-container hover:underline">Clear filters</button>
                        {selected.length > 0 && (
                            <div className="flex items-center gap-3 text-sm">
                                <span className="font-medium text-muted-foreground">{selected.length} selected</span>
                                <button type="button" onClick={() => exportCsv(selected)} className="font-semibold text-foreground underline underline-offset-2">Export selected</button>
                                <button type="button" onClick={() => setSelected([])} className="font-semibold text-muted-foreground hover:text-foreground">Deselect</button>
                            </div>
                        )}
                    </div>
                </section>

                <section aria-label="Products" className="flex min-h-90 flex-1 flex-col border border-outline-variant bg-card">
                    <div className="flex-1 overflow-x-auto">
                        <table className="w-full min-w-220 border-collapse text-left">
                            <thead className="sticky top-0 z-10 bg-surface-container-low">
                                <tr className="border-b border-outline-variant">
                                    <th className="w-12 px-4 py-3">
                                        <input
                                            aria-label="Select all visible products"
                                            type="checkbox"
                                            checked={allVisibleSelected}
                                            onChange={(event) => setSelected(event.target.checked ? [...new Set([...selected, ...visibleProducts.map((product) => product.id)])] : selected.filter((id) => !visibleProducts.some((product) => product.id === id)))}
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
                                {visibleProducts.map((product) => {
                                    const health = getStockHealth(product.stock)
                                    const ProductIcon = product.Icon
                                    const isSelected = selected.includes(product.id)
                                    return (
                                        <tr key={product.id} className={`transition-colors hover:bg-surface-container-low/70 ${isSelected ? 'bg-secondary/10' : ''}`}>
                                            <td className="px-4 py-3.5">
                                                <input
                                                    aria-label={`Select ${product.name}`}
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={(event) => setSelected(event.target.checked ? [...selected, product.id] : selected.filter((id) => id !== product.id))}
                                                    className="size-4 rounded-sm border-input accent-secondary"
                                                />
                                            </td>
                                            <td className="px-3 py-3.5">
                                                <div className="flex min-w-56 items-center gap-3">
                                                    <div className={`flex size-11 shrink-0 items-center justify-center border border-outline-variant/70 ${product.imageStyle}`}>
                                                        <ProductIcon className="size-6" strokeWidth={1.6} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-semibold text-foreground">{product.name}</p>
                                                        <p className="mt-0.5 text-xs text-muted-foreground">ASIN: {product.asin}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3.5 text-sm text-foreground">{product.sku}</td>
                                            <td className="px-3 py-3.5"><span className="inline-block bg-surface-container-high px-2 py-1 text-[10px] font-bold uppercase text-on-surface-variant">{product.category}</span></td>
                                            <td className="px-3 py-3.5 text-base font-semibold tabular-nums text-foreground">${product.price.toFixed(2)}</td>
                                            <td className="px-3 py-3.5">
                                                <div className="space-y-1.5">
                                                    <div className="flex items-center justify-between gap-3 text-[11px] font-semibold">
                                                        <span className="text-foreground">{product.stock.toLocaleString()} units</span>
                                                        <span className={health.color}>{health.label}</span>
                                                    </div>
                                                    <div className="h-1.5 overflow-hidden rounded-full bg-surface-container">
                                                        <div className={`h-full rounded-full ${health.barColor}`} style={{ width: health.width }} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-3 py-3.5"><span className={`inline-flex items-center gap-1.5 border px-2 py-1 text-[11px] font-bold ${getStatusStyle(product.status)}`}><span className={`size-1.5 rounded-full ${product.status === 'Active' ? 'bg-tertiary-container dark:bg-on-tertiary-container' : product.status === 'Low Stock' ? 'bg-secondary dark:bg-on-secondary-container' : 'bg-on-surface-variant dark:bg-on-surface'}`} />{product.status}</span></td>
                                        </tr>
                                    )
                                })}
                                {visibleProducts.length === 0 && (
                                    <tr><td colSpan={7} className="px-6 py-16 text-center"><p className="font-semibold text-foreground">No products found</p><p className="mt-1 text-sm text-muted-foreground">Try changing your search or filters.</p></td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <footer className="flex flex-col gap-3 border-t border-outline-variant bg-surface-container-low px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-xs text-muted-foreground">
                            Showing <span className="font-semibold text-foreground">{filteredProducts.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredProducts.length)}</span> of <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
                        </p>
                        <div className="flex flex-wrap items-center gap-3 sm:gap-5">
                            <label className="flex items-center gap-2 text-xs text-muted-foreground">
                                Rows per page
                                <select value={pageSize} onChange={(event) => { setPageSize(Number(event.target.value)); setPage(1) }} className="h-8 rounded-sm border border-outline-variant bg-card px-2 font-semibold text-foreground outline-none focus:border-secondary">
                                    {[2, 4, 10, 25].map((size) => <option key={size} value={size}>{size}</option>)}
                                </select>
                            </label>
                            <div className="flex items-center gap-1">
                                <button type="button" title="First page" aria-label="First page" disabled={currentPage === 1} onClick={() => setPage(1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronsLeft className="size-4" /></button>
                                <button type="button" title="Previous page" aria-label="Previous page" disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronLeft className="size-4" /></button>
                                <span className="min-w-16 text-center text-xs font-semibold text-foreground">{currentPage} / {pageCount}</span>
                                <button type="button" title="Next page" aria-label="Next page" disabled={currentPage === pageCount} onClick={() => setPage(currentPage + 1)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronRight className="size-4" /></button>
                                <button type="button" title="Last page" aria-label="Last page" disabled={currentPage === pageCount} onClick={() => setPage(pageCount)} className="flex size-8 items-center justify-center border border-outline-variant bg-card text-foreground disabled:opacity-40"><ChevronsRight className="size-4" /></button>
                            </div>
                        </div>
                    </footer>
                </section>
            </div>
        </main>
    )
}