import { AvailableCategoryType } from '@/types/inventoryTypes'
import PhoneProduct from './PhoneProduct'
import { ProductDataType } from '@/types/ProductDisplayTypes'
import BookProduct from './BookProduct'
import { keyValuePairType } from '@/validators/specificationValidator'
import ProductVariantProvider from '@/context/ProductVariantProvider'
import { findAllAvailableOptions, formateVariantsData, getDefaultSelectedOptions } from '@/lib/utils'
import { productVariantsOptions } from '@/constants/data/productData'

const ProductRenderer = ({
    category,
    productData,
    variantsData,
    currentVariant
}: {
    category: AvailableCategoryType,
    productData: ProductDataType,
    currentVariant: string,
    variantsData: Record<string, keyValuePairType[]>
}) => {

    const optionsKey = productVariantsOptions[category];
    let content;

    switch (category) {
        case 'phone':
            content = <PhoneProduct productData={productData} />
            break
        case 'book':
            content = <BookProduct productData={productData} />
            break;
    }
    return <ProductVariantProvider
        variantsData={formateVariantsData(variantsData)}
        allVariantOptions={findAllAvailableOptions(optionsKey, variantsData)}
        optionsKeys={optionsKey}
        selectedOptions={getDefaultSelectedOptions(optionsKey, currentVariant, variantsData)}
        category={category}
        currentVariant={currentVariant}
    >
        {content}
    </ProductVariantProvider>
}

export default ProductRenderer