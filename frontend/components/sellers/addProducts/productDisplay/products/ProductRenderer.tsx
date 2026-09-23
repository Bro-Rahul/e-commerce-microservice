import { AvailableCategoryType } from '@/types/inventoryTypes'
import PhoneProduct from './PhoneProduct'
import { ProductDataType } from '@/types/ProductDisplayTypes'

const ProductRenderer = ({ category, productData }: { category: AvailableCategoryType, productData: ProductDataType }) => {
    switch (category) {

        case 'phone':
            return <PhoneProduct productData={productData} />
        case 'book':
    }
}

export default ProductRenderer