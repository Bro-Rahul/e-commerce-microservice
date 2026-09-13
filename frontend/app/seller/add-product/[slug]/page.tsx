import { redirect } from "next/navigation"

interface AddProductPageProps {
    params: Promise<{
        slug: string
    }>
}

const page = async ({ params }: AddProductPageProps) => {
    const { slug } = await params
    redirect(`/seller/add-product/${slug}/base-detail`)
}

export default page