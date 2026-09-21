import ProductBaseDetailForm from "@/components/sellers/addProducts/baseDetails/ProductBaseDetailForm"
import Heading from "@/components/sellers/addProducts/Heading"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import { SquareText } from "lucide-react"

interface BaseProductDetailPageProps {
    params: Promise<{
        slug: AvailableCategoryType
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
                <ProductBaseDetailForm category={slug} />
            </div>
        </main>
    )
}

export default page
