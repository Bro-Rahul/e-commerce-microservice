import UpdateProductMetaDetailsFrom from "@/components/sellers/products/otherDetails/UpdateProductMetaDetailsFrom"
import { sellerRepository } from "@/repositary/seller/sellerHttp"


interface ProductOtherDetailsPageProps {
    params: Promise<{
        id: string
    }>
}
const ProductOtherDetailsPage = async ({ params }: ProductOtherDetailsPageProps) => {
    const { id } = await params
    const response = await sellerRepository.getProductVariantMetaDetail(id);
    return (
        <UpdateProductMetaDetailsFrom
            metaDetails={response}
        />
    )
}

export default ProductOtherDetailsPage
