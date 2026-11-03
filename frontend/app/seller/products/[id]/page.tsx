import ROUTES from '@/constants/data/routes'
import { redirect } from 'next/navigation'

interface ProductUpdatePageProps {
    params: Promise<{ id: string }>
}

const ProductUpdatePage = async ({ params }: ProductUpdatePageProps) => {
    const { id } = await params
    redirect(ROUTES.SELLER.PRODUCTS.EDIT.base(id))
}

export default ProductUpdatePage
