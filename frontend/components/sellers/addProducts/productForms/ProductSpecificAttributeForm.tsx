import ProductFormRenderer from "@/components/sellers/addProducts/productForms/ProductFormRenderer"
import { AvailableCategoryType } from "@/types/inventoryTypes"

const ProductSpecificAttributeForm = ({ category }: { category: AvailableCategoryType }) => {
    return <ProductFormRenderer category={category} />
}

export default ProductSpecificAttributeForm