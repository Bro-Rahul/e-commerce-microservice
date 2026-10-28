import UpdateInventoryForm from "@/components/sellers/products/inventory/UpdateInventoryForm";
import { sellerRepository } from "@/repositary/seller/sellerHttp";
import { InventoryFieldType } from "@/validators/inventoryValidator"

interface ProductInventoryPageProps {
    params: Promise<{
        id: string
    }>
}

const ProductInventoryPage = async ({ params }: ProductInventoryPageProps) => {
    const { id } = await params;
    const response = await sellerRepository.getProductVariantInventory(id);
    return (
        <UpdateInventoryForm
            inventoryDefaults={response}

        />
    )
}

export default ProductInventoryPage
