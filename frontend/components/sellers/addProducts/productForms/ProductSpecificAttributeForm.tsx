import ProductFormRenderer from "@/components/sellers/addProducts/productForms/ProductFormRenderer"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import { BookOpen, Smartphone } from "lucide-react"

const ProductSpecificAttributeForm = ({ category }: { category: AvailableCategoryType }) => {
    const isPhone = category === "phone"
    const Icon = isPhone ? Smartphone : BookOpen
    const heading = isPhone ? "Phone Specific Attributes" : "Book Specific Attributes"

    return (
        <section className="overflow-hidden rounded-xl border border-outline-variant bg-card shadow-sm">
            <div className="border-b border-outline-variant bg-surface-container-low px-5 py-4 sm:px-8">
                <div className="flex items-center gap-3">
                    <span className="rounded-lg bg-secondary p-2 text-on-secondary">
                        <Icon size={20} aria-hidden="true" />
                    </span>
                    <h2 className="headline-sm">{heading}</h2>
                </div>
            </div>
            <ProductFormRenderer category={category} />
        </section>
    )
}

export default ProductSpecificAttributeForm