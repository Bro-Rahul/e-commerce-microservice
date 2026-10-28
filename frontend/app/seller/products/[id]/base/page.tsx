import UpdateProductBaseDetailFrom from '@/components/sellers/products/base/UpdateProductBaseDetailFrom'
import { sellerRepository } from '@/repositary/seller/sellerHttp';

interface ProductBaseDetailsPageProps {
    params: Promise<{
        id: string
    }>
}

const ProductBaseDetailsPage = async ({ params }: ProductBaseDetailsPageProps) => {
    // c050833a-53d5-430d-a346-8a9c40480045
    const { id } = await params;
    const response = await sellerRepository.getProductVaraintBaseDetail(id);
    return (
        <UpdateProductBaseDetailFrom
            defaultValue={{
                about: response.about,
                category: response.category,
                description: response.description,
                title: response.title
            }}
        />
    )
}

export default ProductBaseDetailsPage
