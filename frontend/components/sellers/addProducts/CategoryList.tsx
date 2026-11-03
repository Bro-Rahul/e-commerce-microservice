import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


interface CategoryListProps<T> {
    categories: T[],
    renderer: (data: T) => React.ReactNode
}

const CategoryList = <T,>({ categories, renderer }: CategoryListProps<T>) => {

    return <div>
        <ul className="flex w-full list-none flex-col gap-3 p-0">
            {categories.map((item) =>
                renderer(item)
            )}
            <li>
                <Link
                    href="#"
                    className="group flex min-h-36 items-center gap-4 rounded-lg border border-dashed border-outline bg-surface-container-low p-5 text-foreground no-underline transition-colors hover:border-primary hover:bg-primary-container/20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-surface-container-high text-muted-foreground">
                        <Plus className="size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <h3 className="headline-sm">Something else</h3>
                        <p className="body-md mt-1 text-muted-foreground">Browse every category</p>
                    </div>
                    <ArrowRight className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
            </li>
        </ul>
    </div>
}

export default CategoryList