"use client"
import BookRenderer from '@/components/shared/BookRenderer'
import PhoneRenderer from '@/components/shared/PhoneRenderer'
import { ProductSchemaMap } from '@/store/useAddProduct'
import { AvailableCategory } from '@/types/seller'

interface ProductOverViewProps {
    category: AvailableCategory,
    productData: ProductSchemaMap
}


const ProductRenderer = ({ category, productData }: ProductOverViewProps) => {

    switch (category) {
        case 'Books':
            return <BookRenderer bookData={productData['Books']} />
        case 'Phones':
            return <PhoneRenderer phoneData={productData['Phones']} />
    }
}

export default ProductRenderer