import { BaseInventoryFieldType } from '@/validators/inventoryValidator'
import useInventoryVariants from '@/store/useInventoryVariants'
import { useEffect } from 'react'
import toast from 'react-hot-toast';

interface UseVariants {
    inventoryData: BaseInventoryFieldType[],
    keys: string[]
}


const useVariants = ({ inventoryData, keys }: UseVariants) => {
    const {
        variantOptions,
        selectedVariantOptions,
        selectedVariant,
        inventoryDetails,
        setInventory,
        setSelectedVariantOption,
    } = useInventoryVariants()

    useEffect(() => {
        setInventory(inventoryData, keys)
    }, [inventoryData, keys, setInventory])

    const toggleVariant = (variantName: string, value: string) => {
        const searchVariant = { ...selectedVariantOptions, [variantName]: value }
        const isPresent = inventoryDetails.find((item) =>
            Object.entries(searchVariant).every(
                ([key, value]) => item[key] === value
            )
        )

        if (!isPresent) {
            toast.error(
                "No such variant exists for this configuration!",
                {
                    duration: 5000,
                    position: "bottom-right",
                }
            )
            return
        }

        if (!isPresent) return
        setSelectedVariantOption(variantName, value)
    }

    return {
        selectedVariantOptions,
        variantsOptions: variantOptions,
        variant: selectedVariant,
        toggleVariant,
    }
}

export default useVariants