import UpdateAssetsForm from "@/components/sellers/products/assets/UpdateAssetsForm";
import { sellerRepository } from "@/repositary/seller/sellerHttp";

interface ProductAssetsPageProps {
    params: Promise<{
        id: string
    }>
}


const ProductAssetsPage = async ({ params }: ProductAssetsPageProps) => {
    const { id } = await params;
    const response = await sellerRepository.getRequests.getProductVariantAssets(id);
    return (
        <UpdateAssetsForm
            variantId={id}
            productAssets={response}
        />
    )
}
export default ProductAssetsPage
