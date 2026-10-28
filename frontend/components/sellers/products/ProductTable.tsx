"use client"
import { useEffect, useRef, useState } from 'react'
import { PaginatedResponse } from '@/types/paginatedResponseType'
import { SellerProductListingType } from '@/types/products/SellerProductListType'
import { ArrowDownToLine } from 'lucide-react'
import { usePathname, useSearchParams } from 'next/navigation'
import ProductTableFooter from './ProductTableFooter'
import ProductTableRow from './ProductTableRow'
import { SellerProductListFilterType } from '@/types/searchFilter/sellerFilterTypes'
import ProductTableSkeleton from './ProductTableSkeleton'
import useClientFetcher from '@/hooks/useClientFetcher'
import { formatStatus, toCsvCell } from '@/lib/utils'
import { sellerRepository } from '@/repositary/seller/sellerHttp'



const ProductTable = () => {
    const [selectedProductIds, setSelectedProductIds] = useState<Set<string>>(() => new Set())
    const selectAllRef = useRef<HTMLInputElement>(null)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const searchFilter: SellerProductListFilterType = {
        category: searchParams.get('category'),
        createdAt: searchParams.get('createdAt'),
        productSearch: searchParams.get('productSearch'),
        status: searchParams.get('status'),
        page: searchParams.get("page") ?? "0",
        pageSize: searchParams.get("pageSize") ?? "5"
    }

    const query = searchParams.toString()
    const filterKey = query ? `${pathname}?${query}` : pathname
    const { data, error, isLoading } = useClientFetcher<PaginatedResponse<SellerProductListingType>>({
        fetcherFn: () => sellerRepository.getSellerProductList(searchFilter),
        fallbackData: {
            content: [],
            currentPage: 0,
            isFirst: false,
            isLast: false,
            totalPages: 0,
            pageSize: 5
        },
        url: filterKey,
    })

    const { content: products, currentPage, isFirst, isLast, totalPages, pageSize } = data
    const selectedOnPageCount = products.filter((product) => selectedProductIds.has(product.variantId)).length
    const allProductsOnPageSelected = products.length > 0 && selectedOnPageCount === products.length
    const someProductsOnPageSelected = selectedOnPageCount > 0 && !allProductsOnPageSelected

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = someProductsOnPageSelected
        }
    }, [someProductsOnPageSelected])

    const updateProductSelection = (variantId: string, isSelected: boolean) => {
        setSelectedProductIds((currentSelection) => {
            const nextSelection = new Set(currentSelection)
            if (isSelected) {
                nextSelection.add(variantId)
            } else {
                nextSelection.delete(variantId)
            }
            return nextSelection
        })
    }

    const updatePageSelection = (isSelected: boolean) => {
        setSelectedProductIds((currentSelection) => {
            const nextSelection = new Set(currentSelection)
            for (const product of products) {
                if (isSelected) {
                    nextSelection.add(product.variantId)
                } else {
                    nextSelection.delete(product.variantId)
                }
            }
            return nextSelection
        })
    }

    const exportCsv = () => {
        const headers = ['Product ID', 'Product', 'Description', 'SKU', 'Category', 'Price', 'Quantity', 'Status']
        const rows = products.map((product) => [
            product.productId,
            product.title,
            product.description,
            product.inventory.sku,
            product.category,
            product.inventory.price,
            product.inventory.quantity,
            formatStatus(product.productStatus),
        ])
        const csv = [headers, ...rows]
            .map((row) => row.map(toCsvCell).join(','))
            .join('\r\n')
        const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = 'seller-products.csv'
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.setTimeout(() => URL.revokeObjectURL(url), 0)
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
                                    ref={selectAllRef}
                                    aria-label="Select all products on this page"
                                    type="checkbox"
                                    checked={allProductsOnPageSelected}
                                    onChange={(event) => updatePageSelection(event.target.checked)}
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
                        {isLoading ?
                            <ProductTableSkeleton /> : error ? (
                                <tr>
                                    <td colSpan={7} role="alert" className="px-6 py-16 text-center text-sm text-destructive">
                                        {error instanceof Error ? error.message : 'Unable to load products.'}
                                    </td>
                                </tr>
                            ) :
                                products.map((product) => (
                                    <ProductTableRow
                                        key={product.variantId}
                                        product={product}
                                        isSelected={selectedProductIds.has(product.variantId)}
                                        onSelectionChange={updateProductSelection}
                                    />
                                ))}

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
            <ProductTableFooter
                currentPage={currentPage}
                isFirstPage={isFirst}
                isLastPage={isLast}
                pageSize={pageSize}
                totalPage={totalPages}
            />
        </section>
    )
}

export default ProductTable
