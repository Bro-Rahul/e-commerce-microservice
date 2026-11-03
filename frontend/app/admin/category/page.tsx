
import CategoryList from "@/components/sellers/addProducts/CategoryList"
import { adminRepositary } from "@/repositary/admin/adminRepositary"
import Link from "next/link"
import {
    Plus,
    FolderTree,
    Layers3,
    ArrowUpRight,
    Tags,
} from "lucide-react"
import ROUTES from "@/constants/data/routes"
import CategoryBranch from "@/components/sellers/addProducts/CategoryBranch"

const AdminCategoryPage = async () => {
    const categories = await adminRepositary.get.getHierarchyCategories()

    return (
        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-background px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 pb-10">

                <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                            <FolderTree className="size-4" />
                            Admin / Categories
                        </div>

                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Category Management
                        </h1>

                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Organize your store's product catalog by managing
                            categories and building a structured shopping experience.
                        </p>
                    </div>

                    <Link
                        href={ROUTES.ADMIN.CATEGORY.CREATE}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90"
                    >
                        <Plus className="size-4" />
                        Create New Category
                    </Link>
                </section>

                <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <div className="rounded-lg bg-primary/10 p-2.5">
                                <FolderTree className="size-5 text-primary" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                Catalog
                            </span>
                        </div>

                        <div className="mt-5">
                            <p className="text-3xl font-bold tracking-tight">
                                {categories.length}
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Available Categories
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <div className="rounded-lg bg-blue-500/10 p-2.5">
                                <Layers3 className="size-5 text-blue-500" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                Organization
                            </span>
                        </div>

                        <div className="mt-5">
                            <p className="text-lg font-semibold">
                                Structured Catalog
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Organize products into meaningful category groups.
                            </p>
                        </div>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-5 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-center justify-between">
                            <div className="rounded-lg bg-emerald-500/10 p-2.5">
                                <Tags className="size-5 text-emerald-500" />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                Management
                            </span>
                        </div>

                        <div className="mt-5">
                            <p className="text-lg font-semibold">
                                Product Classification
                            </p>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Keep your storefront organized and easy to navigate.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="space-y-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">
                                Available Categories
                            </h2>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Browse and manage the categories available in your catalog.
                            </p>
                        </div>

                        <span className="w-fit rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                            {categories.length} Categories
                        </span>
                    </div>

                    <div className="rounded-xl border border-border bg-card p-4 sm:p-6">
                        {categories.length > 0 ? (
                            <CategoryList
                                categories={categories}
                                renderer={(category) =>
                                    <CategoryBranch
                                        key={category.name}
                                        category={category}
                                        href={`${category.name}#`}
                                    />
                                }
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="rounded-2xl bg-muted p-4">
                                    <FolderTree className="size-8 text-muted-foreground" />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold">
                                    No categories yet
                                </h3>

                                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                                    Your product catalog is waiting for its first category.
                                    Create one to start organizing your products.
                                </p>

                                <Link
                                    href={ROUTES.ADMIN.CATEGORY.CREATE}
                                    className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                                >
                                    <Plus className="size-4" />
                                    Create First Category
                                </Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="flex flex-col justify-between gap-4 rounded-xl border border-border bg-muted/40 p-5 sm:flex-row sm:items-center sm:p-6">
                    <div>
                        <h3 className="font-semibold">
                            Need another category?
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Expand your catalog and make it easier for customers to discover products.
                        </p>
                    </div>

                    <Link
                        href={ROUTES.ADMIN.CATEGORY.CREATE}
                        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold transition hover:bg-muted"
                    >
                        Create Category
                        <ArrowUpRight className="size-4" />
                    </Link>
                </section>

            </div>
        </main>
    )
}

export default AdminCategoryPage