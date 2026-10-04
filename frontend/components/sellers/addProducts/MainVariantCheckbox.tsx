"use client"

import useAddProduct from "@/store/useAddProduct"
import { AvailableCategoryType } from "@/types/inventoryTypes"

const MainVariantCheckbox = ({ category }: { category: AvailableCategoryType }) => {
    const isMainVariant = useAddProduct((state) =>
        Boolean(state.products[category].productMetaDetail.isMainVariant),
    )
    const updateMetaDetails = useAddProduct((state) => state.updateMetaDetails)

    return (
        <label className="inline-flex shrink-0 cursor-pointer items-center gap-2 text-sm font-medium text-on-surface">
            <input
                type="checkbox"
                className="h-4 w-4 accent-primary"
                checked={isMainVariant}
                onChange={(event) =>
                    updateMetaDetails(category, { isMainVariant: event.target.checked })
                }
            />
            <span>This is the main variant</span>
        </label>
    )
}

export default MainVariantCheckbox