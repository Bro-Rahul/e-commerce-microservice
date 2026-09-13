import Heading from "@/components/sellers/addProducts/Heading"
import { Button } from "@/components/ui/button"
import { SquareText } from "lucide-react"

interface BaseProductDetailPageProps {
    params: Promise<{
        slug: string
    }>
}

const page = async ({ params }: BaseProductDetailPageProps) => {
    const { slug } = await params

    return (
        <main className="mx-auto w-[80%] flex-1 px-4 pb-32 pt-6 sm:px-6 md:px-10 md:pt-10">
            <Heading Icon={SquareText}>
                <span>
                    <span className="headline-md block">Basic details</span>
                    <span className="mt-1 block text-sm font-normal text-on-surface-variant">
                        Give customers the essential information they need to understand your product.
                    </span>
                </span>
            </Heading>

            <div className="overflow-hidden rounded-xl border border-outline-variant bg-card shadow-sm">
                <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined rounded-lg bg-primary p-2 text-xl text-on-primary text-white">
                            edit_note
                        </span>
                        <div>
                            <h2 className="headline-sm">Product information</h2>
                            <p className="mt-1 text-sm text-on-surface-variant">
                                Fields marked with <span className="font-bold text-error">*</span> are required.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-7 p-5 sm:p-8">
                    <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-bold text-on-surface" htmlFor="title">
                                Product title <span className="text-error">*</span>
                            </label>
                            <input
                                className="inputfields"
                                id="title"
                                maxLength={200}
                                placeholder="e.g. Wireless noise-cancelling headphones"
                                type="text"
                            />
                            <p className="text-xs text-on-surface-variant">
                                Use a clear, specific title that helps customers find your product.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-on-surface" htmlFor="category">
                                Category <span className="text-error">*</span>
                            </label>
                            <input
                                className="inputfields"
                                maxLength={200}
                                type="text"
                                defaultValue={slug.toUpperCase()}
                                readOnly
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-bold text-on-surface" htmlFor="about">
                                About this product <span className="text-error">*</span>
                            </label>
                            <input
                                className="inputfields"
                                id="about"
                                placeholder="A short summary of what makes it useful"

                                type="text"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="block text-sm font-bold text-on-surface" htmlFor="description">
                                Description <span className="text-error">*</span>
                            </label>
                            <textarea
                                className="textareafield"
                                id="description"
                                placeholder="Share the details, benefits, and features customers should know about."

                            />
                            <p className="text-xs text-on-surface-variant">
                                Keep it helpful and easy to scan. Avoid pricing, delivery, or promotional details here.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-outline-variant bg-surface-container-low px-5 py-4 sm:flex-row sm:justify-end sm:px-8">
                    <Button
                        className="rounded-lg border border-outline-variant px-5 py-2.5 text-sm font-bold text-on-surface transition hover:bg-surface-container"
                        variant={'outline'}
                    >
                        Cancel
                    </Button>
                    <a href={`/seller/add-product/${slug}/media-assets`}>
                        <Button
                            className="rounded-lg bg-secondary px-5 py-2.5 text-sm font-bold text-on-secondary transition hover:bg-secondary/90 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:ring-offset-2"
                            type="submit"
                        >
                            Save and continue
                        </Button>
                    </a>
                </div>
            </div>
        </main>
    )
}

export default page
