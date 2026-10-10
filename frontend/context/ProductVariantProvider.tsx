import { AvailableCategoryType } from '@/types/inventoryTypes'
import React, {
    createContext,
    useEffect,
    useState,
} from 'react'

export type VariantOptionsType = {
    [key: string]: string[]
}

export type SelectedOptionsType = {
    [key: string]: string
}

interface ProductVariantProviderProps {
    children: React.ReactNode
    category: AvailableCategoryType
    variantsData: Record<string, Record<string, string>>
    allVariantOptions: VariantOptionsType,
    optionsKeys: string[]
    selectedOptions: SelectedOptionsType
    currentVariant: string
}

interface ProductVariantState {
    variantsData: Record<string, Record<string, string>>
    optionsKeys: string[]
    category: AvailableCategoryType | null
    currentVariant: string,
    stockAvailable: boolean,
    availableOptions: VariantOptionsType
    selectedOptions: SelectedOptionsType
}

interface ProductVariantProviderContextType
    extends ProductVariantState {
    setVariantData: React.Dispatch<
        React.SetStateAction<ProductVariantState>
    >
}

const productVariantDefaultState: ProductVariantState = {
    variantsData: {},
    optionsKeys: [],
    availableOptions: {},
    currentVariant: '',
    category: null,
    stockAvailable: true,
    selectedOptions: {},
}

export const ProductVariantContext =
    createContext<ProductVariantProviderContextType>({
        ...productVariantDefaultState,
        setVariantData: () => { },
    })

const ProductVariantProvider = ({
    children,
    variantsData,
    allVariantOptions,
    selectedOptions,
    optionsKeys,
    currentVariant,
    category,
}: ProductVariantProviderProps) => {

    const [variantData, setVariantData] =
        useState<ProductVariantState>({
            category,
            variantsData,
            currentVariant,
            optionsKeys,
            stockAvailable: true,
            availableOptions: allVariantOptions,
            selectedOptions,
        })

    useEffect(() => {
        setVariantData((prev) => ({
            ...prev,
            category,
            variantsData,
            currentVariant,
            optionsKeys,
            availableOptions: allVariantOptions,
            selectedOptions,
        }))
    }, [
        category,
        variantsData,
        currentVariant,
        optionsKeys,
        allVariantOptions,
        selectedOptions,
    ])

    return (
        <ProductVariantContext.Provider
            value={{
                ...variantData,
                setVariantData,
            }}
        >
            {children}
        </ProductVariantContext.Provider>
    )
}

export default ProductVariantProvider