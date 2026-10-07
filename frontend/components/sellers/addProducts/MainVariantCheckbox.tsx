"use client"

import { Plus, X } from "lucide-react"
import useAddProduct from "@/store/useAddProduct"
import { AvailableCategoryType } from "@/types/inventoryTypes"
import useProductImage from "@/hooks/dexies/useProductImage"

const MainVariantCheckbox = ({ category }: { category: AvailableCategoryType }) => {
    const {
        removeVariant,
        setCurrentVariant,
        setAsMainVariant,
        addNewVariant,
        products
    } = useAddProduct();
    const { currentVariant, mainVariant, variantKeys } = products[category];

    const { deleteVariantImages } = useProductImage();


    const handleAddVariant = () => {
        addNewVariant(category)
    }

    const handleRemoveVariant = () => {
        deleteVariantImages(currentVariant, category)
        removeVariant(category)
    }



    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg border border-outline-variant bg-surface-container-low px-2.5 py-1.5 shadow-sm">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                    Variant
                </span>

                <div aria-label="Product variants" className="flex flex-wrap items-center gap-1">
                    {variantKeys.map((variantId, index) => {
                        const variantNumber = index + 1
                        const isCurrentVariant = currentVariant === variantId

                        return (
                            <button
                                key={variantNumber}
                                type="button"
                                aria-label={`Select variant ${variantNumber}`}
                                aria-pressed={isCurrentVariant}
                                onClick={() => setCurrentVariant(category, variantId)}
                                className={`flex h-7 min-w-7 items-center justify-center rounded-md px-2 text-sm font-bold transition-colors ${isCurrentVariant
                                    ? 'bg-primary text-on-primary'
                                    : 'border border-outline-variant bg-card text-on-surface hover:bg-secondary/10'
                                    }`}
                            >
                                {variantNumber}
                            </button>
                        )
                    })}
                </div>

                <button
                    type="button"
                    onClick={handleRemoveVariant}
                    disabled={variantKeys.length <= 1}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-outline-variant bg-card text-on-surface-variant transition-colors hover:bg-error-container hover:text-error disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <X className="h-4 w-4" />
                </button>

                <button
                    type="button"
                    aria-label="Add a new variant"
                    onClick={handleAddVariant}
                    className="flex h-7 w-7 items-center justify-center rounded-md border border-outline-variant bg-card text-on-surface transition-colors hover:bg-secondary/10 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Plus className="h-4 w-4" />
                </button>
            </div>

            <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium text-on-surface">
                <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={currentVariant === mainVariant}
                    onChange={e => setAsMainVariant(category)}
                />
                <span>This is the main variant</span>
            </label>
        </div>
    )
}

export default MainVariantCheckbox