import ProductEditTabs from '@/components/sellers/products/ProductEditTabs'
import { ReactNode } from 'react'

interface ProductEditLayoutProps {
    children: ReactNode
    params: Promise<{ id: string }>
}

const ProductEditLayout = async ({ children, params }: ProductEditLayoutProps) => {
    const { id } = await params

    return (
        <main className="min-w-0 flex-1 overflow-y-auto bg-background">
            <div className="mx-auto flex min-h-full w-full max-w-300 flex-col px-4 py-5 sm:px-6 lg:px-8">
                <header className="mb-6">
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-secondary">
                        Product catalog
                    </p>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">Update product</h1>
                    <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                        Work through each section to manage your product listing.
                    </p>
                </header>

                <ProductEditTabs productId={id} />
                <div className="flex-1">{children}</div>
            </div>
        </main>
    )
}

export default ProductEditLayout
