import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { BaseInventoryFieldType } from "@/validators/inventoryValidator"

export type VariantOptions = Record<string, string[]>
export type SelectedVariantOptions = Record<string, string>
export type InventoryDetails = Record<string, string>

interface InventoryVariantsState {
    inventory: BaseInventoryFieldType[]
    variantKeys: string[]
    variantOptions: VariantOptions
    inventoryDetails: InventoryDetails[]
    selectedVariantOptions: SelectedVariantOptions
    selectedVariant: BaseInventoryFieldType | undefined
    setInventory: (inventory: BaseInventoryFieldType[], keys: string[]) => void
    setSelectedVariantOption: (variantName: string, value: string) => void
    reset: () => void
}

const createVariantState = (
    inventory: BaseInventoryFieldType[],
    keys: string[],
) => {
    const variantOptions = keys.reduce<VariantOptions>((options, key) => {
        options[key] = []
        return options
    }, {})

    const inventoryDetails = inventory.map((item) => {
        const details = item.additionalFields.reduce<InventoryDetails>(
            (fields, field) => {
                fields[field.key] = field.value
                return fields
            },
            {},
        )

        details.sku = item.sku
        return details
    })

    inventoryDetails.forEach((details) => {
        keys.forEach((key) => {
            const value = details[key]
            if (value && !variantOptions[key].includes(value)) {
                variantOptions[key].push(value)
            }
        })
    })

    const selectedVariantOptions = keys.reduce<SelectedVariantOptions>(
        (selected, key) => {
            selected[key] = inventoryDetails[0]?.[key] ?? ""
            return selected
        },
        {},
    )

    const selectedVariant = inventory.find((item) => {
        const details = inventoryDetails.find((inventoryItem) => inventoryItem.sku === item.sku)
        return details && Object.entries(selectedVariantOptions).every(
            ([key, value]) => details[key] === value,
        )
    })

    return {
        inventory,
        variantKeys: keys,
        variantOptions,
        inventoryDetails,
        selectedVariantOptions,
        selectedVariant,
    }
}

const emptyState = createVariantState([], [])

const useInventoryVariants = create<InventoryVariantsState>()(
    persist(
        (set) => ({
            ...emptyState,

            setInventory: (inventory, keys) =>
                set((state) => {
                    if (
                        state.inventory === inventory &&
                        state.variantKeys.length === keys.length &&
                        state.variantKeys.every((key, index) => key === keys[index])
                    ) {
                        return state
                    }

                    return createVariantState(inventory, keys)
                }),

            setSelectedVariantOption: (variantName, value) =>
                set((state) => {
                    const selectedVariantOptions = {
                        ...state.selectedVariantOptions,
                        [variantName]: value,
                    }

                    const selectedVariant = state.inventory.find((item) => {
                        const details = state.inventoryDetails.find(
                            (inventoryItem) => inventoryItem.sku === item.sku,
                        )

                        return details && Object.entries(selectedVariantOptions).every(
                            ([key, selectedValue]) => details[key] === selectedValue,
                        )
                    })

                    return { selectedVariantOptions, selectedVariant }
                }),

            reset: () => set(emptyState),
        }),
        { name: "inventory-variants" },
    ),
)

export default useInventoryVariants