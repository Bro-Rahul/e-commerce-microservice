import Link from 'next/link'
import { Suspense } from 'react'
import { Plus } from 'lucide-react'
import SearchFilterInputs from '@/components/sellers/products/SearchFilterInputs'
import ProductTableSkeleton from '@/components/sellers/products/ProductTableSkeleton'
import ProductTable from '@/components/sellers/products/ProductTable'



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
                <SearchFilterInputs />
                <Suspense fallback={<ProductTableSkeleton />}>
                    <ProductTable />
                </Suspense>
            </div>
        </main>
    )
}
