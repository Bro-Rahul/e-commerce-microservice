"use client"
import { ProductInventoryResponseType } from '@/types/products/SellerProductListType'
import InventoryForm from '../../addProducts/inventory/InventoryForm'

interface UpdateInventoryFormProps {
    inventoryDefaults: ProductInventoryResponseType
}

const UpdateInventoryForm = ({ inventoryDefaults }: UpdateInventoryFormProps) => {
    return (
        <InventoryForm
            handleInventorySave={data => { }}
            inventoryDefault={inventoryDefaults}
        />
    )
}

export default UpdateInventoryForm