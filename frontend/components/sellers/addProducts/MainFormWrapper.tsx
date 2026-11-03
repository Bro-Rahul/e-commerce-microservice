"use client"
import ProductBaseDetailForm from './baseDetails/ProductBaseDetailForm'
import AssetsForm from './mediaAssets/AssetsForm'
import ProductFormRenderer from './productForms/ProductFormRenderer'
import useAddProduct from '@/store/useAddProduct'
import InventoryForm from './inventory/InventoryForm'


interface MainFormWrapperProps {
    category: string
}

const MainFormWrapper = ({ category }: MainFormWrapperProps) => {
    const { addBaseDetail, addInventory, products } = useAddProduct()
    const { variants, currentVariant } = products[category]

    return (
        <div className="space-y-6">
            <p>{currentVariant}</p>
            <ProductBaseDetailForm
                formDefaults={{ ...variants[currentVariant].baseDetail, category }}
                handleOnSubmit={(data) => addBaseDetail(category, data)}
            />
            <AssetsForm
                category={category}
                currentVariantId={currentVariant}
            />
            <InventoryForm
                handleInventorySave={(data) => addInventory(category, data)}
                inventoryDefault={variants[currentVariant].inventory}
            />

            <ProductFormRenderer category={category} />
        </div>
    )
}

export default MainFormWrapper