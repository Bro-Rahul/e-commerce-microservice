import ProductStatusForm from '@/components/sellers/products/status/ProductStatusForm'
import { sellerRepository } from '@/repositary/seller/sellerHttp'

interface ProductStatusPageProps {
    params: Promise<{ id: string }>
}

const ProductStatusPage = async ({ params }: ProductStatusPageProps) => {
    const { id } = await params
    const response = await sellerRepository.getRequests.getProductVariantStatus(id);
    return <ProductStatusForm variantId={id} productStatus={response.status} />
}

export default ProductStatusPage