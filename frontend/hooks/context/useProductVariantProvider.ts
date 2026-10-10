import {
    ProductVariantContext,
    SelectedOptionsType
} from '@/context/ProductVariantProvider'
import { useContext } from 'react'

const useProductVariantProvider = () => {
    const {
        selectedOptions,
        availableOptions,
        variantsData,
        category,
        stockAvailable,
        setVariantData,
    } = useContext(ProductVariantContext)

    const toggleVariantOptions = (
        selectedOptions: SelectedOptionsType,
        optionKey: string,
        optionValue: string
    ) => {
        const updatedSelections = {
            ...selectedOptions,
            [optionKey]: optionValue
        };

        const newVariant = Object.entries(variantsData).find(
            ([productId, values]) =>
                Object.entries(updatedSelections).every(
                    ([key, value]) => values[key] === value
                )
        );
        const newVariantId = newVariant ? newVariant[0] : undefined

        return {
            updatedSelections,
            newVariantId
        }

    };
    return {
        availableOptions,
        selectedOptions,
        category,
        stockAvailable,
        setVariantData,
        toggleVariantOptions
    }
}

export default useProductVariantProvider