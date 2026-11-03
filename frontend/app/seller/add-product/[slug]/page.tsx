import ROUTES from "@/constants/data/routes"
import { redirect } from "next/navigation"

interface AddProductPageProps {
    params: Promise<{
        slug: string
    }>
}

const page = async ({ params }: AddProductPageProps) => {
    const { slug } = await params
    redirect(ROUTES.SELLER.PRODUCTS.ADD_PRODUCT.PRODUCT_FORM(decodeURIComponent(slug)))
}

export default page