import UpdateAssetsForm from "@/components/sellers/products/assets/UpdateAssetsForm";
import { sellerRepository } from "@/repositary/seller/sellerHttp";

interface ProductAssetsPageProps {
    params: Promise<{
        id: string
    }>
}


const ProductAssetsPage = async ({ params }: ProductAssetsPageProps) => {
    const { id } = await params;
    const response = await sellerRepository.getProductVariantAssets(id);
    return (
        <UpdateAssetsForm
            productAssets={response}
        />
    )
}
export default ProductAssetsPage
