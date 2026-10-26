import { redirect } from 'next/navigation'

interface ProductUpdatePageProps {
    params: Promise<{ id: string }>
}

const ProductUpdatePage = async ({ params }: ProductUpdatePageProps) => {
    const { id } = await params
    redirect(`/seller/products/${encodeURIComponent(id)}/base`)
}

export default ProductUpdatePage
