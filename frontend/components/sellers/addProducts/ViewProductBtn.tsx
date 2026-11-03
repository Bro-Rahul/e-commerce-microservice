"use client"
import { Button } from '@/components/ui/button'
import useAddProduct from '@/store/useAddProduct'
import { useRouter } from 'next/navigation';


const ViewProductBtn = ({ category }: { category: string }) => {
    const { getProductData } = useAddProduct();
    const { mainVariant } = getProductData(category);
    const { push } = useRouter();
    return (
        <Button onClick={() => push(`/seller/add-product/${category}/product-display/${mainVariant}`)} className="w-full font-bold my-5 ">
            View Product
        </Button>
    )
}

export default ViewProductBtn