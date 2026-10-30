import UpdateProductMetaDetailsForm from "@/components/sellers/products/otherDetails/UpdateProductMetaDetailsForm"
import { sellerRepository } from "@/repositary/seller/sellerHttp"


interface ProductOtherDetailsPageProps {
    params: Promise<{
        id: string
    }>
}
const ProductOtherDetailsPage = async ({ params }: ProductOtherDetailsPageProps) => {
    const { id } = await params
    const response = await sellerRepository.getRequests.getProductVariantMetaDetail(id);
    return (

        <UpdateProductMetaDetailsForm
            metaDetails={response}
            variantId={id}
        />
    )
}

export default ProductOtherDetailsPage
