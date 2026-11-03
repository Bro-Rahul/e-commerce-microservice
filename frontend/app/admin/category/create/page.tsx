
import CategoryForm from '@/components/admin/category/CategoryForm'
import { adminRepositary } from '@/repositary/admin/adminRepositary'
import {
    FolderTree,
    Tags,
} from 'lucide-react'

const Page = async () => {
    const categories = await adminRepositary.get.getCategeoryNames()

    return (
        <main className="min-h-0  flex-1 overflow-y-auto bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto w-full ">

                {/* Page Header */}
                <div className="mb-8 flex flex-col items-center justify-center gap-4 text-center sm:flex-row sm:gap-5 sm:text-left">
                    <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl border border-primary/10 bg-primary/10">
                        <FolderTree className="size-7 text-primary" />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-center gap-2 sm:justify-start">
                            <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                                Create New Category
                            </h1>
                            <Tags className="hidden size-5 text-muted-foreground sm:block" />
                        </div>

                        <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                            Create and organize categories to structure your product
                            catalog. Help customers discover products through a
                            well-organized shopping experience.
                        </p>
                    </div>
                </div>

                {/* Category Form */}
                <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-card p-5 shadow-sm sm:p-8">
                    <div className="mb-6 border-b border-border pb-5">
                        <h2 className="text-lg font-semibold text-foreground">
                            Category Details
                        </h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Enter the information below to add a new category
                            to your store.
                        </p>
                    </div>

                    <CategoryForm availableCategories={categories} />
                </div>

                {/* Footer Helper */}
                <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-5 text-muted-foreground">
                    Make sure your category name and parent category are
                    selected correctly before submitting.
                </p>

            </div>
        </main>
    )
}

export default Page