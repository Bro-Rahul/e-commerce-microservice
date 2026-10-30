"use client"
import { ProductInventoryResponseType } from '@/types/products/SellerProductListType'
import InventoryForm from '../../addProducts/inventory/InventoryForm'
import { InventoryFieldType } from '@/validators/inventoryValidator'
import { sellerRepository } from '@/repositary/seller/sellerHttp'
import toast from 'react-hot-toast'

interface UpdateInventoryFormProps {
    inventoryDefaults: ProductInventoryResponseType
    variantId: string
}

const UpdateInventoryForm = ({ variantId, inventoryDefaults }: UpdateInventoryFormProps) => {
    const onSubmit = async (data: InventoryFieldType) => {
        try {
            await sellerRepository.patchRequests.patchProductVariantInventory(variantId, data);
            toast.success("Inventory has been Saved! ", {
                duration: 5000,
                position: "bottom-right"
            })
        } catch (err: any) {
            toast.error(err.message ?? "Can't save the inventory now!", {
                duration: 5000,
                position: "bottom-right"
            })
        }
    }
    return (
        <InventoryForm
            handleInventorySave={onSubmit}
            inventoryDefault={inventoryDefaults}
        />
    )
}

export default UpdateInventoryForm