import CategoryList from "@/components/sellers/addProducts/CategoryList"
import { Categories } from "@/constants/data"
import {
    ArrowRight,
    Plus,
} from "lucide-react"


export default function DashboardPage() {
    return (

        <main className="min-w-0 flex-1 overflow-y-auto">
            <div className="mx-auto w-full max-w-6xl px-4 py-5 sm:px-6 sm:py-8 lg:px-10">
                <div className="mb-8 flex items-center justify-between gap-4 sm:mb-10">

                    <div className="ml-auto hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
                        <span className="flex size-2 rounded-full bg-emerald-500" />
                        Your store is active
                    </div>
                </div>

                <section className="mb-8 sm:mb-10">
                    <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <Plus className="size-5" />
                    </div>
                    <p className="mb-2 text-sm font-medium text-secondary">New listing</p>
                    <h1 className="headline-lg text-foreground">What are you selling?</h1>
                    <p className="body-lg mt-2 max-w-2xl text-muted-foreground">
                        Start by choosing the category that best fits your product. The right category helps shoppers discover it faster.
                    </p>
                </section>

                <section aria-labelledby="category-heading">
                    <div className="mb-4 flex items-end justify-between gap-4">
                        <div>
                            <h2 id="category-heading" className="headline-md text-foreground">Choose a category</h2>
                            <p className="body-md mt-1 text-muted-foreground">You can refine this after creating your listing.</p>
                        </div>
                        <span className="hidden text-sm text-muted-foreground sm:block">7 popular categories</span>
                    </div>
                    <CategoryList />
                </section>

                <section className="mt-8 overflow-hidden rounded-xl border border-outline-variant bg-primary p-6 text-primary-foreground sm:mt-10 sm:p-8">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                        <div className="max-w-xl">
                            <p className="mb-2 text-sm font-semibold text-secondary">Need a hand?</p>
                            <h2 className="headline-md">Find the perfect category for your product</h2>
                            <p className="body-md mt-2 text-primary-container-foreground">
                                Explore the full catalog or get help from our seller support team before you publish.
                            </p>
                        </div>
                        <a href="#" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2.5 text-sm font-bold text-secondary-foreground no-underline transition-transform hover:-translate-y-0.5">
                            Browse catalog
                            <ArrowRight className="size-4" />
                        </a>
                    </div>
                </section>
            </div>
        </main>
    )
}
